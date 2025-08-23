export default [
{
  name: "start",
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $onlyIf[$getUserVar[1hstarted|$channelID;$authorID;false]==false;
      $callFunction[embed;error] 
      $description[## You already have an active challenge!]
    ]
    $onlyIf[$getChannelVar[participants]==;
      $callFunction[embed;error] 
      $description[## You can't start the challenge in channel with active Lobby!]
    ]

    $if[$message[0]==event;$setUserVar[event1hstarted|$channelID;true] $let[extraDesc;Event ]]

    $callFunction[embed;lucky]
    $description[# $get[extraDesc]1 Hour Luck Challenge has begun!\n## Don't forget to turn on notification!]
    ${loadVarsForChallenge()}
    ${interval()}
  `
},{
  name: "time",
  type: "messageCreate",
  code: `
    $reply
    ${isActiveChallenge()}
    ${time()}

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]  
      $if[$getUserVar[1hpaused|$channelID];
        $addTextDisplay[## Status: Paused]
        $addSeparator[Large]
      ]
      $addTextDisplay[## $get[time]]
    ;$getGlobalVar[luckyColor]]
  `
},{
  name: "pause",
  type: "messageCreate",
  code: `
    $reply
    ${isActiveChallenge()}

    $onlyIf[$getUserVar[1hpaused|$channelID]==false;
      $callFunction[embed;error]
      $description[## You already have paused the challenge!]
    ]

    $onlyIf[$getUserVar[1htime|$channelID]<3600;
      $callFunction[embed;error]
      $description[## Time's up!]
    ]

    $!stopInterval[1HLUCK-$authorID|$channelID]
    $setUserVar[1hpaused|$channelID;true]
    ${totalPoints()}
    ${time()}

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]  
      $addTextDisplay[# Paused!]
      $addSeparator[Large]
      $addTextDisplay[## $get[totalPoints]]
      $addSeparator
      $addTextDisplay[## $get[time]]
    ;$getGlobalVar[luckyColor]]
  `
},{
  name: "resume",
  aliases: ["continue", "res"],
  type: "messageCreate",
  code: `
    $reply
    ${isActiveChallenge()}

    $onlyIf[$getUserVar[1hpaused|$channelID];
      $callFunction[embed;error] 
      $description[## You haven't paused your challenge!]
    ]

    $setUserVar[1hpaused|$channelID;false]
    ${totalPoints()}
    ${time()}

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]  
      $addTextDisplay[# Continued!]
      $addSeparator[Large]
      $addTextDisplay[## $get[totalPoints]]
      $addSeparator
      $addTextDisplay[## $get[time]]
    ;$getGlobalVar[luckyColor]]
    ${interval()}
  `
},{
  unprefixed: true,
  type: "messageCreate",
  code: `
    $reply 
    $onlyIf[$getUserVar[1hstarted|$channelID]]
    $onlyIf[$startsWith[$messageContent;$getGuildVar[prefix]]==false]

    ${JSON()}
    $jsonLoad[caught;{}]
    $arrayLoad[caughtRares; ;$toLowerCase[$message]]
    $jsonLoad[allRaresList;$getUserVar[1hallRaresList|$channelID]]
    $jsonLoad[chartLimits;$getGlobalVar[chartLimits]]
    $jsonLoad[lobbyTags;$getChannelVar[lobbyTags]]
    $jsonLoad[animals;$readFile[json/animals.json]]

    $arrayLoad[limitsContent]
    $arrayLoad[reachedLimitContent]

    $let[points;0]
    $let[hasDifficulty;$arrayIncludes[userSettings;difficulties]]
    $let[hideRaresLimit;$arrayIncludes[userSettings;hideLimit]]
    $let[unlimitedRares;$arrayIncludes[userSettings;unlimitedRares]]
    $let[difficulty;$env[userProfile;1hl;difficulty]]

    $if[$getUserVar[participating|$channelID];
      $let[unlimitedRares;$arrayIncludes[lobbyTags;unlimitedRares]]
      $if[$and[$getChannelVar[lobbyDifficulty]!=none;$getChannelVar[lobbyDifficulty]!=];
        $jsonLoad[chartLimits;$getGlobalVar[$getChannelVar[lobbyDifficulty]ChartLimits]]
      ]
    ;
      $if[$get[hasDifficulty];
        $jsonLoad[chartLimits;$getGlobalVar[$get[difficulty]ChartLimits]]
      ]
    ]

    $if[$getUserVar[event1hstarted|$channelID];
      $jsonLoad[chartLimits;$getGlobalVar[eventChartLimits]]
      $let[unlimitedRares;false]
    ]


    $localFunction[raresLogic;
      $letSum[points;$get[challengeDataPoints]]

      $jsonLoad[PQ;
        {
          "p": $default[$env[caught;$get[animalID];p];0], 
          "q": $default[$env[caught;$get[animalID];q];0]
        }
      ]

      $let[caughtPoints;$env[PQ;p]]
      $let[caughtQuantity;$env[PQ;q]]
      $letSum[caughtPoints;$get[challengeDataPoints]]
      $letSum[caughtQuantity;1]
      $!jsonSet[PQ;p;$get[caughtPoints]]
      $!jsonSet[PQ;q;$get[caughtQuantity]]
      $!jsonSet[caught;$get[animalID];$env[PQ]]

      $setUserVar[1htotalRares|$channelID;$math[$getUserVar[1htotalRares|$channelID] + 1]]

      $let[newQuantity;$math[$env[allRaresList;$get[animalID]] + 1]]
      $!jsonSet[allRaresList;$get[animalID];$get[newQuantity]]

      $setUserVar[1hallRaresList|$channelID;$env[allRaresList]]
    ]
    
    $c[Looping through every rare]

    $loop[$arrayLength[caughtRares];
      $let[i;$math[$env[i] - 1]]
      $let[caughtRare;$arrayAt[caughtRares;$get[i]]]

      $if[$arrayIncludes[allRares;$get[caughtRare]];;
        $if[$get[i]==0;$break]
        $continue
      ]

      $onlyIf[$getUserVar[1hpaused|$channelID;$authorID;false]!=true;
        $callFunction[embed;error] 
        $description[## You are on pause!] 
        $sendMessage[$channelID]
      ]

      $let[animalID;$callFunction[findingAnimalID;$get[caughtRare]]]
      $jsonLoad[output;$callFunction[findingRareInChallengeDataBase;$get[animalID]]]
      
      $let[challengeDataPoints;$env[output;points]]
      $let[challengeDataCategory;$env[output;category]]

      $let[hasLimitCategory;$arraySome[chartLimits;obj;$env[obj;category]==$get[challengeDataCategory]]]

      $if[$or[$get[unlimitedRares];$get[hasLimitCategory]==false];
        $callFn[raresLogic]
        $continue
      ]

      $let[limitAnimalName;$env[animals;$get[animalID];variants;0;emoji]]
      $let[chartlimitIndex;$arrayFindIndex[chartLimits;obj;$env[obj;category]==$get[challengeDataCategory]]]
      $jsonLoad[limitChartObj;$env[chartLimits;$get[chartlimitIndex]]]
      $let[limit;$env[limitChartObj;limit]]
      $let[limitAnimalCount;$env[allRaresList;$get[animalID]]]

      $if[$get[limitAnimalCount]<$get[limit];
        $callFn[raresLogic]
        $letSum[limitAnimalCount;1]

        $if[$get[limitAnimalCount]==$get[limit];
          $arrayPush[reachedLimitContent;# Reached limit of $get[limitAnimalName]]
        ]
      ]
    ;i;true]

    $jsonLoad[caughtEntries;$jsonEntries[caught]]
    $arrayMap[caughtEntries;entry;
      $let[animalEmoji;$env[animals;$env[entry;0];variants;0;emoji]]
      $let[pointsInEntry;$env[entry;1;p]]
      $let[quantityInEntry;$env[entry;1;q]]
      $return[## ⁕ $get[animalEmoji]\`$get[quantityInEntry]\` ⟪+$get[pointsInEntry]⟫]
    ;caught]
    
    $c[Message sending]
    
    $if[$get[points]==0;$stop]

    $setUserVar[1hpoints|$channelID;$math[$getUserVar[1hpoints|$channelID] + $get[points]]]
    ${settingParticProgress()}
    
    $if[$get[unlimitedRares];;
      $arrayForEach[chartLimits;obj;
        $loop[$arrayLength[challengeData];
          $let[i;$math[$env[i] - 1]]
          $jsonLoad[data;$arrayAt[challengeData;$get[i]]]

          $let[dataCategory;$env[data;category]]
          $let[objCategory;$env[obj;category]]

          $if[$get[dataCategory]==$get[objCategory];;$continue]

          $let[limit;$env[obj;limit]]
          $jsonLoad[challengeRares;$env[data;rares]]

          $arrayForEach[challengeRares;rare;
            $jsonLoad[allRaresDataObj;$getGlobalVar[allRaresData]]

            $let[displayRare;$env[animals;$env[rare];variants;0;emoji]]
            $let[quantity;$default[$env[allRaresList;$env[rare]];0]]

            $if[$get[quantity]<$get[limit];
              $arrayPush[limitsContent;$get[displayRare]\`$get[quantity]|$get[limit]\`]
            ]
          ]
          $break
        ;i;true]
      ]
    ]

    ${totalPoints()}
    ${time()}

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]
      $if[$arrayLength[reachedLimitContent]>0;
        $addTextDisplay[$arrayJoin[reachedLimitContent;\n]]
        $addSeparator[Large]
      ]
      $if[$get[unlimitedRares];
        $addTextDisplay[# ※ Unlimited Rares]
        $addSeparator[Large]
      ]
      
      $addTextDisplay[# ⁂ Detected]
      $addTextDisplay[$arrayJoin[caught;\n]]
      $addSeparator
      $addTextDisplay[## $get[totalPoints] ⟪+$get[points]⟫]
      $addSeparator
      $addTextDisplay[## $get[time]]
      
      $if[$and[$get[hideRaresLimit]==false;$arrayLength[limitsContent]!=0];
        $addSeparator[Large]
        $addTextDisplay[# $arrayJoin[limitsContent; ]]
      ]
    ;$getGlobalVar[luckyColor]]
    $setUserVar[userProfile;$env[userProfile]]
  `
},{
  name: "end",
  type: "messageCreate",
  code: `
    $reply
    ${isActiveChallenge()}
    ${JSON()}
    ${allRaresList()}
    ${totalPoints()}
    ${totalRares()}

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]  
      $addTextDisplay[# 1 Hour Luck Ended!]
      $addSeparator[Large]
      $addTextDisplay[## $get[totalPoints]]
      $addTextDisplay[## $get[totalRares]]
      $addSeparator[Large]
      $addTextDisplay[$get[allRaresList]]
    ;$getGlobalVar[luckyColor]]
    $sendMessage[$channelID]
    ${reset()}
    ${lobbyEnd()}
  `
},{
  name: "points",
  aliases: ["pts", "score", "scr"],
  type: "messageCreate",
  code: `
    $reply
    ${JSON()}
    $callFunction[checking]

    $let[id;$authorID]
    $if[$default[$mentioned[0];$message[0]]!=;
      $let[id;$default[$mentioned[0];$message[0]]]
    ]
    $jsonLoad[userProfile;$getUserVar[userProfile;$get[id]]]

    $onlyIf[$userExists[$get[id]];
      $callFunction[newError;Invalid User ID]
    ]

    $onlyIf[$getUserVar[1hstarted|$channelID;$get[id]];
      $callFunction[newError;$if[$get[id]!=$authorID;__$username[$get[id]]__ doesn't;You don't] have an active challenge]
    ]

    ${totalPoints("$get[id]")}
    ${totalRares("$get[id]")}
    ${allRaresList("$get[id]")}
    ${time("$get[id]")}

    $addContainer[
      $addSection[
        $addTextDisplay[## $username[$get[id]] • MUID: $env[userProfile;MUID]]
        $addThumbnail[$userAvatar[$get[id]]]
      ]
      $addSeparator[Large]
      $addTextDisplay[## $get[totalPoints]]
      $addTextDisplay[## $get[totalRares]]
      $addSeparator[Large]
      $addTextDisplay[$get[allRaresList]]
      $addSeparator[Large]
      $addTextDisplay[## $get[time]]
    ;$getGlobalVar[luckyColor]]
  `
},{
  name: "edittime",
  aliases: ["etime", "et"],
  type: "messageCreate",
  code: `
    $reply
    ${isActiveChallenge()}
    $onlyIf[$or[$and[$isNumber[$message];$message>=0;$message<3600];$checkContains[$message;:]];
      $callFunction[embed;error] 
      $description[## Your time must be:\n### Bigger than or equal to 0\n### Lower than 3600\n# Or\n### In format «\`MM:SS\`»]
    ]
    
    $if[$checkContains[$message;:];
      $let[res;$round[$math[$unparseDigital[00:$message] / 1000]]]
    ;
      $let[res;$message]
    ]
    $setUserVar[1htime|$channelID;$get[res]]
    ${time()}

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]  
      $addTextDisplay[## $get[time]]
    ;$getGlobalVar[luckyColor]]
  `
},{
  name: "editlist",
  aliases: ["elist", "el"],
  type: "messageCreate",
  code: `
    $reply
    ${isActiveChallenge()}
    ${JSON()}
    $jsonLoad[allRaresList;$getUserVar[1hallRaresList|$channelID]]
    
    $let[arg1;$toLowerCase[$message[0]]]
    $let[arg2;$message[1]]
    $let[arg3;$toLowerCase[$message[2]]]
    $let[usage;## Usage: \`$getGuildVar[prefix]editlist <rare> [+ || -\\] <amount>\`]
    
    $onlyIf[$get[arg1]!=;
      $callFunction[embed;error] 
      $description[$get[usage]]
    ]

    $onlyIf[$arrayIncludes[allRares;$get[arg1]];
      $callFunction[embed;error] 
      $description[## The rare «\`$get[arg1]\`» does not exist!]
    ]

    $onlyIf[$or[$get[arg2]==+;$get[arg2]==-];
      $callFunction[embed;error] 
      $description[$get[usage]]
    ]

    $onlyIf[$or[$and[$get[arg3]==all;$get[arg2]==-];$and[$isNumber[$get[arg3]];$get[arg3]>0]];
      $callFunction[embed;error] 
      $description[### Only a number greater than 0 or argument «\`all\`» (if removing) is allowed!]
    ]
    
    $let[caughtRare;$get[arg1]]
    $let[animalID;$callFunction[findingAnimalID;$get[caughtRare]]]
    $let[animal;$env[animals;$get[animalID];variants;0;emoji]]
    $let[count;$get[arg3]]
    $let[quantity;$default[$env[allRaresList;$get[animalID]];0]]
    $let[rares;0]
    $let[points;0]

    $if[$get[arg2]==-;
      $let[state;Removed]
    ;
      $let[state;Added]
    ]

    $if[$and[$jsonHas[allRaresList;$get[animalID]]==false;$get[arg2]==-];
      $callFunction[embed;error] 
      $description[### Animal «$get[animalID]» is not in the rares list!]
      $sendMessage[$channelID]
      $stop
    ]
    
    $if[$get[arg3]==all;
      $let[count;$get[quantity]]
      $!jsonDelete[allRaresList;$get[animalID]]
    ;
      $let[quantity;$math[$get[quantity] $get[arg2] $get[count]]]
      $!jsonSet[allRaresList;$get[animalID];$get[quantity]]

      $if[$get[quantity]<=0;
        $!jsonDelete[allRaresList;$get[animalID]]
      ]
    ]
    
    $jsonLoad[allRaresListEntries;$jsonEntries[allRaresList]]
    
    $if[$arrayAt[allRaresListEntries;0]==;;
      $arrayForEach[allRaresListEntries;entry;
        $let[animalID;$env[entry;0]]
        $let[quantity;$env[entry;1]]
        $jsonLoad[output;$callFunction[findingRareInChallengeDataBase;$get[animalID]]]
        $let[challengeDataPoints;$env[output;points]]
        
        $letSum[rares;$get[quantity]]
        $letSum[points;$math[$get[quantity] * $get[challengeDataPoints]]]
      ]
    ]

    $setUserVar[1hallRaresList|$channelID;$env[allRaresList]]
    $setUserVar[1htotalRares|$channelID;$get[rares]]
    $setUserVar[1hpoints|$channelID;$get[points]]

    ${settingParticProgress()}
    ${allRaresList()}
    ${time()}
    ${totalPoints()}
    ${totalRares()}

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]
      $addTextDisplay[## ✅ $get[state] \`$get[count]\` $get[animal]]
      $addSeparator[Large]
      $addTextDisplay[## $get[totalPoints]]
      $addTextDisplay[## $get[totalRares]]
      $addSeparator[Large]
      $addTextDisplay[$get[allRaresList]]
      $addSeparator[Large]
      $addTextDisplay[## $get[time]]
    ;$getGlobalVar[luckyColor]]
  `
},{
  type: 'interactionCreate',
  allowedInteractionTypes: ['button'],
  description: "confirmation of ending challenge",
  code: `
    $arrayLoad[interactionID;-;$customID]
    $onlyIf[$arrayIncludes[interactionID;confirmEndingChallenge]]
    ${JSON()}
    $onlyIf[$arrayIncludes[interactionID;$authorID];$callFunction[notYourBTN]]

    ${isActiveChallenge()}
    $jsonLoad[history;$env[userProfile;1hl;history]]
    $jsonLoad[lobbyTags;$getChannelVar[lobbyTags]]
    $timezone[$env[userProfile;timezone]]
    $arrayLoad[tags]

    $let[difficulty;none]

    ${allRaresList()}
    ${totalPoints()}
    ${totalRares()}

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]  
      $addTextDisplay[# 1 Hour Luck Ended!]
      $addSeparator[Large]
      $addTextDisplay[## $get[totalPoints]]
      $addTextDisplay[## $get[totalRares]]
      $addSeparator[Large]
      $addTextDisplay[$get[allRaresList]]
    ;$getGlobalVar[luckyColor]]
    $interactionUpdate


    $if[$getUserVar[participating|$channelID];
      $let[playType;Party]
      $if[$getChannelVar[lobbyDifficulty]!=;
        $let[difficulty;$getChannelVar[lobbyDifficulty]]
      ]
      $if[$arrayIncludes[lobbyTags;unlimitedRares];
        $arrayPush[tags;unlimitedRares]
      ]
    ;
      $let[playType;Solo]
      $if[$arrayIncludes[userSettings;difficulties];
        $let[difficulty;$env[userProfile;1hl;difficulty]]
      ]
      $if[$arrayIncludes[userSettings;unlimitedRares];
        $arrayPush[tags;unlimitedRares]
      ]
    ]


    $arrayPushJSON[history;{
      "points": $getUserVar[1hpoints|$channelID],
      "rares": $getUserVar[1htotalRares|$channelID],
      "endedAt": $getTimestamp,
      "playType": "$get[playType]",
      "tags": $env[tags],
      "difficulty": "$get[difficulty]",
      "raresList": $getUserVar[1hallRaresList|$channelID]
    }]
    $!jsonSet[userProfile;1hl;history;$env[history]]
    $setUserVar[userProfile;$env[userProfile]]

    ${reset()}
    ${lobbyEnd()}
  `
},

// SETTINGS

{
  name: "settings",
  aliases: ["sts"],
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]

    ${settingsEmbed()}
    $let[msg;$sendMessage[$channelID;;true]]
    ${settingsTimeout()}
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  description: "settings buttons",
  code: `
    $arrayLoad[interactionID;-;$customID]
    $let[value;$env[interactionID;0]]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $jsonLoad[userSettings;$env[userProfile;1hl;settings]]
    ${loadGlobalJSON()}

    $onlyIf[$arrayIncludes[interactionID;settings]]
    $let[hasSettKey;$arraySome[allSettingsEntries;entry;$jsonLoad[arr;$env[entry]]$arrayIncludes[interactionID;$env[arr;0]]]]
    $let[hasDiffKey;$arraySome[difficulties;elem;$arrayIncludes[interactionID;$env[elem]]]]
    $onlyIf[$or[$get[hasSettKey];$get[hasDiffKey]]]
    $onlyIf[$arrayIncludes[interactionID;$authorID];$callFunction[notYourBTN]]

    $!stopTimeout[SETT-$authorID]

    $if[$get[hasSettKey];

      $if[$arrayIncludes[userSettings;$get[value]];
        $!arraySplice[userSettings;$arrayIndexOf[userSettings;$get[value]];1]
      ;
        $arrayPush[userSettings;$get[value]]
      ]
      $!jsonSet[userProfile;1hl;settings;$env[userSettings]]

    ;
      $if[$get[hasDiffKey];
        $!jsonSet[userProfile;1hl;difficulty;$get[value]]
      ]
    ]

    $setUserVar[userProfile;$env[userProfile]]
    ${settingsEmbed()}
    $let[msg;$messageID]

    $interactionUpdate
    ${settingsTimeout()}
  `
},

// HISTORY

{
  name: "history",
  aliases: ["his"],
  type: "messageCreate",
  description: "history",
  code: `
    $reply
    ${JSON()}
    $callFunction[checking]
    $callFunction[cooldown;1m]
    $jsonLoad[history;$env[userProfile;1hl;history]]

    $let[page;1]
    $let[sortType;date]
    $onlyIf[$arrayLength[history]!=0;
      $addContainer[
        $callFunction[newAuthor]
        $addSeparator[Large]
        $addTextDisplay[## You haven't completed any challenge!]
      ;$getGlobalVar[luckyColor]]
    ]

    ${historySorting()}
    ${historyEmbed()}
    $let[msg;$sendMessage[$channelID;;true]]

    ${historyTimeout()}
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["button", "modal", "selectMenu"],
  description: "history buttons",
  code: `
    $arrayLoad[interactionID;-;$customID]
    $arrayLoad[menuValues;-;$selectMenuValues]
    $arrayLoad[passKeys;,;sortHis,historyPageLeft,historyPageRight,customPage,deleteHistoryPage,historyPageCustom]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[interactionID;$env[key]]]]

    ${JSON()}
    $jsonLoad[history;$env[userProfile;1hl;history]]
    $onlyIf[$arrayIncludes[interactionID;$authorID];$callFunction[notYourBTN]]

    $let[IID;$env[interactionID;2]]
    $let[input;$input[historyPage]]
    $let[msg;$messageID]
    $let[page;$default[$env[menuValues;0];$env[interactionID;0]]]
    $let[sortType;$default[$env[menuValues;1];$env[interactionID;1]]]

    $if[$arrayIncludes[interactionID;historyPageCustom];
      $modal[$get[page]-$get[sortType]-customPage-$authorID;Custom page]
      $addTextInput[historyPage;Enter page;Short;true;;;1;5]
      $showModal
      $stop
    ]

    $if[$arrayLength[history]==0;
      $description[# No history]
      $callFunction[embed;lucky]
      $interactionUpdate
      $stop
    ]

    ${historySorting()}

    $switch[$get[IID];
    
      $case[historyPageLeft;
        $letSub[page;1]
        $if[$get[page]<=0;
          $let[page;$arrayLength[history]]
        ]
      ]

      $case[historyPageRight;
        $letSum[page;1]
        $if[$get[page]>$arrayLength[history];
          $let[page;1]
        ]
      ]

      $case[customPage;
        $onlyIf[$isNumber[$get[input]];
          $interactionReply[
            $ephemeral
            $callFunction[embed;error]
            $description[## Argument is not a number!]
          ]
        ]
        $let[page;$get[input]]
        $if[$get[page]>$arrayLength[history];
          $let[page;$arrayLength[history]]
        ]
        $if[$get[page]<=0;
          $let[page;1]
        ]
      ]

      $case[deleteHistoryPage;
        $!arraySplice[history;$math[$get[page] - 1];1]

        $arrayAdvancedSort[history;elem1;elem2;
          $math[$env[elem1;endedAt] - $env[elem2;endedAt]]
        ;history]

        $!jsonSet[userProfile;1hl;history;$env[history]]
        $setUserVar[userProfile;$env[userProfile]]
        
        ${historySorting()}
        
        $if[$get[page]>$arrayLength[history];
          $let[page;$arrayLength[history]]
        ]
      ]
    ]

    $!stopTimeout[1HLHISTORY-$authorID]
    ${historyEmbed()}
    $interactionUpdate
    ${historyTimeout()}
  `
},

//  EDIT HISTORY
{
  name: 'editHistory',
  aliases: ['editHis', 'eh', 'ehis'],
  type: 'messageCreate',
  code: `
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $callFunction[cooldown;1m]
    $jsonLoad[history;$env[userProfile;1hl;history]]

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]
      $addTextDisplay[## Welcome to the history editor!]
      $addActionRow
      $addStringSelectMenu[editHistoryOptions-$authorID;Choose an option]
      $addOption[Add new page;;addNewHistoryPage]
      $addOption[Edit existing page;;editExistingHistoryPage]
    ;$getGlobalVar[luckyColor]]
  `
},{
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu'],
  code: `
    $arrayLoad[interactionID;-;$customID]
    $arrayLoad[passKeys;,;editHistoryOptions]
    $let[value;$selectMenuValues]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[interactionID;$env[key]]]]
    $onlyIf[$get[value]==editExistingHistoryPage]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $onlyIf[$arrayIncludes[interactionID;$authorID];$callFunction[notYourBTN]]

    $modal[editHistoryPageModal-$authorID;Edit Existing History Page]
    $addTextInput[editHistoryPageNumber;Enter page number;Short;true]
    $addTextInput[editHistoryPageSorting;Enter sorting type;Short;true;Date | Points | Rares]
    $showModal

    $fetchResponse[$channelID;$messageID]
    $interactionUpdate
  `
},{
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu', 'modal'],
  code: `
    $arrayLoad[interactionID;-;$customID]
    $arrayLoad[passKeys;,;editHistoryOptions,addNewHistoryPageModalPoints,addNewHistoryPageModalRares,addHistoryCustomPoints,addHistoryCustomRares,addHistoryCustomPlayType,addHistoryCustomDifficulty,addHistoryCustomEndedAt,addHistoryCustomTags,addHistoryCustomRaresList]
    $let[value;$selectMenuValues]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[interactionID;$env[key]]]]
    $onlyIf[$get[value]!=editExistingHistoryPage]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $onlyIf[$arrayIncludes[interactionID;$authorID];$callFunction[notYourBTN]]

    $jsonLoad[allLobbyTags;$getGlobalVar[allLobbyTags]]
    $jsonLoad[difficulties;$getGlobalVar[difficulties]]
    $jsonLoad[animals;$readFile[json/animals.json]]

    $timezone[$env[userProfile;timezone]]
    $let[disabledUploadButton;true]

    $if[$getUserVar[savedNewHistoryConfig]==;
      $jsonLoad[savedNewHistoryConfig;{
        "points": 0,
        "rares": 0,
        "playType": "Solo",
        "difficulty": "None",
        "endedAt": 0,
        "tags": [\\],
        "raresList": {}
      }]
      $setUserVar[savedNewHistoryConfig;$env[savedNewHistoryConfig]]
    ]

    $jsonLoad[savedNewHistoryConfig;$getUserVar[savedNewHistoryConfig]]
    $jsonLoad[raresList;$env[savedNewHistoryConfig;raresList]]
    $jsonLoad[tags;$env[savedNewHistoryConfig;tags]]
    $let[points;$env[savedNewHistoryConfig;points]]
    $let[rares;$env[savedNewHistoryConfig;rares]]
    $let[endingDate;$env[savedNewHistoryConfig;endedAt]]
    $let[difficulty;$env[savedNewHistoryConfig;difficulty]]
    $let[playType;$env[savedNewHistoryConfig;playType]]

    $fetchResponse[$channelID;$messageID]
    $interactionUpdate

    $switch[$env[interactionID;0];

      $case[addHistoryCustomPoints;
        $let[input;$input[addedPoints]]
        $onlyIf[$and[$isNumber[$get[input]];$get[input]>0];
          $callFunction[newError;Invalid number!]
          $ephemeral
          $interactionFollowUp
        ]
        $!jsonSet[savedNewHistoryConfig;points;$get[input]]
        $let[points;$get[input]]
      ]


      $case[addHistoryCustomRares;
        $let[input;$input[addedRaresQuantity]]
        $onlyIf[$and[$isNumber[$get[input]];$get[input]>0];
          $callFunction[newError;Invalid number!]
          $ephemeral
          $interactionFollowUp
        ]
        $!jsonSet[savedNewHistoryConfig;rares;$get[input]]
        $let[rares;$get[input]]
      ]


      $case[addHistoryCustomPlayType;
        $!jsonSet[savedNewHistoryConfig;playType;$get[value]]
        $let[playType;$get[value]]
      ]


      $case[addHistoryCustomDifficulty;
        $!jsonSet[savedNewHistoryConfig;difficulty;$get[value]]
        $let[difficulty;$get[value]]
      ]


      $case[addHistoryCustomEndedAt;
        $let[input;$input[addedEndedAt]]
        $let[date;$unparseDate[$get[input]]]
        $onlyIf[$get[date]>0;
          $callFunction[newError;Invalid date!]
          $ephemeral
          $interactionFollowUp
        ]
        $!jsonSet[savedNewHistoryConfig;endedAt;$get[date]]
        $let[endingDate;$get[date]]
      ]


      $case[addHistoryCustomTags;
        $if[$arrayIncludes[tags;$get[value]];
          $!arraySplice[tags;$arrayIndexOf[tags;$get[value]];1]
        ;
          $arrayPush[tags;$get[value]]
        ]
        $!jsonSet[savedNewHistoryConfig;tags;$env[tags]]
      ]


      $case[addHistoryCustomRaresList;
        $arrayLoad[addedRaresList;,;$input[addedRaresList]]
        $arrayForEach[addedRaresList;elem;
          $arrayLoad[keyValue;=;$env[elem]]
          $let[animalID;$callFunction[findingAnimalID;$env[keyValue;0]]]
          $let[value;$env[keyValue;1]]

          $onlyIf[$get[animalID]!=undefined;
            $callFunction[newError;Unknown animal \`$env[keyValue;0]\` in \`$env[elem]\`!]
            $ephemeral
            $interactionFollowUp
          ]

          $onlyIf[$isNumber[$get[value]];
            $callFunction[newError;Invalid value \`$get[value]\` in \`$env[elem]\`]
            $ephemeral
            $interactionFollowUp
          ]

          $!jsonSet[raresList;$get[animalID];$get[value]]

          $if[$get[value]<=0;
            $!jsonDelete[raresList;$get[animalID]]
          ]
          $!jsonSet[savedNewHistoryConfig;raresList;$env[raresList]]
        ]
      ]
    ]
    
    $if[$arrayLength[tags]==0;$arrayPush[tags;None]]

    ${raresListGenerator()}

    $if[$and[$get[points]!=0;$get[rares]!=0;$get[endingDate]!=0;$env[raresList]!={}];$let[disabledUploadButton;false]]


    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]
      $addTextDisplay[# Preview]
      $addSeparator[Large]
      $addTextDisplay[### Points: \`$get[points]\`]
      $addSeparator
      $addTextDisplay[### Rares: \`$get[rares]\`]
      $addSeparator
      $addTextDisplay[### Play Type: \`$toTitleCase[$get[playType]]\`]
      $addSeparator
      $addTextDisplay[### Difficulty: \`$toTitleCase[$get[difficulty]]\`]
      $addSeparator
      $addTextDisplay[### Ended at: $discordTimestamp[$get[endingDate];LongDateTime]]
      $addSeparator
      $addTextDisplay[## Tags]
      $addTextDisplay[$codeBlock[$arrayJoin[tags;\n]]]
      $addSeparator[Large]
      $addTextDisplay[${listDesign()}]
      $addSeparator
      $addActionRow
      $addStringSelectMenu[historyChooseAdd-$authorID;Choose an option]
      $addOption[Points;;points]
      $addOption[Rares;;raresQuantity]
      $addOption[Play Type;;playType]
      $addOption[Difficulty;;difficulty]
      $addOption[Ended at;;endedAt]
      $addOption[Tags;;tags]
      $addOption[Rares List;;raresList]
      $addActionRow
      $addButton[uploadNewHistoryPage-$authorID;Upload;Success;;$get[disabledUploadButton]]
    ;$getGlobalVar[luckyColor]]
    $setUserVar[savedNewHistoryConfig;$env[savedNewHistoryConfig]]
    $interactionUpdate
  `
},{
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu'],
  code: `
    $arrayLoad[interactionID;-;$customID]
    $arrayLoad[passKeys;,;historyChooseAdd]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[interactionID;$env[key]]]]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $onlyIf[$arrayIncludes[interactionID;$authorID];$callFunction[notYourBTN]]

    $let[option;$selectMenuValues]
    $timezone[$env[userProfile;timezone]]
    
    $jsonLoad[difficulties;$getGlobalVar[difficulties]]
    $jsonLoad[allLobbyTags;$getGlobalVar[allLobbyTags]]

    $jsonLoad[savedNewHistoryConfig;$getUserVar[savedNewHistoryConfig]]
    $jsonLoad[raresList;$env[savedNewHistoryConfig;raresList]]
    $jsonLoad[tags;$env[savedNewHistoryConfig;tags]]
    $let[points;$env[savedNewHistoryConfig;points]]
    $let[rares;$env[savedNewHistoryConfig;rares]]
    $let[endingDate;$env[savedNewHistoryConfig;endedAt]]
    $let[difficulty;$env[savedNewHistoryConfig;difficulty]]
    $let[playType;$env[savedNewHistoryConfig;playType]]

    $switch[$get[option];

      $case[points;
        $modal[addHistoryCustomPoints-$authorID;Editing Points]
        $addTextInput[addedPoints;Edit your points;Short;true;Current: $get[points];;1;3]
        $showModal
        $fetchResponse[$channelID;$messageID]
      ]

      $case[raresQuantity;
        $modal[addHistoryCustomRares-$authorID;Editing Rares Quantity]
        $addTextInput[addedRaresQuantity;Edit your rares quantity;Short;true;Current: $get[rares];;1;3]
        $showModal
        $fetchResponse[$channelID;$messageID]
      ]

      $case[playType;
        $addContainer[
          $callFunction[newAuthor]
          $addSeparator[Large]
          $addActionRow
          $addStringSelectMenu[addHistoryCustomPlayType-$authorID;Choose play type]
          $addOption[Party;;party]
          $addOption[Solo;;solo]
          $addTextDisplay[-# Current: $toTitleCase[$get[playType]]]
        ;$getGlobalVar[luckyColor]]
      ]

      $case[difficulty;
        $addContainer[
          $callFunction[newAuthor]
          $addSeparator[Large]
          $addActionRow
          $addStringSelectMenu[addHistoryCustomDifficulty-$authorID;Choose difficulty]
          $addOption[None;;none]
          $arrayForEach[difficulties;dif;
            $addOption[$toTitleCase[$env[dif]];;$env[dif]]
          ]
          $addTextDisplay[-# Current: $toTitleCase[$get[difficulty]]]
        ;$getGlobalVar[luckyColor]]
      ]

      $case[endedAt;
        $modal[addHistoryCustomEndedAt-$authorID;Editing Ending Date]
        $addTextInput[addedEndedAt;Edit your ending date;Paragraph;true;MM/DD/YYYY, HH:MM:SS AM/PM]
        $showModal
        $fetchResponse[$channelID;$messageID]
      ]

      $case[tags;
        $if[$arrayLength[tags]!=0;
          $arrayMap[tags;tag;
            $return[$env[allLobbyTags;$env[tag]]]
          ;tags]
        ;
          $arrayPush[tags;None]
        ]

        $addContainer[
          $callFunction[newAuthor]
          $addSeparator[Large]
          $addActionRow
          $addStringSelectMenu[addHistoryCustomTags-$authorID;Choose Tags]
          $addOption[Unlimited Rares;;unlimitedRares]
          $addTextDisplay[-# Current: $arrayJoin[tags;, ]]
        ;$getGlobalVar[luckyColor]]
      ]

      $case[raresList;
        $modal[addHistoryCustomRaresList-$authorID;Editing Rares List]
        $addTextInput[addedRaresList;Edit your rares list;Paragraph;true;Use the following format:\n<rareShortName1>=<newAmount1>,<rareShortName2>=<newAmount2>]
        $showModal
        $fetchResponse[$channelID;$messageID]
      ]

    ]
    $interactionUpdate
  `
},{
  type: 'interactionCreate',
  allowedInteractionTypes: ['button', 'modal'],
  code: `
    $arrayLoad[interactionID;-;$customID]
    $arrayLoad[passKeys;,;editHistoryPage,editHistoryPageModal]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[interactionID;$env[key]]]]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $onlyIf[$arrayIncludes[interactionID;$authorID];$callFunction[notYourBTN]]

    $jsonLoad[sortingOptions;$getGlobalVar[sortingOptions]]

    $let[page;$default[$input[editHistoryPageNumber];$env[interactionID;0]]]
    $onlyIf[$and[$isNumber[$get[page]];$get[page]>0];
      $callFunction[newError;Invalid page number]
      $ephemeral
      $interactionReply
    ]
    $let[sortType;$default[$toLowerCase[$input[editHistoryPageSorting]];$env[interactionID;1]]]
    $onlyIf[$arrayIncludes[sortingOptions;$get[sortType]];
      $callFunction[newError;Invalid sorting type]
      $ephemeral
      $interactionReply
    ]

    ${editHistoryEmbed()}
    $ephemeral
    $if[$isModal;$interactionUpdate;$interactionReply]
  `
},{
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu'],
  code: `
    $arrayLoad[interactionID;-;$customID]
    $arrayLoad[passKeys;,;historyChooseEdit]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[interactionID;$env[key]]]]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $onlyIf[$arrayIncludes[interactionID;$authorID];$callFunction[notYourBTN]]

    $let[option;$selectMenuValues]
    $let[page;$env[interactionID;0]]
    $let[sortType;$env[interactionID;1]]
    $let[pageIndex;$math[$get[page] - 1]]

    $timezone[$env[userProfile;timezone]]

    $jsonLoad[history;$env[userProfile;1hl;history]]
    $jsonLoad[difficulties;$getGlobalVar[difficulties]]
    $jsonLoad[allLobbyTags;$getGlobalVar[allLobbyTags]]

    ${historySorting()}

    $jsonLoad[tagsInHistory;$env[history;$get[pageIndex];tags]]
    $jsonLoad[raresListInHistory;$env[history;$get[pageIndex];raresList]]
    $let[pointsInHistory;$env[history;$get[pageIndex];points]]
    $let[rareInHistory;$env[history;$get[pageIndex];rares]]
    $let[endingDateInHistory;$env[history;$get[pageIndex];endedAt]]
    $let[difficultyInHistory;$env[history;$get[pageIndex];difficulty]]
    $let[playTypeInHistory;$env[history;$get[pageIndex];playType]]

    $switch[$get[option];

      $case[points;
        $modal[$get[page]-$get[sortType]-editHistoryCustomPoints-$authorID;Editing Points]
        $addTextInput[editedPoints;Edit your points;Short;true;Current: $get[pointsInHistory];;1;3]
        $showModal
        $fetchResponse[$channelID;$messageID]
      ]

      $case[raresQuantity;
        $modal[$get[page]-$get[sortType]-editHistoryCustomRares-$authorID;Editing Rares Quantity]
        $addTextInput[editedRaresQuantity;Edit your rares quantity;Short;true;Current: $get[rareInHistory];;1;3]
        $showModal
        $fetchResponse[$channelID;$messageID]
      ]

      $case[playType;
        $addContainer[
          $callFunction[newAuthor]
          $addSeparator[Large]
          $addActionRow
          $addStringSelectMenu[$get[page]-$get[sortType]-editHistoryCustomPlayType-$authorID;Choose play type]
          $addOption[Party;;party]
          $addOption[Solo;;solo]
          $addTextDisplay[-# Current: $toTitleCase[$get[playTypeInHistory]]]
        ;$getGlobalVar[luckyColor]]
      ]

      $case[difficulty;
        $addContainer[
          $callFunction[newAuthor]
          $addSeparator[Large]
          $addActionRow
          $addStringSelectMenu[$get[page]-$get[sortType]-editHistoryCustomDifficulty-$authorID;Choose difficulty]
          $addOption[None;;none]
          $arrayForEach[difficulties;dif;
            $addOption[$toTitleCase[$env[dif]];;$env[dif]]
          ]
          $addTextDisplay[-# Current: $toTitleCase[$get[difficultyInHistory]]]
        ;$getGlobalVar[luckyColor]]
      ]

      $case[endedAt;
        $modal[$get[page]-$get[sortType]-editHistoryCustomEndedAt-$authorID;Editing Ending Date]
        $addTextInput[editedEndedAt;Edit your ending date;Paragraph;true;Current: $parseDate[$get[endingDateInHistory];Locale] (Use it as an example)]
        $showModal
        $fetchResponse[$channelID;$messageID]
      ]

      $case[tags;
        $if[$arrayLength[tagsInHistory]!=0;
          $arrayMap[tagsInHistory;tag;
            $return[$env[allLobbyTags;$env[tag]]]
          ;tagsInHistory]
        ;
          $arrayPush[tagsInHistory;None]
        ]

        $addContainer[
          $callFunction[newAuthor]
          $addSeparator[Large]
          $addActionRow
          $addStringSelectMenu[$get[page]-$get[sortType]-editHistoryCustomTags-$authorID;Choose Tags]
          $addOption[Unlimited Rares;;unlimitedRares]
          $addTextDisplay[-# Current: $arrayJoin[tagsInHistory;, ]]
        ;$getGlobalVar[luckyColor]]
      ]

      $case[raresList;
        $modal[$get[page]-$get[sortType]-editHistoryCustomRaresList-$authorID;Editing Rares List]
        $addTextInput[editedRaresList;Edit your rares list;Paragraph;true;Use the following format:\n<rareShortName1>=<newAmount1>,<rareShortName2>=<newAmount2>]
        $showModal
        $fetchResponse[$channelID;$messageID]
      ]

    ]
    $interactionUpdate
  `
},{
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu', 'modal'],
  code: `
    $arrayLoad[interactionID;-;$customID]
    $arrayLoad[passKeys;,;editHistoryCustomPoints,editHistoryCustomRares,editHistoryCustomPlayType,editHistoryCustomDifficulty,editHistoryCustomEndedAt,editHistoryCustomTags,editHistoryCustomRaresList]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[interactionID;$env[key]]]]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $onlyIf[$arrayIncludes[interactionID;$authorID];$callFunction[notYourBTN]]

    $let[value;$selectMenuValues]
    $let[page;$env[interactionID;0]]
    $let[sortType;$env[interactionID;1]]
    $let[pageIndex;$math[$get[page] - 1]]

    $timezone[$env[userProfile;timezone]]

    $jsonLoad[history;$env[userProfile;1hl;history]]
    $jsonLoad[difficulties;$getGlobalVar[difficulties]]
    $jsonLoad[allLobbyTags;$getGlobalVar[allLobbyTags]]
    $jsonLoad[animals;$readFile[json/animals.json]]

    ${historySorting()}

    $jsonLoad[tagsInHistory;$env[history;$get[pageIndex];tags]]
    $jsonLoad[raresListInHistory;$env[history;$get[pageIndex];raresList]]
    $let[pointsInHistory;$env[history;$get[pageIndex];points]]
    $let[rareInHistory;$env[history;$get[pageIndex];rares]]
    $let[endingDateInHistory;$env[history;$get[pageIndex];endedAt]]
    $let[difficultyInHistory;$env[history;$get[pageIndex];difficulty]]
    $let[playTypeInHistory;$env[history;$get[pageIndex];playType]]

    ${editHistoryEmbed()}
    $interactionUpdate

    $switch[$env[interactionID;2];

      $case[editHistoryCustomPoints;

        $let[input;$input[editedPoints]]
        $onlyIf[$and[$isNumber[$get[input]];$get[input]>0];
          $callFunction[newError;Invalid number!]
          $ephemeral
          $interactionFollowUp
        ]
        $!jsonSet[history;$get[pageIndex];points;$get[input]]
        $addContainer[
          $callFunction[newAuthor]
          $addSeparator[Large]
          $addTextDisplay[## Successfully updated points! ($get[pointsInHistory] -> $get[input])]
        ;$getGlobalVar[luckyColor]]
      ]


      $case[editHistoryCustomRares;
        $let[input;$input[editedRaresQuantity]]
        $onlyIf[$and[$isNumber[$get[input]];$get[input]>0];
          $callFunction[newError;Invalid number!]
          $ephemeral
          $interactionFollowUp
        ]
        $!jsonSet[history;$get[pageIndex];rares;$get[input]]
        $addContainer[
          $callFunction[newAuthor]
          $addSeparator[Large]
          $addTextDisplay[## Successfully updated rares quantity!]
          $addSeparator[Large]
          $addTextDisplay[# Old]
          $addTextDisplay[\`\`\`$toTitleCase[$get[rareInHistory]]\`\`\`]
          $addSeparator
          $addTextDisplay[# New]
          $addTextDisplay[\`\`\`$toTitleCase[$get[input]]\`\`\`]
        ;$getGlobalVar[luckyColor]]
      ]


      $case[editHistoryCustomPlayType;
        $!jsonSet[history;$get[pageIndex];playType;$get[value]]
        $addContainer[
          $callFunction[newAuthor]
          $addSeparator[Large]
          $addTextDisplay[## Successfully updated play type!]
          $addSeparator[Large]
          $addTextDisplay[# Old]
          $addTextDisplay[\`\`\`$toTitleCase[$get[playTypeInHistory]]\`\`\`]
          $addSeparator
          $addTextDisplay[# New]
          $addTextDisplay[\`\`\`$toTitleCase[$get[value]]\`\`\`]
        ;$getGlobalVar[luckyColor]]
      ]


      $case[editHistoryCustomDifficulty;
        $!jsonSet[history;$get[pageIndex];difficulty;$get[value]]
        $addContainer[
          $callFunction[newAuthor]
          $addSeparator[Large]
          $addTextDisplay[## Successfully updated difficulty!]
          $addSeparator[Large]
          $addTextDisplay[# Old]
          $addTextDisplay[\`\`\`$toTitleCase[$get[difficultyInHistory]]\`\`\`]
          $addSeparator
          $addTextDisplay[# New]
          $addTextDisplay[\`\`\`$toTitleCase[$get[value]]\`\`\`]
        ;$getGlobalVar[luckyColor]]
      ]


      $case[editHistoryCustomEndedAt;
        $let[input;$input[editedEndedAt]]
        $let[date;$unparseDate[$get[input]]]
        $onlyIf[$get[date]>0;
          $callFunction[newError;Invalid date!]
          $ephemeral
          $interactionFollowUp
        ]
        $!jsonSet[history;$get[pageIndex];endedAt;$get[date]]
        $addContainer[
          $callFunction[newAuthor]
          $addSeparator[Large]
          $addTextDisplay[## Successfully updated ending date!]
          $addSeparator[Large]
          $addTextDisplay[# Old]
          $addTextDisplay[\`\`\`$parseDate[$get[endingDateInHistory];Locale]\`\`\`]
          $addSeparator
          $addTextDisplay[# New]
          $addTextDisplay[\`\`\`$parseDate[$get[date];Locale]\`\`\`]
        ;$getGlobalVar[luckyColor]]
      ]


      $case[editHistoryCustomTags;
        $jsonLoad[allLobbyTags;$getGlobalVar[allLobbyTags]]
        $jsonLoad[oldTags;$env[tagsInHistory]]
        $if[$arrayLength[oldTags]==0;
          $let[old;None]
        ;
          $arrayMap[oldTags;tag;
            $return[$env[allLobbyTags;$env[tag]]]
          ;oldTags]
          $let[old;$arrayJoin[oldTags;, ]]
        ]

        $if[$arrayIncludes[tagsInHistory;$get[value]];
          $!arraySplice[tagsInHistory;$arrayIndexOf[tagsInHistory;$get[value]];1]
        ;
          $arrayPush[tagsInHistory;$get[value]]
        ]

        $!jsonSet[history;$get[pageIndex];tags;$env[tagsInHistory]]

        $if[$arrayLength[tagsInHistory]==0;
          $let[new;None]
        ;
          $arrayMap[tagsInHistory;tag;
            $return[$env[allLobbyTags;$env[tag]]]
          ;tagsInHistory]
          $let[new;$arrayJoin[tagsInHistory;, ]]
        ]

        $addContainer[
          $callFunction[newAuthor]
          $addSeparator[Large]
          $addTextDisplay[## Successfully updated tags!]
          $addSeparator[Large]
          $addTextDisplay[# Old]
          $addTextDisplay[\`\`\`$get[old]\`\`\`]
          $addSeparator
          $addTextDisplay[# New]
          $addTextDisplay[\`\`\`$get[new]\`\`\`]
        ;$getGlobalVar[luckyColor]]
      ]


      $case[editHistoryCustomRaresList;
        $jsonLoad[raresList;$env[raresListInHistory]]
        ${raresListGenerator()}
        $let[old;$arrayJoin[content; ]]

        $arrayLoad[editedRaresList;,;$input[editedRaresList]]
        $arrayForEach[editedRaresList;elem;
          $arrayLoad[keyValue;=;$env[elem]]
          $let[animalID;$callFunction[findingAnimalID;$env[keyValue;0]]]
          $let[value;$env[keyValue;1]]

          $onlyIf[$get[animalID]!=undefined;
            $callFunction[newError;Unknown animal \`$env[keyValue;0]\` in \`$env[elem]\`!]
            $ephemeral
            $interactionFollowUp
          ]

          $onlyIf[$isNumber[$get[value]];
            $callFunction[newError;Invalid value \`$get[value]\` in \`$env[elem]\`]
            $ephemeral
            $interactionFollowUp
          ]

          $!jsonSet[raresListInHistory;$get[animalID];$get[value]]

          $if[$get[value]<=0;
            $!jsonDelete[raresListInHistory;$get[animalID]]
          ]
        ]
        $jsonLoad[raresList;$env[raresListInHistory]]
        ${raresListGenerator()}
        $let[new;$arrayJoin[content; ]]

        $addContainer[
          $callFunction[newAuthor]
          $addSeparator[Large]
          $addTextDisplay[## Successfully updated rares list!]
          $addSeparator[Large]
          $addTextDisplay[# Old]
          $addTextDisplay[# $get[old]]
          $addSeparator
          $addTextDisplay[# New]
          $addTextDisplay[# $get[new]]
        ;$getGlobalVar[luckyColor]]
        $!jsonSet[history;$get[pageIndex];raresList;$env[raresListInHistory]]
      ]
    ]
    
    $!jsonSet[userProfile;1hl;history;$env[history]]
    $setUserVar[userProfile;$env[userProfile]]
    $ephemeral
    $interactionFollowUp
  `
},{
  type: 'interactionCreate',
  allowedInteractionTypes: ['button'],
  code: `
    $arrayLoad[interactionID;-;$customID]
    $arrayLoad[passKeys;,;uploadNewHistoryPage]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[interactionID;$env[key]]]]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $onlyIf[$arrayIncludes[interactionID;$authorID];$callFunction[notYourBTN]]
    
    $jsonLoad[history;$env[userProfile;1hl;history]]
    $jsonLoad[savedNewHistoryConfig;$getUserVar[savedNewHistoryConfig]]
    $jsonLoad[raresList;$env[savedNewHistoryConfig;raresList]]
    $jsonLoad[tags;$env[savedNewHistoryConfig;tags]]
    $let[points;$env[savedNewHistoryConfig;points]]
    $let[rares;$env[savedNewHistoryConfig;rares]]
    $let[endingDate;$env[savedNewHistoryConfig;endedAt]]
    $let[difficulty;$env[savedNewHistoryConfig;difficulty]]
    $let[playType;$env[savedNewHistoryConfig;playType]]

    $jsonLoad[newHistory;{
      "points": $get[points],
      "rares": $get[rares],
      "endedAt": "$get[endingDate]",
      "playType": "$get[playType]",
      "tags": $env[tags],
      "difficulty": "$get[difficulty]",
      "raresList": $env[raresList]
    }]

    $arrayPushJSON[history;$env[newHistory]]
    $!jsonSet[userProfile;1hl;history;$env[history]]
    $setUserVar[userProfile;$env[userProfile]]
    $deleteUserVar[savedNewHistoryConfig]

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]
      $addTextDisplay[## Successfully added new history!]
    ;$getGlobalVar[luckyColor]]
    $interactionUpdate
  `
},

// LOBBY

{
  name: "party",
  aliases: ["lobby"],
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]

    $onlyIf[$getChannelVar[participants]==;
      $jsonLoad[participants;$getChannelVar[participants]]
      $let[host;$env[participants;0]]
      ${participants(true)}
      $callFunction[embed;error]
      $description[## Party already exist in this channel!]
      $addField[Participants:;$codeBlock[$get[parts]]]
      $addActionRow
      $addButton[closeLobby-$get[host];Close Manually;Danger;🔚]
    ]
    $onlyIf[$getUserVar[1hstarted|$channelID]!=true;
      $callFunction[embed;error]
      $description[## You have an active challenge! End it before creating a Lobby!]
    ]
    
    $arrayLoad[participants; ;$authorID]
    $arrayLoad[lobbyTags]
    $setUserVar[participating|$channelID;true]
    $setUserVar[ready|$channelID;false]
    $setChannelVar[lobbyTags;$env[lobbyTags]]
    $setChannelVar[lobbyDifficulty;none]
    $setChannelVar[participants;$env[participants]]
    
    ${LOBBY_EMBED()}
    $let[msgid;$sendMessage[$channelID;;true]]
    ${lobbyTimeout()}
  `
},{
  type: "interactionCreate",
  description: "When pressing Participate",
  name: "joinLobby",
  code: `
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]

    $jsonLoad[participants;$getChannelVar[participants]]

    ${lobbyExist()}

    $onlyIf[$arrayIncludes[participants;$authorID]==false;
      $interactionReply[
        $ephemeral
        $callFunction[embed;error]
        $description[## You're already participating]
      ]
    ]
    $onlyIf[$getUserVar[1hstarted|$channelID;$authorID;false]!=true;
      $interactionReply[
        $ephemeral
        $callFunction[embed;error]
        $description[## You have an active challenge! Complete it before participating]
      ]
    ]
    $onlyIf[$arrayLength[participants]<6;
      $interactionReply[
        $ephemeral
        $callFunction[embed;error]
        $description[## The Lobby is full]
      ]
    ]

    $arrayPush[participants;$authorID]
    $setUserVar[ready|$channelID;false]
    $setUserVar[participating|$channelID;true]

    $let[msgid;$messageID]
    $setChannelVar[participants;$env[participants]]
    ${LOBBY_EMBED()}
    $interactionUpdate

    $!stopTimeout[LOBBYTIMEOUT-$channelID]
    ${lobbyTimeout()}
  `
},{
  type: "interactionCreate",
  description: "When pressing Quit",
  name: "quitLobby",
  code: `
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $jsonLoad[participants;$getChannelVar[participants]]

    ${lobbyExist()}

    $onlyIf[$arrayIncludes[participants;$authorID];
      $interactionReply[
        $ephemeral
        $callFunction[embed;error]
        $description[## You're not a participant]
      ]
    ]

    $let[msgid;$messageID]
    $let[host;$env[participants;0]]

    $!stopTimeout[LOBBYTIMEOUT-$channelID]

    $!arraySplice[participants;$arrayIndexOf[participants;$authorID];1]
    $deleteUserVar[participating|$channelID]
    $deleteUserVar[ready|$channelID]

    $if[$env[participants;0]==;
      ${deleteLobbyVars()}

      $deferUpdate
      $!deleteMessage[$channelId;$get[msgid]]
      $author[$username[$get[host]]'s Lobby;$userAvatar[$get[host]]]
      $description[# The Lobby was closed due to a lack of participants]
      $color[Orange]
      $sendMessage[$channelID]
      $stop
    ]

    $setChannelVar[participants;$env[participants]]
    
    ${LOBBY_EMBED()}
    $interactionUpdate
    ${lobbyTimeout()}
  `
},{
  type: "interactionCreate",
  description: "When pressing End",
  allowedInteractionTypes: ["button"],
  code: `
    $arrayLoad[interactionID;-;$customID]
    $arrayLoad[passKeys;,;endLobby,closeLobby]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[interactionID;$env[key]]]]
    $onlyIf[$arrayIncludes[interactionID;$authorID]]

    $jsonLoad[participants;$getChannelVar[participants]]
    $jsonLoad[userProfile;$getUserVar[userProfile]]

    ${lobbyExist()}
    $let[host;$env[participants;0]]
    $let[msgid;$messageID]

    $arrayForEach[participants;user;
      $deleteUserVar[participating|$channelID;$env[user]]
      $deleteUserVar[ready|$channelID;$env[user]]
    ]

    ${deleteLobbyVars()}

    $deferUpdate
    $!deleteMessage[$channelId;$get[msgid]]

    $author[$username[$get[host]]'s Lobby;$userAvatar[$get[host]]]
    $description[# The Lobby was closed by the Host]
    $color[Orange]
    $sendMessage[$channelID]
    $!stopTimeout[LOBBYTIMEOUT-$channelID]
  `
},{
  type: "interactionCreate",
  description: "When pressing Start",
  allowedInteractionTypes: ["button"],
  code: `
    $arrayLoad[interactionID;-;$customID]
    $onlyIf[$arrayIncludes[interactionID;startLobby]]
    $onlyIf[$arrayIncludes[interactionID;$authorID]]
    $jsonLoad[participants;$getChannelVar[participants]]

    ${lobbyExist()}

    $onlyIf[$env[participants;1]!=;
      $interactionReply[
        $ephemeral
        $callFunction[embed;error]
        $description[## You can't start alone!]
      ]
    ]

    
    $let[s;10]
    $let[msgid;$messageID]
    $arrayLoad[members]

    ${participants(true)}
    $!stopTimeout[LOBBYTIMEOUT-$channelID]
    $!deleteMessage[$channelID;$get[msgid]]
    $let[msgid;$sendMessage[$channelID;${STARTING_EMBED()};true]]
    
    $setInterval[
      $letSub[s;1]
      $if[$get[s]<=0;
        $!stopInterval[COUNTDOWN-$channelID]
        $arrayForEach[participants;user;
          $deleteUserVar[ready|$channelID;$env[user]]
          ${loadVarsForChallenge('$env[user]')}
          $jsonLoad[progress;{"points": 0, "user": "$env[user]"}]
          $setUserVar[progress|$channelID;$env[progress];$env[user]]
          $arrayPush[members;<@$env[user]>]
        ]
          ${interval('$env[participants;0]')}
          ${interval('$env[participants;1]')}
          $if[$env[participants;2]!=;${interval('$env[participants;2]')}]
          $if[$env[participants;3]!=;${interval('$env[participants;3]')}]
          $if[$env[participants;4]!=;${interval('$env[participants;4]')}]
          $if[$env[participants;5]!=;${interval('$env[participants;5]')}]
        
        $!deleteMessage[$channelID;$get[msgid]]
        $sendMessage[$channelID;
          $arrayJoin[members; ]
          ${STARTING_EMBED()}
          $description[# 1 Hour Luck Challenge has begun!]
        ]
        $stop
      ]
      $!editMessage[$channelID;$get[msgid];${STARTING_EMBED()}]
    ;1s;COUNTDOWN-$channelID]
  `
},{
  type: 'interactionCreate',
  name: "readyLobby",
  description: 'when pressing Ready',
  code: `
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $jsonLoad[participants;$getChannelVar[participants]]

    ${lobbyExist()}

    $onlyIf[$arrayIncludes[participants;$authorID];
      $interactionReply[
        $ephemeral
        $callFunction[embed;error]
        $description[## You're not a participant]
      ]
    ]

    $setUserVar[ready|$channelID;$checkCondition[$getUserVar[ready|$channelID]==false]]
    
    ${LOBBY_EMBED()}
    $let[msgid;$messageID]
    $interactionUpdate
    $!stopTimeout[LOBBYTIMEOUT-$channelID]
    ${lobbyTimeout()}
  `
},{
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu'],
  description: "when selecting Tags",
  code: `
    $arrayLoad[interactionID;-;$customID]
    $let[value;$selectMenuValues]
    $arrayLoad[passKeys;,;addDifficultyLobby,addTagsLobby]

    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[interactionID;$env[key]]]]
    $onlyIf[$arrayIncludes[interactionID;$authorID]]

    $jsonLoad[participants;$getChannelVar[participants]]
    $jsonLoad[lobbyTags;$getChannelVar[lobbyTags]]
    ${lobbyExist()}

    $switch[$arrayAt[interactionID;0];
      $case[$arrayAt[passKeys;0];
        $setChannelVar[lobbyDifficulty;$get[value]]
      ]

      $case[$arrayAt[passKeys;1];
        $if[$arrayIncludes[lobbyTags;$get[value]];
          $!arraySplice[lobbyTags;$arrayIndexOf[lobbyTags;$get[value]];1]
        ;
          $arrayPush[lobbyTags;$get[value]]
        ]
        $setChannelVar[lobbyTags;$env[lobbyTags]]
      ]
    ]

    ${LOBBY_EMBED()}
    $let[msgid;$messageID]
    $interactionUpdate
    $!stopTimeout[LOBBYTIMEOUT-$channelID]
    ${lobbyTimeout()}
  `
},

// COUNT

{
  name: 'count',
  type: 'messageCreate',
  code: `
    $reply
    $let[cdTime;5s]
    ${JSON()}
    $callFunction[checking]
    $callFunction[cooldown;$get[cdTime]]
    
    $onlyIf[$message!=;
      $callFunction[newError;Usage: \`count <animalShortName> ...\`]
    ]

    $let[totalRares;0]
    $let[totalPoints;0]

    $arrayLoad[caughtRares; ;$toLowerCase[$message]]
    $jsonLoad[raresList;{}]
    $arrayLoad[unknownContent]

    $loop[$arrayLength[caughtRares];
      $let[i;$math[$env[i] - 1]]
      $let[caughtRare;$arrayAt[caughtRares;$get[i]]]

      $if[$arrayIncludes[allRares;$get[caughtRare]];;
        $arrayPush[unknownContent;$get[caughtRare]]
        $continue
      ]

      $let[animalID;$callFunction[findingAnimalID;$get[caughtRare]]]
      $let[newQuantity;$math[$env[raresList;$get[animalID]] + 1]]
      $!jsonSet[raresList;$get[animalID];$get[newQuantity]]
    ;i;true]

    ${raresListGenerator('listContent', true)}

    $c[===========EMBED===========]

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]
      $addTextDisplay[# 1 Hour Luck Points Count]
      $addSeparator[Large]
      $addTextDisplay[## ⁘ Total points: \`$get[totalPoints]\`]
      $addTextDisplay[## ⁘ Total rares: \`$get[totalRares]\`]
      $addSeparator
      $addTextDisplay[${listDesign('listContent')}]
      $addSeparator[Large]
      $if[$arrayLength[unknownContent]!=0;
        $addTextDisplay[# Unknown rares]
        $addSeparator
        $addTextDisplay[${listDesign('unknownContent')}]
      ]
    ;$getGlobalVar[luckyColor]]
  `
}]

// data

function JSON() {
  return `
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $jsonLoad[userSettings;$env[userProfile;1hl;settings]]
    $jsonLoad[challengeData;$getGlobalVar[$if[$getUserVar[event1hstarted|$channelID];eventChallengeData;challengeData]]]
    $jsonLoad[animals;$readFile[json/animals.json]]
    $jsonLoad[allRaresData;$getGlobalVar[allRaresData]]
    $jsonLoad[allRaresData;$jsonEntries[allRaresData]]
    $jsonLoad[allRares;$getGlobalVar[allRares]]
  `
}

function loadGlobalJSON() {
  return `
    $jsonLoad[difficulties;$getGlobalVar[difficulties]]
    $arrayLoad[styles;,;Success,Primary,Danger]
    $jsonLoad[allSettings;
      {
        "hidePoints": "Hide Points",
        "hideRares": "Hide Rares",
        "hideLimit": "Hide Rares Limit",
        "unlimitedRares": "Unlimited Rares",
        "difficulties": "Difficulties"
      }
    ]

    $jsonLoad[allSettingsEntries;$jsonEntries[allSettings]]
  `
}

// 1 hour luck functions

function settingParticProgress() {
  return `
    $if[$getUserVar[participating|$channelID];
      $jsonLoad[progress;$getUserVar[progress|$channelID]]
      $!jsonSet[progress;points;$getUserVar[1hpoints|$channelID]]
      $setUserVar[progress|$channelID;$env[progress]]
    ]
  `
}

function participants(hideReady = false) {
  return `
    $arrayForEach[participants;participant;
      $if[${hideReady};;
        $let[rdy;$if[$getUserVar[ready|$channelID;$env[participant]];✅;❌]]
      ]
      $let[parts;$get[parts]$get[rdy]$username[$env[participant]]\n]
    ]  
  `
}

function loadVarsForChallenge (id = "$authorID") {
  return `
    $setUserVar[1htime|$channelID;0;${id}]
    $setUserVar[1hstarted|$channelID;true;${id}]
    $setUserVar[1hpoints|$channelID;0;${id}]
    $setUserVar[1hpaused|$channelID;false;${id}]
    $setUserVar[1htotalRares|$channelID;0;${id}]
    $setUserVar[1hallRaresList|$channelID;{};${id}]
  `
}

function interval (id = "$authorID") {
  return `
    $setInterval[
      $setUserVar[1htime|$channelID;$math[$getUserVar[1htime|$channelID;${id}] + 1];${id}] 

      $switch[$getUserVar[1htime|$channelID;${id}];
        $case[1800;   ${timeLeft(30,  `m`, id)}   ]
        $case[3540;   ${timeLeft(1,   `m`, id)}   ]
        $case[3597;   ${timeLeft(3,   `s`, id)}   ]
        $case[3598;   ${timeLeft(2,   `s`, id)}   ]
        $case[3599;   ${timeLeft(1,   `s`, id)}   ] 
        $case[3600;
          $!stopInterval[1HLUCK-${id}|$channelID]
          $sendMessage[$channelID;
            $jsonLoad[userProfile;$getUserVar[userProfile;${id}]]
            $author[$username[${id}] • MUID: $env[userProfile;MUID];$userAvatar[${id}]]
            $color[$getGlobalVar[luckyColor]]
            $description[# 1 Hour Luck Ended!\n## You can still write rares if you didn't manage to finish.\n### Press «Confirm» button to end your challenge whenever you want.]

            $addActionRow
            $addButton[confirmEndingChallenge-${id};Confirm;Success;✅]
          ]
        ] 
      ]
    ;1s;1HLUCK-${id}|$channelID]
  `
}

function lobbyEnd() {
  return `
    $if[$getUserVar[participating|$channelID];
      $jsonLoad[participants;$getChannelVar[participants]]
      $let[allFinished;$arrayEvery[participants;ID;$checkCondition[$getUserVar[1hstarted|$channelID;$env[ID];false]==false]]]

      $if[$get[allFinished];

        $arrayLoad[result]
        $arrayLoad[parts]
        $arrayForEach[participants;user;
          $jsonLoad[progress;$getUserVar[progress|$channelID;$env[user]]]
          $arrayPushJSON[result;$env[progress]]
          $deleteUserVar[participating|$channelID;$env[user]]
          $deleteUserVar[progress|$channelID;$env[user]]
        ]
        $arrayAdvancedSort[result;A;B;$math[$env[B;points] - $env[A;points]];result]

        $let[position;0]
        
        $arrayForEach[result;res;
          $letSum[position;1]
          $let[emoji;$if[$get[position]==1;🥇;$if[$get[position]==2;🥈;$if[$get[position]==3;🥉;⁘]]]]
          $arrayPush[parts;### $get[emoji] $ordinal[$get[position]] ➤ $username[$env[res;user]] \n**$getGlobalVar[blank] Points: \`$env[res;points]\`**]
        ]

        $sendMessage[$channelID;
          $addContainer[
            $addTextDisplay[# 🎉 1 Hour Luck Ended! 🎉]
            $addSeparator
            $addTextDisplay[# 🌟 Winner: $username[$env[result;0;user]] 🌟]
            $addSeparator
            $addTextDisplay[$arrayJoin[parts;\n]]
          ;$getGlobalVar[luckyColor]]
        ]
        ${deleteLobbyVars()}
      ]
    ]
  `
}

function lobbyExist() {
  return `
    $onlyIf[$getChannelVar[participants]!=;
      $ephemeral
      $callFunction[embed;error]
      $description[## Party does not exist anymore]
    ]
  `
}

function isActiveChallenge () {
  return `
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $onlyIf[$getUserVar[1hstarted|$channelID];
      $callFunction[embed;error] 
      $description[## You don't have an active challenge!]
    ]
  `
}

function time(id = "$authorID") {
  return `
    $let[T;$getuservar[1htime|$channelID;${id}]]
    $let[time;⁘ Time passed: \`$parseDigital[$get[T]000]\`]
  `
}

function allRaresList(id = "$authorID") {
  return `
    $jsonLoad[raresList;$getUserVar[1hallRaresList|$channelID;${id}]]
    ${raresListGenerator()}
    $let[allRaresList;${listDesign()}]
  `
}

function totalPoints(id = "$authorID") {
  return `
    $let[TP;$getUserVar[1hpoints|$channelID;${id}]]
    $if[$arrayIncludes[userSettings;hidePoints];
    $let[styled;||$get[TP]||] 
    ; 
      $let[styled;\`$get[TP]\`]
    ]
    $let[totalPoints;⁘ Total points: $get[styled]]
  `
}

function totalRares(id = "$authorID") {
  return `
    $let[TR;$getUserVar[1htotalRares|$channelID;${id}]]
    $if[$arrayIncludes[userSettings;hideRares]; 
      $let[styled;||$get[TR]||] 
    ; 
      $let[styled;\`$get[TR]\`]
    ]
    $let[totalRares;⁘ Total rares: $get[styled]]
  `
}

function reset(id = "$authorID") {
  return `
    $!stopInterval[1HLUCK-${id}|$channelID]
    $deleteUserVar[1hstarted|$channelID;${id}]
    $deleteUserVar[1hallRaresList|$channelID;${id}]
    $deleteUserVar[1htime|$channelID;${id}]
    $deleteUserVar[1hpoints|$channelID;${id}]
    $deleteUserVar[1htotalRares|$channelID;${id}]
    $deleteUserVar[1hpaused|$channelID;${id}]
    $deleteUserVar[event1hstarted|$channelID]
  `
}

function raresListGenerator(arrayName = 'content', addPoints = false) {
  return `
    $jsonLoad[listEntries;$jsonEntries[raresList]]
    $arrayLoad[${arrayName}]
    $arrayLoad[displacement]

    $arrayForEach[listEntries;entry;
      $let[animalID;$env[entry;0]]
      $let[quantity;$env[entry;1]]
      $let[animalDisplay;$env[animals;$get[animalID];variants;0;emoji]]

      $if[${addPoints};
        $jsonLoad[output;$callFunction[findingRareInChallengeDataBase;$get[animalID]]]
        $letSum[totalPoints;$math[$env[output;points] * $get[quantity]]]
        $letSum[totalRares;$get[quantity]]
      ]

      $arrayPush[${arrayName};$get[animalDisplay]\`$get[quantity]\`]
    ]

    $if[$arrayLength[${arrayName}]==0;
      $arrayPush[${arrayName};none]
    ;
      $loop[$arrayLength[${arrayName}];
        $let[i;$math[$env[i]-1]]

        $if[$or[$math[$get[i]%6]==0;$and[$get[i]==$math[$arrayLength[${arrayName}]-1];$arrayLength[${arrayName}]<1]];
          $jsonLoad[chunk;$arraySplice[${arrayName};0;6]]
          $arrayPushJSON[displacement;$env[chunk]]
        ]
      ;i;true]

      $arrayLoad[${arrayName}]
      $arrayForEach[displacement;page;
        $arrayPush[${arrayName};$arrayJoin[page; ]]
      ]
    ]
  `
}

function timeLeft(num, time, id = "$authorID") {
  return `$sendMessage[$channelID;# <@${id}> You have ${num}${time} left!]` 
}

function deleteLobbyVars() {
  return `
    $deleteChannelVar[participants]
    $deleteChannelVar[lobbyTags]
    $deleteChannelVar[lobbyDifficulty]
  `
}

// embed functions

function editHistoryEmbed() {
  return `
    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]
      $addTextDisplay[## Choose what you want to edit!]
      $addSeparator
      $addActionRow
      $addStringSelectMenu[$get[page]-$get[sortType]-historyChooseEdit-$authorID;Choose an option]
      $addOption[Points;;points]
      $addOption[Rares;;raresQuantity]
      $addOption[Play Type;;playType]
      $addOption[Difficulty;;difficulty]
      $addOption[Ended at;;endedAt]
      $addOption[Tags;;tags]
      $addOption[Rares List;;raresList]
    ;$getGlobalVar[luckyColor]]
  `
}


function historyEmbed() {
  return `
    $let[index;$math[$get[page] - 1]]
    $jsonLoad[allLobbyTags;$getGlobalVar[allLobbyTags]]
    $jsonLoad[raresList;$env[history;$get[index];raresList]]
    $jsonLoad[tags;$env[history;$get[index];tags]]
    $jsonLoad[sortingOptions;$getGlobalVar[sortingOptions]]

    $if[$arrayLength[tags]==0;
      $arrayPush[tags;none]
    ;
      $arrayMap[tags;tag;$return[$env[allLobbyTags;$env[tag]]];tags]
    ]
    
    ${raresListGenerator()}

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]
      $addTextDisplay[### Points: \`$env[history;$get[index];points]\`]
      $addSeparator
      $addTextDisplay[### Rares: \`$env[history;$get[index];rares]\`]
      $addSeparator
      $addTextDisplay[### Play Type: \`$toTitleCase[$env[history;$get[index];playType]]\`]
      $addSeparator
      $addTextDisplay[### Difficulty: \`$toTitleCase[$env[history;$get[index];difficulty]]\`]
      $addSeparator
      $addTextDisplay[### Ended at: $discordTimestamp[$env[history;$get[index];endedAt];LongDateTime]]
      $addSeparator
      $addTextDisplay[## Tags]
      $addTextDisplay[$codeBlock[$arrayJoin[tags;\n]]]
      $addSeparator[Large]
      $addTextDisplay[${listDesign()}]

      $if[$arrayLength[history]>1;
        $addActionRow
        $addButton[$get[page]-$get[sortType]-historyPageLeft-$authorID;;Primary;⬅️]
        $addButton[$get[page]-$get[sortType]-historyPageCustom-$authorID;Page $get[page]/$arrayLength[history];Primary;🔎]
        $addButton[$get[page]-$get[sortType]-historyPageRight-$authorID;;Primary;➡️]
        $addActionRow
        $addStringSelectMenu[sortHis-$authorID;Sort by]
        $arrayForEach[sortingOptions;option;
          $addOption[Sort Type: $toTitleCase[$env[option]];;$get[page]-$env[option];;$checkCondition[$get[sortType]==$env[option]]]
        ]
      ]
      $if[$env[history;0]!=;
        $addActionRow
        $addButton[$get[page]-$get[sortType]-deleteHistoryPage-$authorID;Delete This Page;Danger;🗑️]
        $addButton[$get[page]-$get[sortType]-editHistoryPage-$authorID;Edit This Page;Success;✏️]
      ]
    ;$getGlobalVar[luckyColor]]
  `
}

function settingsEmbed() {
  return `
    $jsonLoad[user1hlData;$env[userProfile;1hl]]
    $jsonLoad[userSettings;$env[user1hlData;settings]]
    ${loadGlobalJSON()}
    $let[difficulty;$default[$env[user1hlData;difficulty];$arrayAt[difficulties;0]]]

    $let[disabled;false]

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator
      $addTextDisplay[# Settings:]

      $arrayForEach[allSettingsEntries;entry;
        $let[key;$env[entry;0]]
        $let[content;$env[entry;1]]
        $let[hasKey;$arrayIncludes[userSettings;$get[key]]]

        $if[$get[hasKey];
          $let[state;Enabled]
          $let[style;Success]
        ;
          $let[state;Disabled]
          $let[style;Danger]
        ]

        $addSection[
          $addTextDisplay[### $get[content]]
          $addButton[$get[key]-settings-$authorID;$get[state];$get[style]]
        ]
      ]

      $if[$arrayIncludes[userSettings;difficulties];

        $addSeparator[Large]
        $addTextDisplay[### Difficulty]
        $addActionRow
        $arrayForEach[difficulties;elem;
          $let[i;$arrayIndexOf[difficulties;$env[elem]]]
          $let[disabled;$checkCondition[$get[difficulty]==$env[elem]]]
          
          $let[style;$arrayAt[styles;$get[i]]]
          $addButton[$env[elem]-difficulty-settings-$authorID;$toTitleCase[$env[elem]];$get[style];;$get[disabled]]
        ]

      ]
    ;$getGlobalVar[luckyColor]]
  `
}

function STARTING_EMBED() {
  return `
    $description[# Get ready! Starting in $get[s] seconds!]
    $color[$getGlobalVar[luckyColor]]
  `
}

function LOBBY_EMBED() {
  return `
    $jsonLoad[allLobbyTags;$getGlobalVar[allLobbyTags]]
    $jsonLoad[difficulties;$getGlobalVar[difficulties]]
    $jsonLoad[participants;$getChannelVar[participants]]
    $let[host;$env[participants;0]]

    ${participants()}

    $let[allRdy;$arrayEvery[participants;user;$return[$getUserVar[ready|$channelID;$env[user]]]]]
    $let[disableStart;$and[$get[allRdy];$arrayLength[participants]>1]]
    $let[disableStart;$checkCondition[$get[disableStart]==false]]

    $jsonLoad[lobbyTags;$getChannelVar[lobbyTags]]
    $arrayLoad[tagsContent]
    
    $arrayForEach[lobbyTags;tag;$arrayPush[tagsContent;$env[allLobbyTags;$env[tag]]]]

    $if[$arrayLength[lobbyTags]==0;$arrayPush[tagsContent;none]]

    $addContainer[
      $addSection[
        $addTextDisplay[## $username[$get[host]]'s Lobby]
        $addThumbnail[$userAvatar[$get[host]]]
      ]
      $addSeparator
      $addTextDisplay[# Participants]
      $addTextDisplay[**$codeBlock[$get[parts]]**]
      $addActionRow
      $addButton[joinLobby;Participate;Success;🔝]
      $addButton[quitLobby;Quit;Danger;🔙]
      $addButton[readyLobby;Ready;Success;✅]
      $addSeparator[Large]
      $addTextDisplay[# Settings]
      $addSeparator
      $addTextDisplay[### Mode: \`FFA\`]
      $addTextDisplay[### Difficulty: \`$toTitleCase[$getChannelVar[lobbyDifficulty]]\`]
      $addTextDisplay[### Tags:\n**$codeBlock[$arrayJoin[tagsContent;\n]]**]

      $addSeparator

      $addActionRow
      $addStringSelectMenu[addTagsLobby-$get[host];Choose Tags]
      $addOption[Unlimited Rares;(Toggle);unlimitedRares]

      $addActionRow
      $addStringSelectMenu[addDifficultyLobby-$get[host];Choose Difficulty]
      $addOption[Disable Difficulty;(Select);none]
      $arrayForEach[difficulties;elem;
        $addOption[$toTitleCase[$env[elem]] Difficulty;(Select);$env[elem]]
      ]

      $addActionRow
      $addStringSelectMenu[switchMode-$get[host];Mode;true]
      $addOption[.;.;.]

      $addSeparator

      $addActionRow
      $addButton[startLobby-$get[host];Start;Success;✔️;$get[disableStart]]
      $addButton[endLobby-$get[host];End;Danger;🔚]
    ;$getGlobalVar[luckyColor]]
  `
}

// other

function settingsTimeout() {
  return ``
  return `
    $setTimeout[
      $disableComponentsOf[$channelID;$get[msg]]
    ;1m;SETT-$authorID]
  `
}

function historyTimeout () {
  return ``
  return `
    $setTimeout[
      $!disableComponentsOf[$channelID;$get[msg]]
    ;1m;1HLHISTORY-$authorID]`
}

function historySorting() {
  return `
    $switch[$get[sortType];
      $case[points;
        $arrayAdvancedSort[history;elem1;elem2;
          $math[$env[elem2;points] - $env[elem1;points]]
        ;history]
      ]

      $case[rares;
        $arrayAdvancedSort[history;elem1;elem2;
          $math[$env[elem2;rares] - $env[elem1;rares]]
        ;history]
      ]

      $case[date;
        $arrayAdvancedSort[history;elem1;elem2;
          $math[$env[elem2;endedAt] - $env[elem1;endedAt]]
        ;history]
      ]
    ]
  `
}

function lobbyTimeout () {
  return `
    $setTimeout[
      $!deleteMessage[$channelID;$get[msgid]]
      $sendMessage[$channelID;
        $description[## Party created by <@$env[participants;0]> was closed due to inactivity]
        $color[Orange]
      ]
      $arrayForEach[participants;user;
        $deleteUserVar[participating|$channelID;$env[user]]
      ]
      ${deleteLobbyVars()}
    ;$getGlobalVar[lobbyInactiveTime];LOBBYTIMEOUT-$channelID]
  `
}

function listDesign(arrayName = "content") { return `# ╔══════༺❀༻༺❀༻══════╗\n# $arrayJoin[${arrayName};\n# ]\n# ╚══════༺❀༻༺❀༻══════╝` }