const type = 'emoji' // editable between 'name' and 'emoji'. Shows animal's name or emoji in "all rares list"
module.exports = [
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

    $c[
      $if[$message[0]==event;$setUserVar[event1hstarted|$channelID;true] $let[extraDesc;Event ]]
    ]

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
    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]  
      $if[$getUserVar[1hpaused|$channelID];
        $addTextDisplay[## Status: Paused]
        $addSeparator[Large]
      ]
      $addTextDisplay[## ${time()}]
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

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]  
      $addTextDisplay[# Paused!]
      $addTextDisplay[## ${points()}]
      $addSeparator[Large]
      $addTextDisplay[## ${time()}]
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

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]  
      $addTextDisplay[# Continued!]
      $addTextDisplay[## ${points()}]
      $addSeparator[Large]
      $addTextDisplay[## ${time()}]
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

    ${json()}
    $arrayLoad[caught]
    $arrayLoad[caughtRares; ;$toLowerCase[$message]]
    $jsonLoad[allRaresList;$getUserVar[1hallRaresList|$channelID]]
    $jsonLoad[chartLimits;$getGlobalVar[chartLimits]]
    $if[$getChannelVar[lobbyDifficulty]!=;
      $if[$getChannelVar[lobbyDifficulty]!=none;
        $jsonLoad[chartLimits;$getGlobalVar[$getChannelVar[lobbyDifficulty]ChartLimits]]
      ]
    ]
    $arrayLoad[limitsContent]
    $arrayLoad[reachedLimitContent]

    $let[points;0]
    $let[hasDifficulty;$arrayIncludes[userSettings;difficulties]]
    $let[hideRaresLimit;$arrayIncludes[userSettings;hideRaresLimit]]
    $let[unlimitedRares;$arrayIncludes[userSettings;unlimitedRares]]
    $let[difficulty;$env[userProfile;1hl;difficulty]]

    $if[$getUserVar[participating|$channelID];    $let[unlimitedRares;$getChannelVar[unlimitedRares]]  ]
    $if[$getUserVar[event1hstarted|$channelID];   $let[unlimitedRares;false]  ]

    $if[$get[hasDifficulty];                      $jsonLoad[chartLimits;$getGlobalVar[$get[difficulty]ChartLimits]]  ]
    $if[$getUserVar[event1hstarted|$channelID];   $jsonLoad[chartLimits;$getGlobalVar[eventChartLimits]]  ]
    
    $c[Looping through every rare]

    ${catchingRare()}
    
    $c[Message sending]
    
    $if[$get[points]>0;;$stop]

    $let[pts;]
    $arrayForEach[caught;pts;$let[pts;$if[$get[pts]==;$get[pts];$get[pts] + ]$env[pts]]]
    $setUserVar[1hpoints|$channelID;$math[$getUserVar[1hpoints|$channelID] + $get[points]]]

    ${settingParticProgress()}
    ${limitedCategory()}

    $if[$arraylength[caughtRares]>1;
      $let[desc;$get[pts] = $get[points]]
    ;
      $let[desc;+$get[pts]]
    ]

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]
      $if[$arrayLength[reachedLimitContent]>0;
        $addTextDisplay[$arrayJoin[reachedLimitContent;\n]]
        $addSeparator[Large]
      ]
      
      $addTextDisplay[## $get[desc]]
      $addSeparator
      $addTextDisplay[## ${points()}]
      $addTextDisplay[## ${time()}]
      
      $if[$and[$get[hideRaresLimit]==false;$get[limiters]!=];
        $addSeparator
        $addTextDisplay[# Limited Rares:\n$arrayJoin[limitsContent;\n]]
      ]
      $if[$get[unlimitedRares];
        $addSeparator
        $addTextDisplay[# Unlimited Rares]
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
    ${json()}
    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]  
      $addTextDisplay[# 1 Hour Luck Ended!]
      $addTextDisplay[## ${total()}]
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
    ${json()}
    $callFunction[checking]

    $let[id;$authorID]
    $if[$mentioned[0]!=;
      $let[id;$mentioned[0]]
    ]
    $jsonLoad[userProfile;$getUserVar[userProfile;$get[id]]]
    $onlyIf[$getuservar[1hstarted|$channelID;$get[id]];
      $callFunction[embed;error] 
      $description[## $if[$get[id]!=$authorID;__$username[$get[id]]__ doesn't;You don't] have an active challenge!]
    ]
    $addContainer[
      $addSection[
        $addTextDisplay[## $username[$get[id]] • MUID: $env[userProfile;MUID]]
        $addThumbnail[$userAvatar[$get[id]]]
      ]
      $addSeparator[Large]  
      $addTextDisplay[## ${total("$get[id]")}]
      $addSeparator[Large]
      $addTextDisplay[## ${time("$get[id]")}]
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

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]  
      $addTextDisplay[## ${time()}]
    ;$getGlobalVar[luckyColor]]
  `
},{
  name: "editlist",
  aliases: ["elist", "el"],
  type: "messageCreate",
  code: `
    $reply
    ${isActiveChallenge()}
    ${json()}
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

    $let[animal;$env[animals;$get[animalID];variants;0;${type}]]

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]
      $addTextDisplay[## ✅ $get[state] \`$get[count]\` $get[animal]]
      $addSeparator[Large]
      $addTextDisplay[## ${total()}]
      $addSeparator[Large]
      $addTextDisplay[## ${time()}]
    ;$getGlobalVar[luckyColor]]
  `
},{
  type: 'interactionCreate',
  allowedInteractionTypes: ['button'],
  description: "confirmation of ending challenge",
  code: `
    $arrayLoad[interactionID;-;$customID]
    $onlyIf[$arrayIncludes[interactionID;confirmEndingChallenge]]
    ${json()}
    $onlyIf[$arrayIncludes[interactionID;$authorID];$callFunction[notYourBTN]]

    ${isActiveChallenge()}

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]  
      $addTextDisplay[# 1 Hour Luck Ended!]
      $addTextDisplay[## ${total()}]
    ;$getGlobalVar[luckyColor]]
    $interactionUpdate
    ${challengeEnded()}
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
    ${json()}
    $callFunction[checking]
    $callFunction[cooldown;1m]
    $jsonLoad[history;$env[userProfile;1hl;history]]

    $let[page;1]
    $let[sortType;d]
    $if[$arrayAt[history;0]==;
      $description[# No history]
      $callFunction[embed;lucky]
      $sendMessage[$channelID]
      $stop
    ]
    ${hisSortType()}
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

    $let[butid;$env[interactionID;2]]
    $let[input;$input[page]]

    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[interactionID;$env[key]]]]
    $onlyIf[$arrayIncludes[interactionID;$authorID];$callFunction[notYourBTN]]

    ${json()}
    $jsonLoad[history;$env[userProfile;1hl;history]]

    $let[msg;$messageID]
    $let[page;$default[$env[menuValues;0];$env[interactionID;0]]]
    $let[sortType;$default[$env[menuValues;1];$env[interactionID;1]]]

    $if[$arrayIncludes[interactionID;historyPageCustom];
      $modal[$get[page]-$get[sortType]-customPage-$authorID;Custom page]
      $addTextInput[page;Enter page;Short;true;;;1;5]
      $showModal
      $stop
    ]

    $if[$arrayLength[history]==0;
      $description[# No history]
      $callFunction[embed;lucky]
      $interactionUpdate
      $stop
    ]

    ${sortBtnLogic()}

    $!stopTimeout[1HLHISTORY-$authorID]
    ${hisSortType()}
    ${historyEmbed()}
    $interactionUpdate
    ${historyTimeout()}
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
    ${json()}
    $callFunction[checking]
    $callFunction[cooldown;$get[cdTime]]
    
    $onlyIf[$message!=]

    $let[totalRares;0]
    $let[totalPoints;0]

    $arrayLoad[caughtRares; ;$toLowerCase[$message]]
    $jsonLoad[allRaresList;{}]
    $arrayLoad[unknown]
    $arrayLoad[unknownContent]
    $arrayLoad[listContent]

    $loop[$arrayLength[caughtRares];
      $let[i;$math[$env[i] - 1]]
      $let[caughtRare;$arrayAt[caughtRares;$get[i]]]

      $if[$arrayIncludes[allRares;$get[caughtRare]];;
        $arrayPush[unknown;$get[caughtRare]]
        $continue
      ]

      $let[animalID;$callFunction[findingAnimalID;$get[caughtRare]]]
      
      $let[newQuantity;$math[$env[allRaresList;$get[animalID]] + 1]]
      $!jsonSet[allRaresList;$get[animalID];$get[newQuantity]]    
    ;i;true]

    $jsonLoad[listEntries;$jsonEntries[allRaresList]]

    $arrayForEach[listEntries;entry;

      $let[animalID;$env[entry;0]]
      $let[quantity;$env[entry;1]]

      $let[animalDisplay;$env[animals;$get[animalID];variants;0;${type}]]

      $jsonLoad[output;$callFunction[findingRareInChallengeDataBase;$get[animalID]]]      

      $let[listPoints;$env[output;points]]
      $let[totalPointsInList;$math[$get[quantity] * $get[listPoints]]]
      $letSum[totalPoints;$get[totalPointsInList]]
      $letSum[totalRares;$get[quantity]]

      $let[listContent;$get[animalDisplay]⁕$get[quantity] × $get[listPoints] | +$get[totalPointsInList]]
      $arrayPush[listContent;║ **$get[listContent]**]
    ]
    $if[$arrayLength[listContent]==0;$arrayPush[listContent;║ none]]

    $addField[Total points:; \`$get[totalPoints]\`]
    $addField[Total rares:;\`$get[totalRares]\`]
    $addField[All Rares List:;╔══════════\n$arrayJoin[listContent;\n]\n╚══════════]

    $if[$arrayLength[unknown]!=0;
      $arrayForEach[unknown;elem;
        $arrayPush[unknownContent;║ **$env[elem]**]
      ]
      $addField[Unknown rares:;╔══════════\n$arrayJoin[unknownContent;\n]\n╚══════════]
    ]

    $callFunction[embed;lucky]
  `
}]

// data

function json() {
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

function catchingRare() {
  return `
    $loop[$arrayLength[caughtRares];
      $let[i;$math[$env[i] - 1]]
      $let[caughtRare;$arrayAt[caughtRares;$get[i]]]

      $if[$arrayIncludes[allRares;$get[caughtRare]];;

        $if[$get[i]==0;
          $break $c[breaking the loop if the first message is invalid, so it will not affect normal messages]
        ]

        $arrayPush[caught;0]
        $continue
      ]

      $onlyIf[$getUserVar[1hpaused|$channelID]!=true;
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
        ${rares()}
        $continue
      ]

      $let[limitAnimalName;$env[animals;$get[animalID];variants;0;${type}]]
      $let[chartlimitIndex;$arrayFindIndex[chartLimits;obj;$env[obj;category]==$get[challengeDataCategory]]]
      $jsonLoad[limitChartObj;$env[chartLimits;$get[chartlimitIndex]]]
      $let[limit;$env[limitChartObj;limit]]
      $let[limitAnimalCount;$env[allRaresList;$get[animalID];0]]

      $if[$get[limitAnimalCount]<$get[limit];
        ${rares()}
        $letSum[limitAnimalCount;1]

        $if[$get[limitAnimalCount]==$get[limit];
          $arrayPush[reachedLimitContent;## Reached limit of $get[limitAnimalName]]
        ]
      ;
        $arrayPush[caught;0]
      ]
    ;i;true]
  `
}

function rares() {
  return `
    $letSum[points;$get[challengeDataPoints]]
    $arrayPush[caught;$get[challengeDataPoints]]
    $setUserVar[1htotalRares|$channelID;$math[$getUserVar[1htotalRares|$channelID] + 1]]

    $let[newQuantity;$math[$env[allRaresList;$get[animalID]] + 1]]
    $!jsonSet[allRaresList;$get[animalID];$get[newQuantity]]

    $setUserVar[1hallRaresList|$channelID;$env[allRaresList]]
  `
}

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

function challengeEnded () {
  code: `
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $jsonLoad[userSettings;$env[userProfile;1hl;settings]]
    $jsonLoad[history;$env[userProfile;1hl;history]]
    $jsonLoad[lobbyTags;$getChannelVar[lobbyTags]]
    $timezone[$env[userProfile;timezone]]
    $arrayLoad[tags]

    $let[difficulty;none]

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


    $if[$arrayAt[tags;0]==;
      $arrayPush[tags;none]
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
  `
}

function lobbyEnd() {
  return `
    $if[$getUserVar[participating|$channelID];
      $jsonLoad[participants;$getChannelVar[participants]]
      $let[allFinished;$arrayEvery[participants;ID;$checkCondition[$getUserVar[1hstarted|$channelID;$env[ID];false]==false]]]

      $if[$get[allFinished];

        $arrayLoad[result]
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
          $let[parts;$get[parts]### $get[emoji] $ordinal[$get[position]] ➤ $username[$env[res;user]] \n**$getGlobalVar[blank] Points: \`$env[res;points]\`**\n]
        ]

        $sendMessage[$channelID;
          $author[1 Hour Luck Ended!]
          $description[# 🎉 Winner - $username[$env[result;0;user]] 🎉\n$trimEnd[$get[parts]]]
          $color[$getGlobalVar[luckyColor]]
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
    $let[time;$getuservar[1htime|$channelID;${id}]]
    Time passed: \`$parseDigital[$get[time]000]\`
  `
}

function total(id = "$authorID") {
  return `
    $let[totalRares;$getuservar[1htotalRares|$channelID;${id}]]
    $jsonLoad[raresList;$getUserVar[1hallRaresList|$channelID;${id}]]
    $arrayLoad[content]
    
    ${raresListGenerator()}
    ${points(id)}
    $if[$arrayIncludes[userSettings;hideRares];
      ## Total rares: ||$get[totalRares]||
    ;
      ## Total rares: \`$get[totalRares]\`
    ]
    ## All Rares List:\n╔══════════\n$arrayJoin[content;\n]\n╚══════════
  `
}

function points(id = "$authorID") {
  return `
    $let[1hlp;$getUserVar[1hpoints|$channelID;${id}]]
    $if[$arrayIncludes[userSettings;hidePoints];
      Total points: ||$get[1hlp]||
    ;
      Total points: \`$get[1hlp]\`
    ]
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

function raresListGenerator() {
  return `
    $jsonLoad[listEntries;$jsonEntries[raresList]]

    $arrayForEach[listEntries;entry;
      $let[animalID;$env[entry;0]]
      $let[quantity;$env[entry;1]]

      $let[animalDisplay;$env[animals;$get[animalID];variants;0;${type}]]
      $let[listContent;$get[animalDisplay]⁕$get[quantity]]

      $arrayPush[content;║ $bold[$get[listContent]]]
    ]
    $if[$arrayLength[content]==0;$arrayPush[content;║ none]]
  `
}

function limitedCategory() {
  return `
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

            $let[displayRare;$env[animals;$env[rare];variants;0;${type}]]
            $let[quantity;$default[$env[allRaresList;$env[rare]];0]]

            $if[$get[quantity]<$get[limit];
              $arrayPush[limitsContent;# $get[displayRare] \`$get[quantity]|$get[limit]\`]
            ]
          ]
          $break
        ;i;true]
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

function historyEmbed() {
  return `
    $let[index;$math[$get[page] - 1]]
    $callFunction[embed;lucky]
    $jsonLoad[allLobbyTags;$getGlobalVar[allLobbyTags]]
    $jsonLoad[raresList;$env[history;$get[index];raresList]]
    $jsonLoad[tags;$env[history;$get[index];tags]]
    $if[$arrayIncludes[tags;none];;
      $arrayMap[tags;tag;$return[$env[allLobbyTags;$env[tag]]];tags]
    ]
    $if[$arrayAt[tags;0]==;$arrayPush[tags;none]]
    $arrayLoad[content]
    
    ${raresListGenerator()}
    $footer[Sort Type: $get[sort]]
    $description[$trimLines[
      ## Play Type: \`$toTitleCase[$env[history;$get[index];playType]]\`
      ## Points: \`$env[history;$get[index];points]\`
      ## Rares: \`$env[history;$get[index];rares]\`
      ## Difficulty: \`$toTitleCase[$env[history;$get[index];difficulty]]\`
      ## Tags:\n$codeBlock[$arrayJoin[tags;\n]]
      ## All Rares List:\n╔══════════\n$arrayJoin[content;\n]\n╚══════════
      ## Ended at: $discordTimestamp[$env[history;$get[index];endedAt];LongDateTime]
    ]]

    $if[$arrayLength[history]>1;
      $addActionRow
      $addButton[$get[page]-$get[sortType]-historyPageLeft-$authorID;;Primary;⬅️]
      $addButton[$get[page]-$get[sortType]-historyPageCustom-$authorID;Page $get[page]/$arrayLength[history];Primary;🔎]
      $addButton[$get[page]-$get[sortType]-historyPageRight-$authorID;;Primary;➡️]
      $addActionRow
      $addStringSelectMenu[sortHis-$authorID;Sort by]
      $addOption[Date;;$get[page]-d;;$checkCondition[$get[sortType]==d]]
      $addOption[Points;;$get[page]-p;;$checkCondition[$get[sortType]==p]]
      $addOption[Rares;;$get[page]-r;;$checkCondition[$get[sortType]==r]]
    ]
    $if[$env[history;0]!=;
      $addActionRow
      $addButton[$get[page]-$get[sortType]-deleteHistoryPage-$authorID;Delete This Page;Danger;🗑️]
    ]
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
      $addTextDisplay[### Participants:\n**$codeBlock[$get[parts]]**]
      $addActionRow
      $addButton[joinLobby;Participate;Success;🔝]
      $addButton[quitLobby;Quit;Danger;🔙]
      $addButton[readyLobby;Ready;Success;✅]
      $addSeparator[Large]
      $addTextDisplay[# Settings:]
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
  return `
    $setTimeout[
      $!disableComponentsOf[$channelID;$get[msg]]
    ;1m;1HLHISTORY-$authorID]`
}

function hisSortType() {
  return `
    $switch[$get[sortType];
      $case[d;$let[sort;Date]]
      $case[p;$let[sort;Points]]
      $case[r;$let[sort;Rares]]
    ]
  `
}

function historySorting() {
  return `
    $switch[$get[sortType];
      $case[p;
        $arrayAdvancedSort[history;elem1;elem2;
          $math[$env[elem2;points] - $env[elem1;points]]
        ;history]
      ]

      $case[r;
        $arrayAdvancedSort[history;elem1;elem2;
          $math[$env[elem2;rares] - $env[elem1;rares]]
        ;history]
      ]

      $case[d;
        $arrayAdvancedSort[history;elem1;elem2;
          $math[$env[elem2;endedAt] - $env[elem1;endedAt]]
        ;history]
      ]
    ]
  `
}

function sortBtnLogic() {
  return `
    $if[$get[butid]==historyPageLeft;
      $letSub[page;1]
      $if[$get[page]<=0;
        $let[page;$arrayLength[history]]
      ]
    ]
    $if[$get[butid]==historyPageRight;
      $letSum[page;1]
      $if[$get[page]>$arrayLength[history];
        $let[page;1]
      ]
    ]
    $if[$get[butid]==customPage;
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

    ${historySorting()}

    $if[$get[butid]==deleteHistoryPage;
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
