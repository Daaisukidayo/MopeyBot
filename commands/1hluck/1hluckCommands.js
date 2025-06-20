module.exports = [
{
  name: "start",
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $onlyIf[$getUserVar[1hstarted;$authorID;false]==false;${errorEmbed()} $description[## You already have an active challenge!]]
    
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
    ${interval()}
  `
},{
  unprefixed: true,
  type: "messageCreate",
  code: `
    $reply 
    $onlyIf[$getUserVar[1hstarted]]
    $onlyIf[$startsWith[$messageContent;$getGuildVar[prefix]]==false]
    $onlyIf[$getUserVar[1hpaused]==false]

    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $arrayLoad[allRares]
    $jsonLoad[raresMap;$getGlobalVar[raresMap]]
    $arrayLoad[caughtRares; ;$toLowerCase[$message]]
    $jsonLoad[SNORA;$getGlobalVar[SNORA]]
    $jsonLoad[allRaresList;$getUserVar[1hallRaresList]]
    
    $arrayForEach[raresMap;rareMap;
      $jsonLoad[allRaresFromCat;$env[rareMap;rares]]
      $arrayConcat[allRares;allRares;allRaresFromCat]
    ]
    
    $let[points;0]
    
    $arrayLoad[caught; ;]
    
    $arrayForEach[raresMap;rareMap;
      $jsonLoad[allRaresFromCat;$env[rareMap;rares]]
      $arrayConcat[allRares;allRares;allRaresFromCat]
    ]
    
    $c[scanning rares...]
    
    $arrayForEach[caughtRares;caughtRare;
      $if[$arrayIncludes[allRares;$env[caughtRare]];
        $onlyIf[$getuservar[1hpaused]==false;${errorEmbed()} $description[## You are on pause!]]
        $arrayForEach[raresMap;rareMap;
          $jsonLoad[raresFromRareMap;$env[rareMap;rares]]
          $if[$arrayIncludes[raresFromRareMap;$env[caughtRare]];
            $if[$or[$env[userProfile;1hl;settings;infiniteCommons];$env[rareMap;category]!=common];
              ${rares()}
            ;
              $switch[$env[caughtRare];
                $case[markhor;          $let[com;mar]     $let[rareName;Markhor]            ]
                $case[mar;              $let[com;mar]     $let[rareName;Markhor]            ]
                $case[chocotoucan;      $let[com;cht]     $let[rareName;Choco Toucan]       ]
                $case[cht;              $let[com;cht]     $let[rareName;Choco Toucan]       ]
                $case[keelbilledtoucan; $let[com;kbt]     $let[rareName;Keel-Billed Toucan] ]
                $case[kbt;              $let[com;kbt]     $let[rareName;Keel-Billed Toucan] ]
              ]
              $let[common;$getuservar[1h$get[com]]]
              $if[$get[common]<3;
                ${rares()}
                $setuservar[1h$get[com];$math[$get[common] + 1]]
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
    ${reset()}
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
    $onlyIf[$getuservar[1hstarted;$get[id]];${errorEmbed()} $description[## $if[$get[id]!=$authorID;__$username[$get[id]]__ doesn't;You don't] have an active challenge!]]
    ${normalEmbed()}
    ${pts()}
    ${time()}
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
  name: "1hlsettings",
  aliases: ["1hlset"],
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
  name: "1hlhistory",
  aliases: ["1hlhis"],
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
    $if[$arrayAt[history;0]==;
      $description[# No history]
      $getGlobalVar[author]
      $color[$getGlobalVar[luckyColor]]
      $sendMessage[$channelID]
      $stop
    ]
    ${historyEmbed()}
    $let[msg;$sendMessage[$channelID;;true]]

    ${historyTimeout()}
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["button", "modal"],
  description: "history buttons",
  code: `
    $textSplit[$customID;-]
    $onlyIf[$splitText[1]==$authorID;$callFunction[notYourBTN]]
    $let[butid;$splitText[0]]

    $if[$get[butid]==historyPages;
      $modal[customPage-$authorid;Custom page]
      $addTextInput[page-$authorid;Enter page;Short;true;;;1;5]
      $showModal
      $stop
    ]

    $onlyIf[$includes[$get[butid];historyPageLeft;historyPageRight;customPage]]

    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $jsonLoad[history;$env[userProfile;1hl;history]]
    $jsonLoad[history;$arrayReverse[history]]

    $let[msg;$messageID]
    $let[page;$splitText[2]]

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

    $!stopTimeout[1HLHISTORY-$authorID]

    ${historyEmbed()}
    $!editMessage[$channelID;$get[msg]]

    $deferUpdate
    ${historyTimeout()}
  `
}]

function historyTimeout () {
  return `
    $setTimeout[
      $!disableButtonsOf[$channelID;$get[msg]]
    ;1m;1HLHISTORY-$authorID]`
}

function historyEmbed() {
  return `
    $let[index;$math[$get[page] - 1]]

    $getGlobalVar[author]
    $color[$getGlobalVar[luckyColor]]
    
    $addField[Total Points:;\`$env[history;$get[index];points]\`]
    $addField[Total Rares:;\`$env[history;$get[index];rares]\`]
    $addField[Received rares list:;$codeBlock[$advancedReplace[$trimLines[$env[history;$get[index];raresList]];{;;};;";;,;];JSON]]
    $footer[$env[history;$get[index];time]]

    $if[$arrayLength[history]>1;
      $addActionRow
      $addButton[historyPageLeft-$authorID-$get[page];;Primary;⬅️]
      $addButton[historyPages-$authorID;Page $get[page]/$arrayLength[history];Primary;🔎]
      $addButton[historyPageRight-$authorID-$get[page];;Primary;➡️]
    ]
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

function time () {
  return `
    $let[time;$getuservar[1htime]]
    $addField[Time passed:;\`$if[$get[time]>=3600;EXTRA 10 SECONDS;$parseDigital[$get[time]000]]\`]
  `
}

function pts () {
  return `
    ${total()}
    $let[totalRares;$getuservar[1htotalRares]]
    $if[$env[userProfile;1hl;settings;hideRares];
      $addField[Total rares:;||$get[totalRares]||;true]
    ;
      $addField[Total rares:;$get[totalRares];true]
    ]
    $let[list;$advancedReplace[$trimLines[$getuservar[1hallRaresList]];{;;};;";;,;]]
    $if[$get[list]==;$let[list;none]]
    $addField[All received rares list:;\n$codeBlock[$get[list];JSON]]
  `
}

function reset() {
  return `
    $!stopInterval[1HLUCK-$authorID]
    $deleteUserVar[1hstarted]
    $deleteUserVar[1hallRaresList]
    $deleteUserVar[1htime]
    $deleteUserVar[1hpoints]
    $deleteUserVar[1htotalRares]
    $deleteUserVar[1hpaused]
    $deleteUserVar[1hmar]
    $deleteUserVar[1hkbt]
    $deleteUserVar[1hcht]
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

function timeLeft (num, time) { return `$sendMessage[$channelID;# <@$authorID> ${num}${time} left!]` }

function total () {
  return `
    $let[1hlp;$getuservar[1hpoints]]
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