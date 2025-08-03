const type = 'name' // editable between 'name' and 'emoji'. Shows animal's name or emoji in "all rares list"
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
    $callFunction[embed;lucky]  
    $if[$getUserVar[1hpaused|$channelID];$description[## Status: Paused]]
    ${time()}
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

    $callFunction[embed;lucky]
    $description[# Paused!\n$trimLines[${total()}]]
    ${time()}
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

    $callFunction[embed;lucky]
    $description[# Continued!\n$trimLines[${total()}]]
    ${time()}
    ${interval()}
  `
},{
  unprefixed: true,
  type: "messageCreate",
  code: `
    $reply 
    $onlyIf[$getUserVar[1hstarted|$channelID]]
    $onlyIf[$startsWith[$messageContent;$getGuildVar[prefix]]==false]

    $arrayLoad[caught]
    $arrayLoad[caughtRares; ;$toLowerCase[$message]]
    $jsonLoad[allRaresList;$getUserVar[1hallRaresList|$channelID]]
    $jsonLoad[chartLimits;$getGlobalVar[chartLimits]]
    ${json()}

    $let[hasDifficulty;$env[userProfile;1hl;settings;difficulties]]
    $let[difficulty;$env[userProfile;1hl;difficulty]]

    $if[$getUserVar[event1hstarted|$channelID];  $jsonLoad[chartLimits;$getGlobalVar[eventChartLimits]]  ]

    $if[$get[hasDifficulty];  $jsonLoad[chartLimits;$getGlobalVar[$get[difficulty]ChartLimits]]  ]

    
    
    $let[points;0]
    $let[content;]
    $let[hideRaresLimit;$env[userProfile;1hl;settings;hideRaresLimit]]
    
    $c[Looping through every rare]

    ${catchingRare()}
    
    $c[Message sending]
    
    $if[$get[points]>0;

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
      $sendMessage[$channelID;
        $get[content]
        $callFunction[embed;lucky]
        $description[$trimLines[
          # $get[desc]
          ${total()}
        ]]
        ${time()}
        $if[$and[$get[hideRaresLimit]==false;$get[limiters]!=];
          $description[$trimLines[
            ## Limited Rares:
            $get[limiters]
          ];1]
          $color[$getGlobalVar[luckyColor];1]
        ]
        $if[$get[unlimitedRares];
          $title[Unlimited Rares;;1]
          $color[$getGlobalVar[luckyColor];1]
        ]
      ]
    ]
    $setUserVar[userProfile;$env[userProfile]]
  `
},{
  name: "end",
  type: "messageCreate",
  code: `
    $reply
    ${isActiveChallenge()}
    ${json()}
    $description[# 1 Hour Luck Ended!\n$trimLines[${pts()}]]
    $callFunction[embed;lucky]
    $sendMessage[$channelID]
    ${reset()}
    ${partyEnd()}
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
    $callFunction[embed;lucky]
    $author[$userDisplayName[$get[id]] • MUID: $env[userProfile;MUID];$userAvatar[$get[id]]]
    $description[$trimLines[${pts("$get[id]")}]]
    ${time("$get[id]")}
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
    $callFunction[embed;lucky]
    $description[$trimLines[${total()}]]
    ${time()}
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
    ${findingAnimalID()}
    ${findingRareInChallengeDataBase()}
    $let[animal;$get[animalID]]
    $let[count;$get[arg3]]
    $let[quantity;$env[allRaresList;$get[animal]]]
    $if[$get[quantity]==;$let[quantity;0]]
    $let[rares;0]
    $let[points;0]

    $if[$get[arg2]==-;
      $let[state;Removed]
    ;
      $let[state;Added]
    ]

    $if[$and[$jsonHas[allRaresList;$get[animal]]==false;$get[arg2]==-];
      $callFunction[embed;error] 
      $description[### Animal «$get[animal]» is not in the rares list!]
      $sendMessage[$channelID]
      $stop
    ]
    
    $if[$get[arg3]==all;
      $let[count;$get[quantity]]
      $!jsonDelete[allRaresList;$get[animal]]
    ;
      $let[quantity;$math[$get[quantity] $get[arg2] $get[count]]]
      $!jsonSet[allRaresList;$get[animal];$get[quantity]]

      $if[$get[quantity]<=0;
        $!jsonDelete[allRaresList;$get[animal]]
      ]
    ]
    
    $jsonLoad[allRaresListEntries;$jsonEntries[allRaresList]]
    
    $if[$arrayAt[allRaresListEntries;0]==;;
      $arrayForEach[allRaresListEntries;entry;
        $let[animalID;$env[entry;0]]
        $let[quantity;$env[entry;1]]
        ${findingRareInChallengeDataBase()}
        
        $letSum[rares;$get[quantity]]
        $letSum[points;$math[$get[quantity] * $get[challengeDataPoints]]]
      ]
    ]

    $setUserVar[1hallRaresList|$channelID;$env[allRaresList]]
    $setUserVar[1htotalRares|$channelID;$get[rares]]
    $setUserVar[1hpoints|$channelID;$get[points]]

    ${settingParticProgress()}

    $let[animal;$env[animals;$get[animal];variants;0;${type}]]

    ## ✅ $get[state] \`$get[count]\` $get[animal]
    $callFunction[embed;lucky]
    $description[$trimLines[${pts()}]]
    ${time()}
  `
},{
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
    $arrayLoad[menu;-;$customID]
    $let[value;$env[menu;0]]
    ${loadGlobalJSON()}

    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $onlyIf[$arrayIncludes[menu;$authorID];$callFunction[notYourBTN]]

    $let[hasSettKey;$arraySome[globalSettingsKeys;key;$arrayIncludes[menu;$env[key]]]]
    $let[hasDiffKey;$arraySome[difficulties;elem;$arrayIncludes[menu;$env[elem]]]]
    $onlyIf[$or[$get[hasSettKey];$get[hasDiffKey]]]

    $!stopTimeout[SETT-$authorID]

    $if[$get[hasSettKey];

      $let[sett;$env[userProfile;1hl;settings;$get[value]]]
      $let[sett;$default[$get[sett];false]]
      $let[newSett;$checkCondition[$get[sett]==false]]
      $!jsonSet[userProfile;1hl;settings;$get[value];$get[newSett]]

    ;
      $if[$get[hasDiffKey];
        $!jsonSet[userProfile;1hl;difficulty;$get[value]]
      ]
    ]

    $setUserVar[userProfile;$env[userProfile]]
    ${settingsEmbed()}

    $!editMessage[$channelID;$messageID]
    
    $deferUpdate
    $let[msg;$messageID]
    ${settingsTimeout()}
  `
},{
  name: "history",
  aliases: ["his"],
  type: "messageCreate",
  description: "history",
  code: `
    $reply
    ${json()}
    $callFunction[checking]
    $callFunction[cooldown;1m]
    $jsonLoad[history;$arrayReverse[history]]
    $jsonLoad[history;$env[userProfile;1hl;history]]

    $let[page;1]
    $let[sortType;d]
    $if[$arrayAt[history;0]==;
      $description[# No history]
      $getGlobalVar[author]
      $color[$getGlobalVar[luckyColor]]
      $sendMessage[$channelID]
      $stop
    ]
    ${hisSortType()}
    ${historyEmbed()}
    $let[msg;$sendMessage[$channelID;;true]]

    ${historyTimeout()}
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["button", "modal", "selectMenu"],
  description: "history buttons",
  code: `
    $arrayLoad[btn;-;$if[$or[$isModal;$isButton];$customID;$selectMenuValues]]
    $let[butid;$env[btn;0]]

    $onlyIf[$includes[$env[btn;1];$authorID];$callFunction[notYourBTN]]

    $if[$includes[$get[butid];historyPages];
      $let[sortType;$env[btn;3]]
      $modal[customPage-$authorid-NaN-$get[sortType];Custom page]
      $addTextInput[page-$authorid;Enter page;Short;true;;;1;5]
      $showModal
      $stop
    ]
    $onlyIf[$includes[$get[butid];sortHis;historyPageLeft;historyPageRight;customPage;deleteHistoryPage]]

    $jsonLoad[history;$env[userProfile;1hl;history]]
    ${json()}

    $if[$arrayAt[history;0]==;
      $description[# No history]
      $getGlobalVar[author]
      $color[$getGlobalVar[luckyColor]]
      $!editMessage[$channelID;$get[msg]]
      $stop
    ]

    $let[msg;$messageID]
    $let[page;$env[btn;2]]
    $let[sortType;$env[btn;3]]

    ${sortBtnLogic()}

    $!stopTimeout[1HLHISTORY-$authorID]
    $jsonLoad[history;$arrayReverse[history]]
    
    ${hisSortType()}

    ${historyEmbed()}
    $!editMessage[$channelID;$get[msg]]

    $deferUpdate
    ${historyTimeout()}
  `
},{
  name: "party",
  aliases: ["lobby"],
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]

    $onlyIf[$getChannelVar[participants]==;
      $jsonLoad[participants;$getChannelVar[participants]]
      ${participants(true)}
      $callFunction[embed;error]
      $description[## Party already exist in this channel!]
      $addField[Participants:;$codeBlock[$get[parts]]]
    ]
    $onlyIf[$getUserVar[1hstarted|$channelID]!=true;
      $callFunction[embed;error]
      $description[## You have an active challenge! End it before creating a Lobby!]
    ]
    
    $arrayLoad[participants; ;$authorID]
    $setUserVar[participating|$channelID;true]
    $setUserVar[ready|$channelID;false]
    $setChannelVar[unlimitedRares;false]
    
    ${particEmbed()}
    $let[msgid;$sendMessage[$channelID;;true]]
    ${partyTimeout()}
  `
},{
  type: "interactionCreate",
  description: "When pressing Participate",
  allowedInteractionTypes: ["button"],
  code: `
    $onlyIf[$includes[$customID;join1hl]]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]

    $jsonLoad[participants;$getChannelVar[participants]]

    ${partyExist()}

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
    ${particEmbed()}
    $!editMessage[$channelID;$get[msgid]]

    $!stopTimeout[MULTI1HL-$channelID]
    ${partyTimeout()}
    $deferUpdate
  `
},{
  type: "interactionCreate",
  description: "When pressing Quit",
  allowedInteractionTypes: ["button"],
  code: `
    $onlyIf[$includes[$customID;quit1hl]]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $jsonLoad[participants;$getChannelVar[participants]]

    ${partyExist()}

    $onlyIf[$arrayIncludes[participants;$authorID];
      $interactionReply[
        $ephemeral
        $callFunction[embed;error]
        $description[## You're not a participant]
      ]
    ]

    $let[msgid;$messageID]
    $let[host;$env[participants;0]]

    $!stopTimeout[MULTI1HL-$channelID]
    $deferUpdate

    $!arraySplice[participants;$arrayIndexOf[participants;$authorID];1]
    $deleteUserVar[participating|$channelID]
    $deleteUserVar[ready|$channelID]

    $if[$env[participants;0]==;
      $deleteChannelVar[participants]
      $deleteChannelVar[unlimitedRares]

      $author[$username[$get[host]]'s Lobby;$userAvatar[$get[host]]]
      $description[# The Lobby was closed due to a lack of participants]
      $color[Orange]
      $!editMessage[$channelid;$get[msgid]]
      $stop
    ]
    
    ${particEmbed()}
    $!editMessage[$channelid;$get[msgid]]
    ${partyTimeout()}
  `
},{
  type: "interactionCreate",
  description: "When pressing End",
  allowedInteractionTypes: ["button"],
  code: `
    $onlyIf[$includes[$customID;end1hl]]
    $onlyIf[$includes[$customID;$authorID]]
    $jsonLoad[participants;$getChannelVar[participants]]
    $jsonLoad[userProfile;$getUserVar[userProfile]]

    ${partyExist()}
    $let[host;$env[participants;0]]

    $arrayForEach[participants;user;
      $deleteUserVar[participating|$channelID;$env[user]]
      $deleteUserVar[ready|$channelID;$env[user]]
    ]

    $deleteChannelVar[participants]
    $deleteChannelVar[unlimitedRares]

    $author[$username[$get[host]]'s Lobby;$userAvatar[$get[host]]]
    $description[# The Lobby was closed by the Host]
    $color[Orange]
    $let[msgid;$messageID]
    $!editMessage[$channelid;$get[msgid]]

    $!stopTimeout[MULTI1HL-$channelID]
    $deferUpdate
  `
},{
  type: "interactionCreate",
  description: "When pressing Start",
  allowedInteractionTypes: ["button"],
  code: `
    $onlyIf[$includes[$customID;start1hl]]
    $onlyIf[$includes[$customID;$authorID]]
    $jsonLoad[participants;$getChannelVar[participants]]

    ${partyExist()}

    $onlyIf[$env[participants;1]!=;
      $interactionReply[
        $ephemeral
        $callFunction[embed;error]
        $description[## You can't start alone!]
      ]
    ]

    $let[allRdy;$arrayEvery[participants;user;$return[$getUserVar[ready|$channelID;$env[user]]]]]
    $let[s;10]
    $let[msgid;$messageID]
    $let[members;]

    $onlyIf[$get[allRdy];
      $interactionReply[
        $ephemeral
        $callFunction[embed;error]
        $description[## Someone is not ready!]
      ]
    ]

    ${participants(true)}
    $!stopTimeout[MULTI1HL-$channelID]
    $!deleteMessage[$channelID;$get[msgid]]
    $let[msgid;$sendMessage[$channelID;${startingEmbed()};true]]
    
    $setInterval[
      $letSub[s;1]
      $if[$get[s]<=0;
        $!stopInterval[COUNTDOWN-$channelID]
        $arrayForEach[participants;user;
          $deleteUserVar[ready|$channelID;$env[user]]
          ${loadVarsForChallenge('$env[user]')}
          $jsonLoad[progress;{"points": 0, "user": "$env[user]"}]
          $setUserVar[progress|$channelID;$env[progress];$env[user]]
          $let[members;$get[members]<@$env[user]> ]
        ]
          ${interval('$env[participants;0]')}
          ${interval('$env[participants;1]')}
          $if[$env[participants;2]!=;${interval('$env[participants;2]')}]
          $if[$env[participants;3]!=;${interval('$env[participants;3]')}]
          $if[$env[participants;4]!=;${interval('$env[participants;4]')}]
          $if[$env[participants;5]!=;${interval('$env[participants;5]')}]
        
        $!deleteMessage[$channelID;$get[msgid]]
        $sendMessage[$channelID;
          $get[members]
          ${startingEmbed()}
          $description[# 1 Hour Luck Challenge has begun!]
        ]
        $stop
      ]
      $!editMessage[$channelID;$get[msgid];${startingEmbed()}]
    ;1s;COUNTDOWN-$channelID]
  `
},{
  type: 'interactionCreate',
  allowedInteractionTypes: ['button'],
  description: 'when pressing Ready',
  code: `
    $onlyIf[$includes[$customID;ready1hl]]
    $jsonLoad[participants;$getChannelVar[participants]]

    ${partyExist()}

    $onlyIf[$arrayIncludes[participants;$authorID];
      $interactionReply[
        $ephemeral
        $callFunction[embed;error]
        $description[## You're not a participant]
      ]
    ]

    $if[$getUserVar[ready|$channelID];
      $setUserVar[ready|$channelID;false]
    ;
      $setUserVar[ready|$channelID;true]
    ]
    
    ${particEmbed()}
    $let[msgid;$messageID]
    $!editMessage[$channelid;$get[msgid]]
    $!stopTimeout[MULTI1HL-$channelID]
    ${partyTimeout()}
    $deferUpdate
  `
},{
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu'],
  description: "when selecting Tags",
  code: `
    $onlyIf[$includes[$customID;addTags]]
    $onlyIf[$includes[$customID;$authorID]]
    $onlyIf[$includes[$selectMenuValues;unlimitedRares]]

    $jsonLoad[participants;$getChannelVar[participants]]
    ${partyExist()}

    $onlyIf[$arrayIncludes[participants;$authorID];
      $interactionReply[
        $ephemeral
        $callFunction[embed;error]
        $description[## You're not a participant]
      ]
    ]

    $let[hostSets;$checkCondition[$getChannelVar[unlimitedRares]==false]]
    $setChannelVar[unlimitedRares;$get[hostSets]]

    ${particEmbed()}
    $let[msgid;$messageID]
    $!editMessage[$channelid;$get[msgid]]

    $!stopTimeout[MULTI1HL-$channelID]
    ${partyTimeout()}
    $deferUpdate
  `
},{
  type: 'interactionCreate',
  allowedInteractionTypes: ['button'],
  description: "confirmation of ending challenge",
  code: `
    $arrayLoad[btn;-;$customID]
    $onlyIf[$includes[$env[btn;0];confirmEndingChallenge]]
    $onlyIf[$includes[$env[btn;1];$authorID];$callFunction[notYourBTN]]

    ${isActiveChallenge()}
    ${json()}
    
    $description[# 1 Hour Luck Ended!\n$trimLines[${pts()}]]
    $callFunction[embed;lucky]
    $!editMessage[$channelID;$messageID]
    ${challengeEnded()}
    ${partyEnd()}
  `
},{
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

    $loop[$arrayLength[caughtRares];
      $let[i;$math[$env[i] - 1]]
      $let[caughtRare;$arrayAt[caughtRares;$get[i]]]

      $if[$arrayIncludes[allRares;$get[caughtRare]];;
        $arrayPush[unknown;$get[caughtRare]]
        $continue
      ]

      ${findingAnimalID()}
      ${findingRareInChallengeDataBase()}
      
      $let[newQuantity;$math[$env[allRaresList;$get[animalID]] + 1]]
      $!jsonSet[allRaresList;$get[animalID];$get[newQuantity]]    
    ;i;true]

    $jsonLoad[listEntries;$jsonEntries[allRaresList]]

    $arrayForEach[listEntries;entry;

      $let[type;name] $c[<- Changeable between "name" and "emoji"]
      $let[animalID;$env[entry;0]]
      $let[quantity;$env[entry;1]]

      $let[animalDisplay;$env[animals;$get[animalID];variants;0;${type}]]

      ${findingRareInChallengeDataBase()}

      $let[listPoints;$get[challengeDataPoints]]
      $let[totalPointsInList;$math[$get[quantity] * $get[listPoints]]]
      $letSum[totalPoints;$get[totalPointsInList]]
      $letSum[totalRares;$get[quantity]]

      $let[listContent;$get[animalDisplay] x$get[quantity] × $get[listPoints] | +$get[totalPointsInList]]
      $let[list;$get[list]║ $bold[$get[listContent]]\n]
    ]
    $if[$get[list]==;$let[list;║ none]]

    $addField[Total points:; \`$get[totalPoints]\`]
    $addField[Total rares:;\`$get[totalRares]\`]
    $addField[All Rares List:;╔══════════\n$trimLines[$get[list]]\n╚══════════]
    $if[$arrayLength[unknown]!=0;
      $arrayForEach[unknown;elem;
        $let[unkList;$get[unkList]║ $bold[$env[elem]]\n]
      ]
      $addField[Unknown rares:;╔══════════\n$trimLines[$get[unkList]]\n╚══════════]
    ]
    $getGlobalVar[author]
    $color[$getGlobalVar[luckyColor]]
  `
}]

// data

function json () {
  return `
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $jsonLoad[challengeData;$getGlobalVar[challengeData]]
    $jsonLoad[animals;$readFile[json/animals.json]]
    $jsonLoad[allRaresData;$getGlobalVar[allRaresData]]
    $jsonLoad[allRaresData;$jsonEntries[allRaresData]]
    $jsonLoad[allRares;$getGlobalVar[allRares]]
    $if[$getUserVar[event1hstarted|$channelID];
      $jsonLoad[challengeData;$getGlobalVar[eventChallengeData]]
    ]
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

      ${findingAnimalID()}
      ${findingRareInChallengeDataBase()}

      $let[hasLimitCategory;$arraySome[chartLimits;obj;$env[obj;category]==$get[challengeDataCategory]]]
      
      $let[unlimitedRares;$env[userProfile;1hl;settings;unlimitedRares]]

      $if[$getUserVar[participating|$channelID];
        $let[unlimitedRares;$getChannelVar[unlimitedRares]]
      ]

      $if[$getUserVar[event1hstarted|$channelID];
        $let[unlimitedRares;false]
      ]

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
          $let[content;$get[content]## Reached limit of «\`$get[limitAnimalName]\`»\n]
        ]
      ;
        $arrayPush[caught;0]
      ]
    ;i;true]
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

function findingRareInChallengeDataBase () {
  return `
    $loop[$arrayLength[challengeData];
      $let[j;$math[$env[j] - 1]]

      $jsonLoad[challengeDataObj;$arrayAt[challengeData;$get[j]]]
      $jsonLoad[challengeDataRaresList;$env[challengeDataObj;rares]]
      $let[challengeDataPoints;$env[challengeDataObj;points]]
      $let[challengeDataCategory;$env[challengeDataObj;category]]

      $if[$arrayIncludes[challengeDataRaresList;$get[animalID]];
        $break
      ]
    ;j;true]
  `
}

function findingAnimalID () {
  return `
    $loop[$arrayLength[allRaresData];
      $let[k;$math[$env[k] - 1]]
      $jsonLoad[arr;$arrayAt[allRaresData;$get[k]]]

      $let[animalID;$env[arr;0]]
      $jsonLoad[arrAliases;$env[arr;1]]

      $if[$arrayIncludes[arrAliases;$get[caughtRare]];
        $break
      ]
    ;k;true]
  `
}

function participants(hideReady = false) {
  return `
    $arrayForEach[participants;participant;
      $if[${hideReady};;
        $if[$getUserVar[ready|$channelID;$env[participant]];
          $let[rdy;✅]
        ;
          $let[rdy;❌]
        ]
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
      $setUserVar[1htime|$channelID;$sum[$getUserVar[1htime|$channelID;${id}];1];${id}] 

      $switch[$getUserVar[1htime|$channelID];
        $case[1800;   ${timeLeft(30,  `m`)}   ]
        $case[3540;   ${timeLeft(1,   `m`)}   ]
        $case[3597;   ${timeLeft(3,   `s`)}   ]
        $case[3598;   ${timeLeft(2,   `s`)}   ]
        $case[3599;   ${timeLeft(1,   `s`)}   ] 
        $case[3600;
          $!stopInterval[1HLUCK-${id}|$channelID]
          $sendMessage[$channelID;
            <@${id}> 
            $getGlobalVar[author] 
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
  return `
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $jsonLoad[history;$env[userProfile;1hl;history]]
    $timezone[$env[userProfile;timezone]]
    $arrayPushJSON[history;{
      "points": $getUserVar[1hpoints|$channelID],
      "rares": $getUserVar[1htotalRares|$channelID],
      "endedAt": $getTimestamp,
      "raresList": $getUserVar[1hallRaresList|$channelID]
    }]
    $!jsonSet[userProfile;1hl;history;$env[history]]
    $setUserVar[userProfile;$env[userProfile]]
    ${reset()}
  `
}

function partyEnd () {
  return `
    $if[$getUserVar[participating|$channelID];
      $jsonLoad[participants;$getChannelVar[participants]]
      $let[allFinished;$arrayEvery[participants;user;$return[$checkCondition[$getUserVar[1hstarted|$channelID;$env[user]]!=true]]]]

      $if[$get[allFinished];;
        $stop
      ]

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
      $deleteChannelVar[participants]
    ]
  `
}

function partyExist() {
  return `
    $onlyIf[$getChannelVar[participants]!=;
      $ephemeral
      $callFunction[embed;error]
      $description[## Party does not exist anymore]
    ]
  `
}

function partyTimeout () {
  return `
    $setTimeout[
      $!disableButtonsOf[$channelID;$get[msgid]]
      $sendMessage[$channelID;
        $description[## Party created by <@$env[participants;0]> was closed due to inactivity]
        $color[Orange]
      ]
      $arrayForEach[participants;user;
        $deleteUserVar[participating|$channelID;$env[user]]
      ]
      $deleteChannelVar[participants]
    ;30m;MULTI1HL-$channelID]
  `
}

function isActiveChallenge () {
  return `
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $onlyIf[$getUserVar[1hstarted|$channelID];$callFunction[embed;error] $description[## You don't have an active challenge!]]
  `
}

function time (id = "$authorID") {
  return `
    $let[time;$getuservar[1htime|$channelID;${id}]]
    $addField[Time passed:;\`$parseDigital[$get[time]000]\`]
  `
}

function pts (id = "$authorID") {
  return `
    $let[totalRares;$getuservar[1htotalRares|$channelID;${id}]]
    ${raresListGenerator(false, id)}
    ${total(id)}
    $if[$env[userProfile;1hl;settings;hideRares];
      **Total rares:**\n||$get[totalRares]||
    ;
      **Total rares:**\n\`$get[totalRares]\`
    ]
    **All Rares List:**\n╔══════════\n$get[list]\n╚══════════
  `
}

function reset (id = "$authorID") {
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

function raresListGenerator(forHistory = false, id = '$authorID') {
  return `
    $if[${forHistory};
      $jsonLoad[raresList;$env[history;$get[index];raresList]]
    ;
      $jsonLoad[raresList;$getUserVar[1hallRaresList|$channelID;${id}]]
    ]
    $jsonLoad[listEntries;$jsonEntries[raresList]]

    $arrayForEach[listEntries;entry;

      $let[animalID;$env[entry;0]]
      $let[quantity;$env[entry;1]]
      $let[animalDisplay;$env[animals;$get[animalID];variants;0;${type}]]
      ${findingRareInChallengeDataBase()}
      $let[listContent;$get[animalDisplay] x$get[quantity]]

      $let[list;$get[list]║ $bold[$get[listContent]]\n]
    ]
    $if[$get[list]==;$let[list;║ none]]
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
            $let[quantity;$env[allRaresList;$env[rare]]]
            $if[$get[quantity]==;$let[quantity;0]]
            $if[$get[quantity]<$get[limit];
              $let[limiters;$get[limiters]**$get[displayRare] \`$get[quantity]|$get[limit]\`**\n]
            ]
          ]
          $break

        ;i;true]
      ]
    ]
  `
}

function timeLeft (num, time, id = "$authorID") {
  return `$sendMessage[$channelID;# <@${id}> You have ${num}${time} left!]` 
}

function total (id = "$authorID") {
  return `
    $let[1hlp;$getUserVar[1hpoints|$channelID;${id}]]
    $if[$env[userProfile;1hl;settings;hidePoints];
      ## Total points: ||$get[1hlp]||
    ;
      ## Total points: \`$get[1hlp]\`
    ]
  `
}

// embed functions


function historyEmbed() {
  return `
    $let[index;$math[$get[page] - 1]]
    $callFunction[embed;lucky]
    ${raresListGenerator(true)}
    $footer[Sort Type: $get[sort]]
    $description[$trimLines[
      ## Points: \`$env[history;$get[index];points]\`
      ## Rares: \`$env[history;$get[index];rares]\`
      ## Ended at: $discordTimestamp[$env[history;$get[index];endedAt];LongDateTime]
      ## All Rares List:\n╔══════════\n$get[list]\n╚══════════
    ]]

    $if[$arrayLength[history]>1;
      $addActionRow
      $addButton[historyPageLeft-$authorID-$get[page]-$get[sortType];;Primary;⬅️]
      $addButton[historyPages-$authorID-NaN-$get[sortType];Page $get[page]/$arrayLength[history];Primary;🔎]
      $addButton[historyPageRight-$authorID-$get[page]-$get[sortType];;Primary;➡️]
      $addActionRow
      $addStringSelectMenu[sortHis-$authorID;Sort by]
      $addOption[Date;;sortHis-$authorID-$get[page]-d]
      $addOption[Points;;sortHis-$authorID-$get[page]-p]
      $addOption[Rares;;sortHis-$authorID-$get[page]-r]
    ]
    $if[$env[history;0]!=;
      $addActionRow
      $addButton[deleteHistoryPage-$authorID-$get[page]-$get[sortType];Delete This Page (GLITCH);Danger;🗑️;true]
    ]
  `
}

function particEmbed () {
  return `
    $setChannelVar[participants;$env[participants]]
    $let[host;$env[participants;0]]
    ${participants()}
    $let[hostSets;$getChannelVar[unlimitedRares]]
    $let[tags;none]
    $let[cond;Enable]

    $if[$get[hostSets];
      $let[tags;Unlimited Rares]
      $let[cond;Disable]
    ]
    
    $author[$username[$get[host]]'s Lobby;$userAvatar[$get[host]]]
    $addField[Participants:;$codeBlock[$get[parts]]]
    $addField[Mode:;**\`FFA\`**]
    $addField[Tags:;$codeBlock[$get[tags]]]

    $color[$getGlobalVar[luckyColor]]
    $footer[Party will be closed automatically in 30m due to inactivity]
    $addActionRow
    $addButton[join1hl;Participate;Success;🔝]
    $addButton[quit1hl;Quit;Danger;🔙]
    $addButton[ready1hl;Ready;Success;✅]
    $addActionRow
    $addButton[start1hl-$env[participants;0];Start;Success;✔️]
    $addButton[end1hl-$env[participants;0];End;Danger;🔚]
    $addActionRow
    $addStringSelectMenu[addTags-$env[participants;0];Tags]
    $addOption[Infinite Commons;$get[cond] unlimited rares;unlimitedRares]
    $addActionRow
    $addStringSelectMenu[switchMode-$env[participants;0];Mode;true]
    $addOption[.;.;.]
  `
}

function settingsEmbed() {
  return `
    $jsonLoad[user1hlData;$env[userProfile;1hl]]
    $jsonLoad[userSettings;$env[user1hlData;settings]]
    ${loadGlobalJSON()}
    $let[difficulty;$default[$env[user1hlData;difficulty];$arrayAt[difficulties;0]]]

    $let[disabled;false]
    $let[desc;]

    $jsonLoad[contents;
      [
        "Hide Points",
        "Hide Rares",
        "Hide Rares Limit",
        "Unlimited Rares",
        "Difficulties"
      \\]
    ]

    $let[i;0]

    $addContainer[
      $callFunction[author]
      $addSeparator
      $addTextDisplay[# Settings:]

      $arrayForEach[globalSettingsEntries;setting;
        $let[key;$env[setting;0]]
        $let[value;$env[setting;1]]
        $let[value;$default[$env[userSettings;$get[key]];$get[value]]]

        $let[content;$arrayAt[contents;$get[i]]]
        $if[$get[value];  $let[state;Enabled] $let[style;Success] ;  $let[state;Disabled] $let[style;Danger] ]

        $addSection[
          $addTextDisplay[### $get[content]]
          $addButton[$get[key]-$authorID;$get[state];$get[style];;$get[disabled]]
        ]

        $letSum[i;1]
      ]

      $if[$env[userSettings;difficulties];

        $addSeparator[Large]
        $addTextDisplay[### Difficulty]
        $addActionRow
        $arrayForEach[difficulties;elem;
          $let[i;$arrayIndexOf[difficulties;$env[elem]]]
          $let[disabled;$checkCondition[$get[difficulty]==$env[elem]]]
          
          $let[style;$arrayAt[styles;$get[i]]]
          $addButton[$env[elem]-difficulty-$authorID;$toTitleCase[$env[elem]];$get[style];;$get[disabled]]
        ]

      ]
    ;$getGlobalVar[luckyColor]]
  `
}

function startingEmbed() {
  return `
    $description[# Get ready! Starting in $get[s] seconds!]
    $color[$getGlobalVar[luckyColor]]
  `
}

// other

function loadGlobalJSON() {
  return `
    $jsonLoad[globalProfile;$getGlobalVar[userProfile]]
    $jsonLoad[globalSettings;$env[globalProfile;1hl;settings]]
    $jsonLoad[globalSettingsKeys;$jsonKeys[globalSettings]]
    $jsonLoad[globalSettingsEntries;$jsonEntries[globalSettings]]
    $jsonLoad[difficulties;$getGlobalVar[difficulties]]
    $arrayLoad[styles;,;Success,Primary,Danger]
  `
}

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

function sortBtnLogic () {
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
      $let[input;$input[page-$authorid]]
      $onlyIf[$isNumber[$get[input]];
        $interactionReply[
          $ephemeral
          $callFunction[embed;error]
          $description[## Argument is not a number!]
        ]
      ]
      $let[page;$get[input]]
      $if[$get[page]>$arrayLength[history];
        $let[page;1]
      ]
      $if[$get[page]<=0;
        $let[page;$arrayLength[history]]
      ]
    ]
    $if[$get[sortType]==p;
      $arrayAdvancedSort[history;elem1;elem2;
        $math[$env[elem1;points] - $env[elem2;points]]
      ;history]
    ]
    $if[$get[sortType]==r;
      $arrayAdvancedSort[history;elem1;elem2;
        $math[$env[elem1;rares] - $env[elem2;rares]]
      ;history]
    ]
    $if[$get[butid]==deleteHistoryPage;
      $!arraySplice[history;$math[$arrayLength[history] - $get[page]];1]
      $!jsonSet[userProfile;1hl;history;$env[history]]
      $setUserVar[userProfile;$env[userProfile]]
      $if[$get[page]>$arrayLength[history];
        $let[page;$arrayLength[history]]
      ]
    ]
  `
}