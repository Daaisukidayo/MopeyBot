module.exports = [
{
  name: "start",
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $onlyIf[$getUserVar[1hstarted;$authorID;false]==false;${errorEmbed()} $description[## You already have an active challenge!]]
    $onlyIf[$getUserVar[participating;$authorID;false]==false;${errorEmbed()} $description[## You are a participator!]]
    
    ${normalEmbed()}
    $description[# 1 hour luck challenge has begun!]
    $setUserVar[1htime;0]
    $setUserVar[1hstarted;true]
    $setUserVar[1hpoints;0]
    $setUserVar[1hpaused;false]
    $setUserVar[1hkbt;0]
    $setUserVar[1hcht;0]
    $setUserVar[1hmar;0]
    $setUserVar[1htotalRares;0]
    $setUserVar[1hallRaresList;{}]
    ${interval()}
  `
},{
  name: "time",
  type: "messageCreate",
  code: `
    $reply
    ${checkChall()}
    ${normalEmbed()}  
    $if[$getUserVar[1hpaused];$description[## Status: Paused]]
    ${time()}
  `
},{
  name: "pause",
  type: "messageCreate",
  code: `
    $reply
    ${checkChall()}
    $onlyIf[$getUserVar[1hpaused]==false;${errorEmbed()} $description[## You already have paused the challenge!]]
    $!stopInterval[1HLUCK-$authorID]
    $setUserVar[1hpaused;true]
    ${normalEmbed()}
    $description[# Paused!]
    ${total()} 
    ${time()}
  `
},{
  name: "resume",
  aliases: ["continue", "res"],
  type: "messageCreate",
  code: `
    $reply
    ${checkChall()}
    $onlyIf[$getUserVar[1hpaused];${errorEmbed()} $description[## You haven't paused your challenge!]]
    $setUserVar[1hpaused;false]
    ${normalEmbed()}
    $description[# Continued!]
    ${total()}
    ${time()}
    $if[$getUserVar[participating];${partyInterval()};${interval()}]
  `
},{
  unprefixed: true,
  type: "messageCreate",
  code: `
    $reply 
    $onlyIf[$getUserVar[1hstarted]]
    $onlyIf[$startsWith[$messageContent;$getGuildVar[prefix]]==false]

    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $arrayLoad[allRares]
    $arrayLoad[caught]
    $arrayLoad[caughtRares; ;$toLowerCase[$message]]

    $jsonLoad[raresMap;$getGlobalVar[raresMap]]
    $jsonLoad[SNORA;$getGlobalVar[SNORA]]
    $jsonLoad[allRaresList;$getUserVar[1hallRaresList]]
    
    $arrayForEach[raresMap;rareMap;
      $jsonLoad[allRaresFromCat;$env[rareMap;rares]]
      $arrayConcat[allRares;allRares;allRaresFromCat]
    ]
    
    $let[points;0]
    
    
    $arrayForEach[raresMap;rareMap;
      $jsonLoad[allRaresFromCat;$env[rareMap;rares]]
      $arrayConcat[allRares;allRares;allRaresFromCat]
    ]
    
    $c[scanning rares...]
    
    $arrayForEach[caughtRares;caughtRare;
      $if[$arrayIncludes[allRares;$env[caughtRare]];
        $onlyIf[$getuservar[1hpaused]!=true;${errorEmbed()} $description[## You are on pause!] $sendMessage[$channelID]]
        $arrayForEach[raresMap;rareMap;
          $jsonLoad[raresFromRareMap;$env[rareMap;rares]]
          $if[$arrayIncludes[raresFromRareMap;$env[caughtRare]];

            $let[skipCommonCheck;$or[$env[userProfile;1hl;settings;infiniteCommons];$env[rareMap;category]!=common]]

            $if[$get[skipCommonCheck];
              ${rares()}
            ;
              $if[$includes[-$env[caughtRare]-;-markhor-;-mar-];
                $let[com;mar]
                $let[rareName;Markhor]
              ;
              $if[$includes[-$env[caughtRare]-;-chocotoucan-;-cht-];
                $let[com;cht]
                $let[rareName;Choco Toucan]
              ;
              $if[$includes[-$env[caughtRare]-;-keelbilledtoucan-;-kbt-];
                $let[com;kbt]
                $let[rareName;Keel-Billed Toucan]
              ]]]

              $let[commonCount;$getuservar[1h$get[com]]]
              $if[$get[commonCount]<3;
                ${rares()}
                $setuservar[1h$get[com];$math[$get[commonCount] + 1]]
                $if[$getuservar[1h$get[com]]==3;
                  $let[content;# You got all $get[rareName]s!]
                ]
              ;
                $arrayPush[caught;0]
              ]
            ]
          ]
        ]
      ;
        $arrayPush[caught;0]
      ]
    ]
    
    $c[Message sending...]
    
    $if[$get[points]>0;
      $let[pts;]
      $arrayForEach[caught;pts;$let[pts;$if[$get[pts]==;$get[pts];$get[pts] + ]$env[pts]]]
      $setUserVar[1hpoints;$math[$getUserVar[1hpoints] + $get[points]]]
      $if[$getUserVar[participating];
        $jsonLoad[progress;$getUserVar[progress]]
        $!jsonSet[progress;points;$getUserVar[1hpoints]]
        $setUserVar[progress;$env[progress]]
      ]

      $if[$arraylength[caughtRares]>1;
        $let[desc;$get[pts] = $get[points]]
      ;
        $let[desc;+$get[pts]]
      ]
      $sendMessage[$channelID;
        $get[content]
        ${normalEmbed()}
        $description[# $get[desc]]
        ${commons()}
        ${total()}
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
    ${checkChall()}
    $description[# 1 Hour Luck Ended!]
    ${normalEmbed()}
    ${pts()}
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
    $callFunction[checking]

    $let[id;$authorID]
    $if[$mentioned[0]!=;
      $let[id;$mentioned[0]]
    ]
    $jsonLoad[userProfile;$getUserVar[userProfile;$get[id]]]
    $onlyIf[$getuservar[1hstarted;$get[id]];${errorEmbed()} $description[## $if[$get[id]!=$authorID;__$username[$get[id]]__ doesn't;You don't] have an active challenge!]]
    ${normalEmbed()}
    $author[$userDisplayName[$get[id]] • MUID: $env[userProfile;MUID];$userAvatar]
    ${pts("$get[id]")}
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
    ${checkChall()}
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
    ${checkChall()}
    $onlyIf[$or[$and[$isNumber[$message];$message>=0;$message<3600];$checkContains[$message;:]];${errorEmbed()} $description[## Your time must be:\n### Bigger than 0\n### Lower than 3600\n### Or in format «\`MM:SS\`»]]
    
    $if[$checkContains[$message;:];
      $setUserVar[1htime;$round[$math[$unparseDigital[00:$message] / 1000]]]
    ;
      $setUserVar[1htime;$message]
    ]
    ${normalEmbed()}
    ${total()}
    ${time()}
  `
},{
  name: "editlist",
  aliases: ["elist", "el"],
  type: "messageCreate",
  code: `
    $reply
    ${checkChall()}
    
    $jsonLoad[allRaresList;$getUserVar[1hallRaresList]]
    $jsonLoad[snora;$getGlobalVar[SNORA]]
    $jsonLoad[snoraKeys;$jsonKeys[snora]]
    $arrayLoad[allRaresNames;, ;$jsonValues[snora;, ]]
    $jsonLoad[raresMap;$getGlobalVar[raresMap]]
    $arrayForEach[raresMap;rareMap;
      $jsonLoad[allRaresFromCat;$env[rareMap;rares]]
      $arrayConcat[allRares;allRares;allRaresFromCat]
    ]
    
    $let[arg1;$toLowerCase[$message[0]]]
    $let[arg2;$advancedReplace[$toLowerCase[$message[1]];add;+;a;+;remove;-;r;-]]
    $let[arg3;$toLowerCase[$message[2]]]
    $let[usage;## Usage: \`$getGuildVar[prefix]editlist [rare\\] {add/a/+ || remove/r/-} <amount/all>\`]
    
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

    $onlyIf[$or[$and[$get[arg3]==all;$get[arg2]==-];$isNumber[$get[arg3]];$get[arg3]>0];
      ${errorEmbed()} 
      $description[### Only a number greater than 0 or argument «\`all\`» (if removing) is allowed!]
    ]
    
    $let[rareAn;$env[snora;$get[arg1]]]
    
    $if[$get[arg3]==all;
      $!jsonDelete[allRaresList;$get[rareAn]]
    ;
      $if[$jsonHas[allRaresList;$get[rareAn]]==false;
        $!jsonSet[allRaresList;$get[rareAn];0]
      ]
      
      $!jsonSet[allRaresList;$get[rareAn];$math[$env[allRaresList;$get[rareAn]] $get[arg2] $get[arg3]]]
      
      $if[$env[allRaresList;$get[rareAn]]<=0;
        $!jsonDelete[allRaresList;$get[rareAn]]
      ]
    ]
    $setUserVar[1hallRaresList;$env[allRaresList]]
    
    $setUserVar[1htotalRares;0]
    $setUserVar[1hpoints;0]
    
    $jsonLoad[allRaresListEntries;$jsonEntries[allRaresList]]
    
    $if[$arrayAt[allRaresListEntries;0]==;;
      $arrayForEach[allRaresListEntries;entry;
        $setUserVar[1htotalRares;$math[$getUserVar[1htotalRares] + $env[entry;1]]]
        
        $arrayForEach[raresMap;rareMap;
          $jsonLoad[rares;$env[rareMap;rares]]
          $if[$arrayIncludes[rares;$arrayAt[snoraKeys;$arrayIndexOf[allRaresNames;$env[entry;0]]]];
            $setUserVar[1hpoints;$math[$getUserVar[1hpoints] + $env[rareMap;points] * $env[entry;1]]]
          ]
        ]
      ]
    ]

    ${normalEmbed()}
    ${pts()}
    ${time()}
  `
},{
  name: "settings",
  aliases: ["sts"],
  type: "messageCreate",
  description: "settings",
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

    $if[$includes[$env[btn;0];historyPages];
      $let[sortType;$env[btn;3]]
      $modal[customPage-$authorid-NaN-$get[sortType];Custom page]
      $addTextInput[page-$authorid;Enter page;Short;true;;;1;5]
      $showModal
      $stop
    ]
    $onlyIf[$and[$includes[$get[butid];sortHis;historyPageLeft;historyPageRight;customPage;deleteHistoryPage];$includes[$env[btn;1];$authorID]];$callFunction[notYourBTN]]

    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $jsonLoad[history;$env[userProfile;1hl;history]]

    $let[msg;$messageID]
    $let[page;$env[btn;2]]
    $let[sortType;$env[btn;3]]

    ${sortBtnLogic()}

    $!stopTimeout[1HLHISTORY-$authorID]
    $jsonLoad[history;$arrayReverse[history]]

    $if[$arrayAt[history;0]==;
      $description[# No history]
      $getGlobalVar[author]
      $color[$getGlobalVar[luckyColor]]
      $!editMessage[$channelID;$get[msg]]
      $stop
    ]
    
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
      $author[✖️ Error]
      $description[## Party already exist! Use another channel]
      $color[$getGlobalVar[errorColor]]
    ]

    $onlyIf[$getUserVar[participating;$authorID;false]==false;
      $author[✖️ Failed to create Party]
      $description[## You're already participating somewhere else]
      $color[$getGlobalVar[errorColor]]
    ]

    $onlyIf[$getUserVar[1hstarted;$authorID;false]==false;
      $author[✖️ Error]
      $description[## You have an active challenge! End it before creating a Party!]
      $color[$getGlobalVar[errorColor]]
    ]
    
    $arrayLoad[participants; ;$authorID]
    
    ${particEmbed()}
    $setUserVar[participating;true]
    $let[msgid;$sendMessage[$channelID;;true]]

    ${timeout()}
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
        $author[✖️ Error]
        $description[## You're already participating]
        $color[$getGlobalVar[errorColor]]
      ]
    ]
    $onlyIf[$getUserVar[participating;$authorID;false]==false;
      $interactionReply[
        $ephemeral
        $author[✖️ Error]
        $description[## You're participating somewhere else]
        $color[$getGlobalVar[errorColor]]
      ]
    ]
    $onlyIf[$getUserVar[1hstarted;$authorID;false]==false;
      $interactionReply[
        $ephemeral
        $author[✖️ Error]
        $description[## You have an active challenge! End it before participating!]
        $color[$getGlobalVar[errorColor]]
      ]
    ]
    $onlyIf[$math[$arrayLength[participants] + 1]<=6;
      $interactionReply[
        $ephemeral
        $author[✖️ Error]
        $description[## Party is full]
        $color[$getGlobalVar[errorColor]]
      ]
    ]

    $!stopTimeout[MULTI1HL-$channelID]
    $let[msgid;$messageID]
    $setUserVar[participating;true]
    $arrayPush[participants;$authorID]
    ${particEmbed()}
    $!editMessage[$channelID;$get[msgid]]
    ${timeout()}
    $deferUpdate
  `
},{
  type: "interactionCreate",
  description: "When pressing Quit",
  allowedInteractionTypes: ["button"],
  code: `
    $onlyIf[$includes[$customID;quit1hl]]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]

    $jsonLoad[participants;$getChannelVar[participants]]

    ${partyExist()}

    $onlyIf[$and[$arrayIncludes[participants;$authorID];$getUserVar[participating;$authorID;false]];
      $interactionReply[
        $ephemeral
        $author[✖️ Error]
        $description[## You're not a participant]
        $color[$getGlobalVar[errorColor]]
      ]
    ]

    $onlyIf[$authorID!=$env[participants;0];
      $interactionReply[
        $ephemeral
        $author[✖️ Error]
        $description[## Host can't quit the Party]
        $color[$getGlobalVar[errorColor]]
      ]
    ]

    $!stopTimeout[MULTI1HL-$channelID]
    $let[msgid;$messageID]

    $!arraySplice[participants;$arrayIndexOf[participants;$authorID];1]
    $deleteUserVar[participating]
    
    ${particEmbed()}
    $!editMessage[$channelid;$get[msgid]]
    ${timeout()}
    $deferUpdate
  `
},{
  type: "interactionCreate",
  description: "When pressing End",
  allowedInteractionTypes: ["button"],
  code: `
    $onlyIf[$includes[$customID;end1hl]]
    $onlyIf[$includes[$customID;$authorID];
      $interactionReply[
        $ephemeral
        $author[✖️ Error]
        $description[## Only host can end the Party]
        $color[$getGlobalVar[errorColor]]
      ]
    ]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]

    $jsonLoad[participants;$getChannelVar[participants]]

    ${partyExist()}

    $onlyIf[$and[$arrayIncludes[participants;$authorID];$getUserVar[participating;$authorID;false]];
      $interactionReply[
        $ephemeral
        $author[✖️ Error]
        $description[## You're not a participant]
        $color[$getGlobalVar[errorColor]]
      ]
    ]

    $arrayForEach[participants;user;
      $deleteUserVar[participating;$env[user]]
    ]
    $deleteChannelVar[participants]

    $!stopTimeout[MULTI1HL-$channelID]
    $let[msgid;$messageID]

    $description[# ✅ Successfully closed the Party!]
    $color[$getGlobalVar[luckyColor]]
    $!editMessage[$channelid;$get[msgid]]
    $deferUpdate
  `
},{
  type: "interactionCreate",
  description: "When pressing Start",
  allowedInteractionTypes: ["button"],
  code: `
    $onlyIf[$includes[$customID;start1hl]]
    $onlyIf[$includes[$customID;$authorID];
      $interactionReply[
        $ephemeral
        $author[✖️ Error]
        $description[## Only host can start the challenge]
        $color[$getGlobalVar[errorColor]]
      ]
    ]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]

    $jsonLoad[participants;$getChannelVar[participants]]

    ${partyExist()}
    
    $onlyIf[$and[$arrayIncludes[participants;$authorID];$getUserVar[participating;$authorID;false]];
      $interactionReply[
        $ephemeral
        $author[✖️ Error]
        $description[## You're not a participant]
        $color[$getGlobalVar[errorColor]]
      ]
    ]

    $onlyIf[$env[participants;1]!=;
      $interactionReply[
        $ephemeral
        $author[✖️ Error]
        $description[## You can't start alone!]
        $color[$getGlobalVar[errorColor]]
      ]
    ]
    $let[s;10]
    $let[msgid;$messageID]

    $!stopTimeout[MULTI1HL-$channelID]
    
    $!deleteMessage[$channelID;$get[msgid]]

    $arrayForEach[participants;user;
      $let[parts;$get[parts]$username[$env[user]]\n]
    ]

    $let[msgid;$sendMessage[$channelID;${startingEmbed()};true]]
    
    $setInterval[
      $letSub[s;1]
      $if[$get[s]<=0;
        $!stopInterval[COUNTDOWN-$channelID]
        $arrayForEach[participants;user;
          $let[i;$arrayIndexOf[participants;$env[user]]]
          $jsonLoad[userProfile;$getUserVar[userProfile;$env[user]]]
          $setUserVar[1htime;0;$env[user]]
          $setUserVar[1hstarted;true;$env[user]]
          $setUserVar[1hpoints;0;$env[user]]
          $setUserVar[1hpaused;false;$env[user]]
          $setUserVar[1hkbt;0;$env[user]]
          $setUserVar[1hcht;0;$env[user]]
          $setUserVar[1hmar;0;$env[user]]
          $setUserVar[1htotalRares;0;$env[user]]
          $setUserVar[1hallRaresList;{};$env[user]]
          $jsonLoad[progress;{"points": 0, "user": "$env[user]"}]
          $setUserVar[progress;$env[progress];$env[user]]
        ]
          ${partyInterval('$env[participants;0]')}
          ${partyInterval('$env[participants;1]')}
          $if[$env[participants;2]!=;${partyInterval('$env[participants;2]')}]
          $if[$env[participants;3]!=;${partyInterval('$env[participants;3]')}]
          $if[$env[participants;4]!=;${partyInterval('$env[participants;4]')}]
          $if[$env[participants;5]!=;${partyInterval('$env[participants;5]')}]
        
        $!deleteMessage[$channelID;$get[msgid]]
        $sendMessage[$channelID;
          ${startingEmbed()}
          $description[# 1 hour luck challenge has begun!]
        ]
        $stop
      ]
      $!editMessage[$channelID;$get[msgid];${startingEmbed()}]
    ;1s;COUNTDOWN-$channelID]
    
  `
}]

function startingEmbed() {
  return `
    $description[# Get ready! Starting in $get[s] seconds!]
    $addField[Participants:;$codeBlock[$get[parts]]]
    $color[$getGlobalVar[luckyColor]]
  `
}

function partyInterval (userid = "$authorID") {
  return `
    $setInterval[
      $setUserVar[1htime;$sum[$getUserVar[1htime;${userid}];1];${userid}] 

      $switch[$getUserVar[1htime;${userid}];
        $case[1800;   ${timeLeft(30,  `m`, userid)}   ]
        $case[3570;   ${timeLeft(30,  `s`, userid)}   ]
        $case[3597;   ${timeLeft(3,   `s`, userid)}   ]
        $case[3598;   ${timeLeft(2,   `s`, userid)}   ]
        $case[3599;   ${timeLeft(1,   `s`, userid)}   ] 
        $case[3600;   $sendMessage[$channelID;# <@${userid}> EXTRA 10 SECONDS IN CASE YOU DIDN'T MANAGE TO FINISH WRITING. STOP FARMING RARES!]]
        $case[3610;   $sendMessage[$channelID;<@${userid}> $description[# Your 1 Hour Luck Ended!] ${normalEmbed()} ${pts(userid)}] $let[end_${userid};true]] 
      ]
      $if[$get[end_${userid}];
        $jsonLoad[userProfile;$getUserVar[userProfile;${userid}]]
        $jsonLoad[history;$env[userProfile;1hl;history]]
        $timezone[$env[userProfile;timezone]]
        $arrayPushJSON[history;{
          "points": $getuservar[1hpoints;${userid}],
          "rares": $getuservar[1htotalRares;${userid}],
          "time": "$parseDate[$getTimestamp;Locale]",
          "raresList": $getuservar[1hallRaresList;${userid}]
        }]
        $!jsonSet[userProfile;1hl;history;$env[history]]

        ${reset(userid)}
        $setUserVar[userProfile;$env[userProfile];${userid}]

        ${partyEnd()}

      ]
    ;1s;1HLUCK-${userid}]
  `
}

function interval () {
  return `
  $setInterval[
      $setUserVar[1htime;$sum[$getUserVar[1htime];1]] 

      $switch[$getuservar[1htime];
        $case[1800;   ${timeLeft(30,  `m`)}   ]
        $case[1800;   ${timeLeft(15,  `m`)}   ]
        $case[3300;   ${timeLeft(5,   `m`)}   ]
        $case[3540;   ${timeLeft(1,   `m`)}   ]
        $case[3570;   ${timeLeft(30,  `s`)}   ]
        $case[3597;   ${timeLeft(3,   `s`)}   ]
        $case[3598;   ${timeLeft(2,   `s`)}   ]
        $case[3599;   ${timeLeft(1,   `s`)}   ] 
        $case[3600;   $sendMessage[$channelID;# <@$authorID> EXTRA 10 SECONDS IN CASE YOU DIDN'T MANAGE TO FINISH WRITING. STOP FARMING RARES!]] 
        $case[3610;   $sendMessage[$channelID;<@$authorID> $description[# 1 Hour Luck Ended!] ${normalEmbed()} ${pts()}] $let[end;true]] 
      ]
      $if[$get[end];
        $jsonLoad[userProfile;$getUserVar[userProfile]]
        $jsonLoad[history;$env[userProfile;1hl;history]]
        $timezone[$env[userProfile;timezone]]
        $arrayPushJSON[history;{
          "points": $getuservar[1hpoints],
          "rares": $getuservar[1htotalRares],
          "time": "$parseDate[$getTimestamp;Locale]",
          "raresList": $getuservar[1hallRaresList]
        }]
        $!jsonSet[userProfile;1hl;history;$env[history]]
        ${reset()}
        $setUserVar[userProfile;$env[userProfile]]
      ]
      

    ;1s;1HLUCK-$authorID]
  `
}

function partyEnd () {
  return `
    $if[$getUserVar[participating];
      $jsonLoad[participants;$getChannelVar[participants]]
      $let[allFinished;$arrayEvery[participants;user;$return[$checkCondition[$getUserVar[1hstarted;$env[user]]!=true]]]]

      $if[$get[allFinished];
        $arrayLoad[result]
        $arrayForEach[participants;user;
          $jsonLoad[progress;$getUserVar[progress;$env[user]]]
          $arrayPushJSON[result;$env[progress]]
          $deleteUserVar[participating;$env[user]]
          $deleteUserVar[progress;$env[user]]
        ]
        $arrayAdvancedSort[result;A;B;$math[$env[B;points] - $env[A;points]];result]

        $let[position;0]
        
        $arrayForEach[result;res;
          $letSum[position;1]
          $let[emoji;$if[$get[position]==1;🥇;$if[$get[position]==2;🥈;$if[$get[position]==3;🥉;⁘]]]]
          $let[parts;$get[parts]### $get[emoji] $ordinal[$get[position]] ➤ $username[$env[res;user]] \n**$getGlobalVar[blank] Points: \`$env[res;points]\`**\n]
        ]

        $sendMessage[$channelID;
          $author[1 Hour Luck Together ended!]
          $description[# 🎉 Winner - $username[$env[result;0;user]] 🎉\n$trimEnd[$get[parts]]]
          $color[$getglobalvar[luckyColor]]
        ]
        $deleteChannelVar[participants]
      ]
    ]
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
    $if[$get[butid]==deleteHistoryPage;
      $!arraySplice[history;$math[$arrayLength[history] - $get[page]];1]
      $!jsonSet[userProfile;1hl;history;$env[history]]
      $setUserVar[userProfile;$env[userProfile]]
      $if[$get[page]>$arrayLength[history];
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
  `
}

function historyEmbed() {
  return `
    $let[index;$math[$get[page] - 1]]

    ${normalEmbed()}
    $addField[Sort Type:;\`$get[sort]\`]
    $addField[Points:;\`$env[history;$get[index];points]\`]
    $addField[Rares:;\`$env[history;$get[index];rares]\`]
    $addField[List:;$codeBlock[$advancedReplace[$trimLines[$env[history;$get[index];raresList]];{;;};;";;,;];JSON]]
    $footer[$env[history;$get[index];time]]

    $if[$arrayLength[history]>1;
      $addActionRow
      $addButton[historyPageLeft-$authorID-$get[page]-$get[sortType];;Primary;⬅️]
      $addButton[historyPages-$authorID-NaN-$get[sortType];Page $get[page]/$arrayLength[history];Primary;🔎]
      $addButton[historyPageRight-$authorID-$get[page]-$get[sortType];;Primary;➡️]
      $addActionRow
      $addStringSelectMenu[sortHis-$authorID;Sorty by]
      $addOption[Date;;sortHis-$authorID-$get[page]-d]
      $addOption[Points;;sortHis-$authorID-$get[page]-p]
      $addOption[Rares;;sortHis-$authorID-$get[page]-r]
    ]
    $if[$env[history;0]!=;
      $addActionRow
      $addButton[deleteHistoryPage-$authorID-$get[page]-$get[sortType];Delete This Page;Danger;🗑️]
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

function timeout () {
  return `
    $setTimeout[
      $!disableButtonsOf[$channelID;$get[msgid]]
      $sendMessage[$channelID;
        $description[## Party created by <@$env[participants;0]> was closed due to inactivity]
        $color[Orange]
      ]
      $arrayForEach[participants;user;
        $deleteUserVar[participating;$env[user]]
      ]
      $deleteChannelVar[participants]
    ;10m;MULTI1HL-$channelID]
  `
}

function particEmbed () {
  return `
    $setChannelVar[participants;$env[participants]]

    $arrayForEach[participants;participant;
      $let[parts;$get[parts]$username[$env[participant]]\n]
    ]
    
    $author[✅ Successfully created new Party!]
    $description[# Host: $username[$env[participants;0]]]
    $addField[Participants:;$codeBlock[$get[parts]]]
    $color[$getGlobalVar[luckyColor]]
    $footer[Party will be closed automatically in 10m due to inactivity]
    $addActionRow
    $addButton[join1hl;Participate;Success]
    $addButton[quit1hl;Quit;Danger]
    $addActionRow
    $addButton[start1hl-$env[participants;0];Start;Success]
    $addButton[end1hl-$env[participants;0];End;Danger]
  `
}

function settingsEmbed() {
  return `
    $let[hidePoints;$env[userProfile;1hl;settings;hidePoints]]
    $let[hideRares;$env[userProfile;1hl;settings;hideRares]]
    $let[infiniteCommons;$env[userProfile;1hl;settings;infiniteCommons]]

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

function checkChall () {
  return `
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $onlyIf[$getuservar[1hstarted];${errorEmbed()} $description[## You don't have an active challenge!]]
  `
}

function time (idtime = "$authorID") {
  return `
    $let[time;$getuservar[1htime;${idtime}]]
    $addField[Time passed:;\`$if[$get[time]>=3600;EXTRA 10 SECONDS;$parseDigital[$get[time]000]]\`]
  `
}

function pts (idpts = "$authorID") {
  return `
    ${total(idpts)}
    $let[totalRares;$getuservar[1htotalRares;${idpts}]]
    $if[$env[userProfile;1hl;settings;hideRares];
      $addField[Total rares:;||$get[totalRares]||;true]
    ;
      $addField[Total rares:;$get[totalRares];true]
    ]
    $let[list;$advancedReplace[$trimLines[$getuservar[1hallRaresList;${idpts}]];{;;};;";;,;]]
    $if[$get[list]==;$let[list;none]]
    $addField[All received rares list:;\n$codeBlock[$get[list];JSON]]
  `
}

function reset(idreset = "$authorID") {
  return `
    $!stopInterval[1HLUCK-${idreset}]
    $deleteUserVar[1hstarted;${idreset}]
    $deleteUserVar[1hallRaresList;${idreset}]
    $deleteUserVar[1htime;${idreset}]
    $deleteUserVar[1hpoints;${idreset}]
    $deleteUserVar[1htotalRares;${idreset}]
    $deleteUserVar[1hpaused;${idreset}]
    $deleteUserVar[1hmar;${idreset}]
    $deleteUserVar[1hkbt;${idreset}]
    $deleteUserVar[1hcht;${idreset}]
  `
}

function rares() {
  return `
    $letSum[points;$env[rareMap;points]]
    $arrayPush[caught;$env[rareMap;points]]
    $setUserVar[1htotalRares;$math[$getUserVar[1htotalRares] + 1]]
    
    $if[$env[allRaresList;$env[SNORA;$env[caughtRare]]]==;
      $!jsonSet[allRaresList;$env[SNORA;$env[caughtRare]];1]
    ;
      $!jsonSet[allRaresList;$env[SNORA;$env[caughtRare]];$math[$env[allRaresList;$env[SNORA;$env[caughtRare]]] + 1]]
    ]
    
    $setUserVar[1hallRaresList;$env[allRaresList]]
  `
}

function commons () { 
  return `
    $if[$env[userProfile;1hl;settings;infiniteCommons];;
      $let[mar;$getuservar[1hmar]]
      $let[cht;$getuservar[1hcht]]
      $let[kbt;$getuservar[1hkbt]]
      $if[$get[mar]<3;
        $addField[MAR:;\`$get[mar]/3\`;true]
      ]
      $if[$get[cht]<3;
        $addField[CHT:;\`$get[cht]/3\`;true]
      ]
      $if[$get[kbt]<3;
        $addField[KBT:;\`$get[kbt]/3\`;true]
      ]
    ]
  `
}

function timeLeft (num, time, idtimeleft = "$authorID") { return `$sendMessage[$channelID;# <@${idtimeleft}> ${num}${time} left!]` }

function total (idtotal = "$authorID") {
  return `
    $let[1hlp;$getuservar[1hpoints;${idtotal}]]
    $if[$env[userProfile;1hl;settings;hidePoints];
      $addField[Total points:;||$get[1hlp]||]
    ;
      $addField[Total points:;$get[1hlp]]
    ]
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