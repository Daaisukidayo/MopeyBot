const type = 'name' // editable between 'name' and 'emoji' to show name or emoji in rares list
module.exports = [
{
  name: "start",
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $onlyIf[$getUserVar[1hstarted|$channelID;$authorID;false]==false;${errorEmbed()} $description[## You already have an active challenge!]]
    
    ${normalEmbed()}
    $description[# 1 Hour Luck Challenge has begun!\n## Don't forget to turn on notification!]
    ${loadVarsForChallenge()}
    ${interval()}
  `
},{
  name: "time",
  type: "messageCreate",
  code: `
    $reply
    ${isActiveChallenge()}
    ${normalEmbed()}  
    $if[$getUserVar[1hpaused];$description[## Status: Paused]]
    ${time()}
  `
},{
  name: "pause",
  type: "messageCreate",
  code: `
    $reply
    ${isActiveChallenge()}

    $onlyIf[$getUserVar[1hpaused|$channelID]==false;
      ${errorEmbed()}
      $description[## You already have paused the challenge!]
    ]

    $onlyIf[$getUserVar[1htime|$channelID]<3600;
      ${errorEmbed()}
      $description[## Time's up!]
    ]

    $!stopInterval[1HLUCK-$authorID|$channelID]
    $setUserVar[1hpaused|$channelID;true]

    ${normalEmbed()}
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
      ${errorEmbed()} 
      $description[## You haven't paused your challenge!]
    ]

    $setUserVar[1hpaused|$channelID;false]

    ${normalEmbed()}
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

    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $arrayLoad[allRares]
    $arrayLoad[caught]
    $arrayLoad[caughtRares; ;$toLowerCase[$message]]

    $jsonLoad[raresMap;$getGlobalVar[raresMap]]
    $jsonLoad[animals;$readFile[json/animals.json]]
    $jsonLoad[SNORA;$getGlobalVar[SNORA]]
    $jsonLoad[allRaresList;$getUserVar[1hallRaresList|$channelID]]
    $jsonLoad[allRares;$getGlobalVar[allRares]]
    $jsonLoad[allRares;$jsonKeys[allRares]]
    
    $let[points;0]
    $let[content;]
    
    $c[Looping through every rare]

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
        ${errorEmbed()} 
        $description[## You are on pause!] 
        $sendMessage[$channelID]
      ]

      ${findingRareInSnoraBase()}
      ${findingRareInRaresMapBase()}

      $let[notCommon;$checkCondition[$env[rareMap;category]!=common]]
      $let[infiniteCommons;$env[userProfile;1hl;settings;infiniteCommons]]

      $if[$getUserVar[participating|$channelID];
        $let[infiniteCommons;$getChannelVar[infiniteCommons]]
      ]

      $if[$or[$get[infiniteCommons];$get[notCommon]];
        ${rares()}
        $continue
      ]

      $if[$includes[-$get[caughtRare]-;-markhor-;-mar-;-mg-];
        $let[rareName;Markhor]
      ]
      $if[$includes[-$get[caughtRare]-;-chocotoucan-;-cht-];
        $let[rareName;Choco Toucan]
      ]
      $if[$includes[-$get[caughtRare]-;-keelbilledtoucan-;-kbt-];
        $let[rareName;Keel-Billed Toucan]
      ]

      $let[commonCount;$env[allRaresList;$get[animalID];0]]

      $if[$get[commonCount]<3;
        ${rares()}
        $letSum[commonCount;1]

        $if[$get[commonCount]==3;
          $let[content;$get[content]## You got all $get[rareName]s!\n]
        ]
      ;
        $arrayPush[caught;0]
      ]
    ;i;desc]
    
    $c[Message sending]
    
    $if[$get[points]>0;

      $let[pts;]
      $arrayForEach[caught;pts;$let[pts;$if[$get[pts]==;$get[pts];$get[pts] + ]$env[pts]]]
      $setUserVar[1hpoints|$channelID;$math[$getUserVar[1hpoints|$channelID] + $get[points]]]

      ${settingParticProgress()}

      $if[$arraylength[caughtRares]>1;
        $let[desc;$get[pts] = $get[points]]
      ;
        $let[desc;+$get[pts]]
      ]
      $sendMessage[$channelID;
        $get[content]
        ${normalEmbed()}
        $description[# $get[desc]\n$trimLines[${total()}]]
        ${commons()}
        ${time()}
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
    $jsonLoad[animals;$readFile[json/animals.json]]
    $jsonLoad[raresMap;$getGlobalVar[raresMap]]
    $description[# 1 Hour Luck Ended!\n$trimLines[${pts()}]]
    ${normalEmbed()}
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
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $jsonLoad[animals;$readFile[json/animals.json]]
    $jsonLoad[raresMap;$getGlobalVar[raresMap]]
    $callFunction[checking]

    $let[id;$authorID]
    $if[$mentioned[0]!=;
      $let[id;$mentioned[0]]
    ]
    $jsonLoad[userProfile;$getUserVar[userProfile;$get[id]]]
    $onlyIf[$getuservar[1hstarted|$channelID;$get[id]];${errorEmbed()} $description[## $if[$get[id]!=$authorID;__$username[$get[id]]__ doesn't;You don't] have an active challenge!]]
    ${normalEmbed()}
    $author[$userDisplayName[$get[id]] • MUID: $env[userProfile;MUID];$userAvatar[$get[id]]]
    $description[$trimLines[${pts("$get[id]")}]]
    ${time("$get[id]")}
  `
},{
  name: "editpoints",
  aliases: ["epts", "editscore", "escr"],
  type: "messageCreate",
  description: "disabled",
  code: `
    $stop
    $reply
    ${isActiveChallenge()}
    $onlyIf[$and[$isNumber[$message];$message>=0];${errorEmbed()} $description[## Only a number greater than or equal to 0 is allowed!]]
    $setUserVar[1hpoints;$message]
    ${normalEmbed()}
    ${pts()}
  `
},{
  name: "edittime",
  aliases: ["etime", "et"],
  type: "messageCreate",
  code: `
    $reply
    ${isActiveChallenge()}
    $onlyIf[$or[$and[$isNumber[$message];$message>=0;$message<3600];$checkContains[$message;:]];${errorEmbed()} $description[## Your time must be:\n### Bigger than or equal to 0\n### Lower than 3600\n# Or\n### In format «\`MM:SS\`»]]
    
    $if[$checkContains[$message;:];
      $let[res;$round[$math[$unparseDigital[00:$message] / 1000]]]
    ;
      $let[res;$message]
    ]
    $setUserVar[1htime|$channelID;$get[res]]
    ${normalEmbed()}
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
    
    $jsonLoad[raresMap;$getGlobalVar[raresMap]]
    $jsonLoad[SNORA;$getGlobalVar[SNORA]]
    $jsonLoad[allRaresList;$getUserVar[1hallRaresList|$channelID]]
    $jsonLoad[animals;$readFile[json/animals.json]]
    $jsonLoad[allRares;$getGlobalVar[allRares]]
    $jsonLoad[allRares;$jsonKeys[allRares]]
    
    $let[arg1;$toLowerCase[$message[0]]]
    $let[arg2;$message[1]]
    $let[arg3;$toLowerCase[$message[2]]]
    $let[usage;## Usage: \`$getGuildVar[prefix]editlist <rare> {+ || -} {amount || all}\`]
    
    $onlyIf[$get[arg1]!=;
      ${errorEmbed()} 
      $description[$get[usage]]
    ]

    $onlyIf[$arrayIncludes[allRares;$get[arg1]];
      ${errorEmbed()} 
      $description[## The rare «\`$get[arg1]\`» does not exist!]
    ]

    $onlyIf[$or[$get[arg2]==+;$get[arg2]==-];
      ${errorEmbed()} 
      $description[$get[usage]]
    ]

    $onlyIf[$or[$and[$get[arg3]==all;$get[arg2]==-];$and[$isNumber[$get[arg3]];$get[arg3]>0]];
      ${errorEmbed()} 
      $description[### Only a number greater than 0 or argument «\`all\`» (if removing) is allowed!]
    ]
    
    $let[caughtRare;$get[arg1]]
    ${findingRareInSnoraBase()}
    ${findingRareInRaresMapBase()}
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
      ${errorEmbed()} 
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
        $let[quantity;$env[entry;1]]
        $let[animalID;$env[entry;0]]
        ${findingRareInRaresMapBase()}
        $let[rareMapPoints;$env[rareMap;points]]
        
        $letSum[rares;$get[quantity]]
        $letSum[points;$math[$get[quantity] * $get[rareMapPoints]]]
      ]
    ]

    $setUserVar[1hallRaresList|$channelID;$env[allRaresList]]
    $setUserVar[1htotalRares|$channelID;$get[rares]]
    $setUserVar[1hpoints|$channelID;$get[points]]

    ${settingParticProgress()}

    $let[animal;$env[animals;$get[animal];variants;0;${type}]]

    ## ✅ $get[state] \`$get[count]\` $get[animal]
    ${normalEmbed()}
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
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  description: "settings buttons",
  code: `
    $textSplit[$customID;-]
    $onlyIf[$splitText[1]==$authorID;$callFunction[notYourBTN]]
    $let[btnid;$splitText[0]]
    $onlyIf[$includes[$get[btnid];hidePoints;hideRares;infiniteCommons]]
    $jsonLoad[userProfile;$getUserVar[userProfile]]

    $let[sett;$env[userProfile;1hl;settings;$get[btnid]]]
    $if[$get[sett];
      $!jsonSet[userProfile;1hl;settings;$get[btnid];false]
    ;
      $!jsonSet[userProfile;1hl;settings;$get[btnid];true]
    ]

    $!stopTimeout[SETT-$authorID]

    ${settingsEmbed()}
    
    $setUserVar[userProfile;$env[userProfile]]
  `
},{
  name: "history",
  aliases: ["his"],
  type: "messageCreate",
  description: "history",
  code: `
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $callFunction[cooldown;1m]
    $jsonLoad[history;$env[userProfile;1hl;history]]
    $jsonLoad[history;$arrayReverse[history]]
    $jsonLoad[animals;$readFile[json/animals.json]]
    $jsonLoad[raresMap;$getGlobalVar[raresMap]]

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

    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $jsonLoad[history;$env[userProfile;1hl;history]]
    $jsonLoad[animals;$readFile[json/animals.json]]
    $jsonLoad[raresMap;$getGlobalVar[raresMap]]

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
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]

    $onlyIf[$getChannelVar[participants]==;
      $jsonLoad[participants;$getChannelVar[participants]]
      ${participants(true)}
      $author[✖️ Failed to create Party]
      $description[## Party already exist in this channel!]
      $addField[Participants:;$codeBlock[$get[parts]]]
      $color[$getGlobalVar[errorColor]]
    ]
    $onlyIf[$getUserVar[1hstarted|$channelID]!=true;
      $author[✖️ Failed to create Party]
      $description[## You have an active challenge! End it before creating a Party!]
      $color[$getGlobalVar[errorColor]]
    ]
    
    $arrayLoad[participants; ;$authorID]
    $setUserVar[participating|$channelID;true]
    $setUserVar[ready|$channelID;false]
    $setChannelVar[infiniteCommons;false]
    
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
    $jsonLoad[hostProfile;$getUserVar[userProfile;$env[participants;0]]]

    ${partyExist()}

    $onlyIf[$arrayIncludes[participants;$authorID]==false;
      $interactionReply[
        $ephemeral
        $author[✖️ Error]
        $description[## You're already participating]
        $color[$getGlobalVar[errorColor]]
      ]
    ]
    $onlyIf[$getUserVar[1hstarted|$channelID;$authorID;false]!=true;
      $interactionReply[
        $ephemeral
        $author[✖️ Error]
        $description[## You have an active challenge! Complete it before participating]
        $color[$getGlobalVar[errorColor]]
      ]
    ]
    $onlyIf[$arrayLength[participants]<6;
      $interactionReply[
        $ephemeral
        $author[✖️ Error]
        $description[## The Party is full]
        $color[$getGlobalVar[errorColor]]
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
        $author[✖️ Error]
        $description[## You're not a participant]
        $color[$getGlobalVar[errorColor]]
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
      $deleteChannelVar[infiniteCommons]

      $author[$username[$get[host]]'s Party;$userAvatar[$get[host]]]
      $description[# The Party was closed due to a lack of participants]
      $color[$getGlobalVar[luckyColor]]
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
    $deleteChannelVar[infiniteCommons]

    $author[$username[$get[host]]'s Party;$userAvatar[$get[host]]]
    $description[# The Party was closed by the Host]
    $color[$getGlobalVar[luckyColor]]
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
        $author[✖️ Error]
        $description[## You can't start alone!]
        $color[$getGlobalVar[errorColor]]
      ]
    ]

    $let[allRdy;$arrayEvery[participants;user;$return[$getUserVar[ready|$channelID;$env[user]]]]]
    $let[s;10]
    $let[msgid;$messageID]
    $let[members;]

    $onlyIf[$get[allRdy];
      $interactionReply[
        $ephemeral
        $author[✖️ Failed to start]
        $description[## Someone is not ready!]
        $color[$getGlobalVar[errorColor]]
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
        $author[✖️ Error]
        $description[## You're not a participant]
        $color[$getGlobalVar[errorColor]]
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
    $onlyIf[$includes[$selectMenuValues;infiniteCommons]]

    $jsonLoad[participants;$getChannelVar[participants]]
    ${partyExist()}

    $onlyIf[$arrayIncludes[participants;$authorID];
      $interactionReply[
        $ephemeral
        $author[✖️ Error]
        $description[## You're not a participant]
        $color[$getGlobalVar[errorColor]]
      ]
    ]

    $let[hostSets;$getChannelVar[infiniteCommons]]
    $if[$get[hostSets];  $let[hostSets;false]  ;  $let[hostSets;true]  ]
    $setChannelVar[infiniteCommons;$get[hostSets]]

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
    $jsonLoad[animals;$readFile[json/animals.json]]
    $jsonLoad[raresMap;$getGlobalVar[raresMap]]
    
    $description[# 1 Hour Luck Ended!\n$trimLines[${pts()}]]
    ${normalEmbed()}
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
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $callFunction[cooldown;$get[cdTime]]
    
    $onlyIf[$message!=]

    $let[totalRares;0]
    $let[totalPoints;0]

    $jsonLoad[animals;$readFile[json/animals.json]]
    $jsonLoad[raresMap;$getGlobalVar[raresMap]]
    $jsonLoad[SNORA;$getGlobalVar[SNORA]]
    $jsonLoad[allRares;$getGlobalVar[allRares]]
    $jsonLoad[allRares;$jsonKeys[allRares]]
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

      ${findingRareInSnoraBase()}
      ${findingRareInRaresMapBase()}
      
      $let[newQuantity;$math[$env[allRaresList;$get[animalID]] + 1]]
      $!jsonSet[allRaresList;$get[animalID];$get[newQuantity]]    
    ;i;desc]

    $jsonLoad[listEntries;$jsonEntries[allRaresList]]

    $arrayForEach[listEntries;entry;

      $let[type;name] $c[<- Changeable between "name" and "emoji"]
      $let[animalID;$env[entry;0]]
      $let[quantity;$env[entry;1]]

      $let[animalDisplay;$env[animals;$get[animalID];variants;0;${type}]]

      ${findingRareInRaresMapBase()}

      $let[listPoints;$env[rareMap;points]]
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

function findingRareInRaresMapBase () {
  return `
    $loop[$arrayLength[raresMap];
      $let[j;$math[$env[j] - 1]]

      $jsonLoad[rareMap;$arrayAt[raresMap;$get[j]]]
      $jsonLoad[raresList;$env[rareMap;rares]]

      $if[$arrayIncludes[raresList;$get[animalID]];
        $break
      ]
    ;j;desc]
  `
}

function findingRareInSnoraBase () {
  return `
    $loop[$arrayLength[SNORA];
      $let[k;$math[$env[k] - 1]]
      $jsonLoad[arr;$arrayAt[SNORA;$get[k]]]

      $let[animalID;$env[arr;0]]
      $jsonLoad[arrAliases;$env[arr;1]]

      $if[$arrayIncludes[arrAliases;$get[caughtRare]];
        $break
      ]
    ;k;desc]
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
    ${reset()}
    $setUserVar[userProfile;$env[userProfile]]
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
        $color[$getПlobalМar[luckyColor]]
      ]
      $deleteChannelVar[participants]
    ]
  `
}

function partyExist() {
  return `
    $onlyIf[$getChannelVar[participants]!=;
      $ephemeral
      $author[✖️ Error]
      $description[## Party does not exist anymore]
      $color[$getGlobalVar[errorColor]]
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
    $onlyIf[$getUserVar[1hstarted|$channelID];${errorEmbed()} $description[## You don't have an active challenge!]]
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
      ${findingRareInRaresMapBase()}
      $let[points;$env[rareMap;points]]
      $let[totalPointsInList;$math[$get[quantity] * $get[points]]]
      $let[listContent;$get[animalDisplay] x$get[quantity] × $get[points] | +$get[totalPointsInList]]

      $let[list;$get[list]║ $bold[$get[listContent]]\n]
    ]
    $if[$get[list]==;$let[list;║ none]]
  `
}

function rares() {
  return `
    $letSum[points;$env[rareMap;points]]
    $arrayPush[caught;$env[rareMap;points]]
    $setUserVar[1htotalRares|$channelID;$math[$getUserVar[1htotalRares|$channelID] + 1]]

    $let[newQuantity;$math[$env[allRaresList;$get[animalID]] + 1]]
    $!jsonSet[allRaresList;$get[animalID];$get[newQuantity]]

    $setUserVar[1hallRaresList|$channelID;$env[allRaresList]]
  `
}

function commons () {
  return `
    $if[$get[infiniteCommons];;
      $arrayLoad[coms;,;chocoToucan|CHT,keelBilledToucan|KBT,markhor|MAR]
      $arrayForEach[coms;com;
        $arrayLoad[com;|;$env[com]]

        $let[key;$env[com;0]]
        $let[name;$env[com;1]]

        $let[quantity;$env[allRaresList;$get[key];0]]
        $if[$get[quantity]==;$let[quantity;0]]
        $if[$get[quantity]<3;
          $addField[$get[name]:;\`$get[quantity]|3\`;true]
        ]
      ]
    ]
  `
}

function timeLeft (num, time, id = "$authorID") {
  return `$sendMessage[$channelID;# <@${id}> ${num}${time} left!]` 
}

function total (id = "$authorID") {
  return `
    $let[1hlp;$getUserVar[1hpoints|$channelID;${id}]]
    $if[$env[userProfile;1hl;settings;hidePoints];
      **Total points:**\n||$get[1hlp]||
    ;
      **Total points:**\n\`$get[1hlp]\`
    ]
  `
}

// embed functions


function historyEmbed() {
  return `
    $let[index;$math[$get[page] - 1]]
    ${normalEmbed()}
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
    $let[hostSets;$getChannelVar[infiniteCommons]]
    $let[tags;none]
    $let[cond;Enable]

    $if[$get[hostSets];
      $let[tags;Infinite Commons]
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
    $addOption[Infinite Commons;$get[cond] unlimited common rares;infiniteCommons]
    $addActionRow
    $addStringSelectMenu[switchMode-$env[participants;0];Mode;true]
    $addOption[.;.;.]
  `
}

function settingsEmbed() {
  return `
    $let[hidePoints;$env[userProfile;1hl;settings;hidePoints]]
    $let[hideRares;$env[userProfile;1hl;settings;hideRares]]
    $let[infiniteCommons;$env[userProfile;1hl;settings;infiniteCommons]]
    $let[disableBut;false]

    $title[Settings:]
    $color[$getGlobalVar[luckyColor]]
    $description[### Hide Total Points: \`$get[hidePoints]\`
    ### Hide Total Rares: \`$get[hideRares]\`
    ### Infinite Commons: \`$get[infiniteCommons]\`]
    
    $addActionRow
    $addButton[hidePoints-$authorID;$if[$get[hidePoints];Disable;Enable] «Hide Total Points»;Success]
    $addActionRow
    $addButton[hideRares-$authorID;$if[$get[hideRares];Disable;Enable] «Hide Total Rares»;Success]
    $addActionRow
    $addButton[infiniteCommons-$authorID;$if[$get[infiniteCommons];Disable;Enable] «Infinite Commons»;Success]
    $if[$isButton;
      $!editMessage[$channelID;$messageID]
      $deferUpdate
      $let[msg;$messageID]
    ;
      $let[msg;$sendMessage[$channelID;;true]]
    ]
    
    $setTimeout[
      $disableButtonsOf[$channelID;$get[msg]]
    ;1m;SETT-$authorID]
  `
}

function startingEmbed() {
  return `
    $description[# Get ready! Starting in $get[s] seconds!]
    $addField[Participants:;$codeBlock[$get[parts]]]
    $color[$getGlobalVar[luckyColor]]
  `
}

function errorEmbed () {
  return `
    $author[✖️ Error!]
    $color[$getGlobalVar[errorColor]]
  `
}

function normalEmbed () {
  return `
    $getGlobalVar[author]
    $color[$getGlobalVar[luckyColor]]
  `
}

// other


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
          $author[✖️ Invalid Arguments!]
          $description[## Argument is not a number!]
          $color[$getGlobalVar[errorColor]]
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