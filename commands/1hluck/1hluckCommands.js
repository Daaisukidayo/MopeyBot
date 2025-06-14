module.exports = [
{
  name: "start",
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $onlyIf[$env[userProfile;1hl;1hstarted]==false;${errorEmbed()} $description[## You already have an active challenge!]]
    
    $!jsonSet[userProfile;1hl;1hstarted;true]
    ${normalEmbed()}
    $description[# 1 hour luck challenge has begun!]
    ${interval()}
    $setUserVar[userProfile;$env[userProfile]]
  `
},{
  name: "time",
  type: "messageCreate",
  code: `
    $reply
    ${checkChall()}
    ${normalEmbed()}  
    $if[$env[userProfile;1hl;1hpaused];$description[## Status: Paused]]
    ${time()}
  `
},{
  name: "pause",
  type: "messageCreate",
  code: `
    $reply
    ${checkChall()}
    $onlyIf[$env[userProfile;1hl;1hpaused]==false;${errorEmbed()} $description[## You already have paused the challenge!]]
    $!stopInterval[1HLUCK-$authorID]
    $!jsonSet[userProfile;1hl;1hpaused;true]
    ${normalEmbed()}
    $description[# Paused!]
    ${total()} 
    ${time()}
    $setUserVar[userProfile;$env[userProfile]]
  `
},{
  name: "resume",
  aliases: ["continue", "res"],
  type: "messageCreate",
  code: `
    $reply
    ${checkChall()}
    $onlyIf[$env[userProfile;1hl;1hpaused];${errorEmbed()} $description[## You haven't paused your challenge!]]
    $!jsonSet[userProfile;1hl;1hpaused;false]
    ${normalEmbed()}
    $description[# Continued!]
    ${total()}
    ${time()}
    ${interval()}
    $setUserVar[userProfile;$env[userProfile]]
  `
},{
  unprefixed: true,
  type: "messageCreate",
  code: `
    $reply 
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $onlyIf[$env[userProfile;1hl;1hstarted]]
    $onlyIf[$startsWith[$messageContent;$getGuildVar[prefix]]==false]

    $arrayLoad[allRares]
    $jsonLoad[raresMap;$getGlobalVar[raresMap]]
    $arrayLoad[caughtRares; ;$toLowerCase[$message]]
    $jsonLoad[SNORA;$getGlobalVar[SNORA]]

    
    $arrayForEach[raresMap;rareMap;
      $jsonLoad[allRaresFromCat;$env[rareMap;rares]]
      $arrayConcat[allRares;allRares;allRaresFromCat]
    ]
        
    $arrayForEach[caughtRares;caughtRare;
      $if[$arrayIncludes[allRares;$env[caughtRare]];
        $onlyIf[$env[userProfile;1hl;1hpaused]==false;${errorEmbed()} $description[## You are on pause!]]
      ]
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
        $arrayForEach[raresMap;rareMap;
          $jsonLoad[raresFromRareMap;$env[rareMap;rares]]
          $if[$arrayIncludes[raresFromRareMap;$env[caughtRare]];
            $if[$or[$env[userProfile;1hl;settings;infiniteCommons];$env[rareMap;category]!=common];
              ${rares()}
            ;
              $switch[$env[caughtRare];
                $case[markhor;          $let[com;markhor]     $let[rareName;Markhor]            ]
                $case[mar;              $let[com;markhor]     $let[rareName;Markhor]            ]
                $case[chocotoucan;      $let[com;choco]       $let[rareName;Choco Toucan]       ]
                $case[cht;              $let[com;choco]       $let[rareName;Choco Toucan]       ]
                $case[keelbilledtoucan; $let[com;keelBilled]  $let[rareName;Keel-Billed Toucan] ]
                $case[kbt;              $let[com;keelBilled]  $let[rareName;Keel-Billed Toucan] ]
              ]
              $let[common;$env[userProfile;1hl;commons;$get[com]]]
              $if[$get[common]<3;
                ${rares()}
                $!jsonSet[userProfile;1hl;commons;$get[com];$math[$get[common] + 1]]
                $if[$get[common]==3;
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
      $!jsonSet[userProfile;1hl;1hpoints;$math[$env[userProfile;1hl;1hpoints] + $get[points]]]

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
    # You ended your challenge!
    ${normalEmbed()}
    ${pts()}
    ${reset()}
    $setUserVar[userProfile;$env[userProfile]]
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

    $onlyIf[$env[userProfile;1hl;1hstarted];${errorEmbed()} $description[## $if[$get[id]!=$authorID;__$username[$get[id]]__ doesn't;You don't] have an active challenge!]]
    ${normalEmbed()}
    ${pts()}
    ${time()}
  `
},{
  name: "editpoints",
  aliases: ["epts", "editscore", "escr"],
  type: "messageCreate",
  code: `
    $reply
    ${checkChall()}
    $onlyIf[$and[$isNumber[$message];$message>=0];${errorEmbed()} $description[## Only a number greater than or equal to 0 is allowed!]]
    $!jsonSet[userProfile;1hl;1hpoints;$message]
    ${normalEmbed()}
    ${pts()}
    $setUserVar[userProfile;$env[userProfile]]
  `
},{
  name: "edittime",
  aliases: ["etime", "et"],
  type: "messageCreate",
  code: `
    $reply
    ${checkChall()}
    $onlyIf[$or[$and[$isNumber[$message];$message>=0;$message<3600];$checkContains[$message;:]];${errorEmbed()} $description[## Only seconds greater than/equal to 0, lower than 3600, or time format "MM:SS" is allowed!]]
    
    $if[$checkContains[$message;:];
      $!jsonSet[userProfile;1hl;1htime;$round[$math[$unparseDigital[00:$message] / 1000]]]
    ;
      $!jsonSet[userProfile;1hl;1htime;$message]
    ]
    ${normalEmbed()}
    ${total()}
    ${time()}
    $setUserVar[userProfile;$env[userProfile]]
  `
},{
  name: "editlist",
  aliases: ["elist", "el"],
  type: "messageCreate",
  code: `
    $reply
    ${checkChall()}
    
    $jsonLoad[allRaresList;$env[userProfile;1hl;1hraresList]]
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
    $!jsonSet[userProfile;1hl;1hraresList;$env[allRaresList]]
    
    $!jsonSet[userProfile;1hl;1htotalRares;0]
    $!jsonSet[userProfile;1hl;1hpoints;0]
    
    $jsonLoad[allRaresListEntries;$jsonEntries[allRaresList]]
    
    $if[$arrayAt[allRaresListEntries;0]==;;
      $arrayForEach[allRaresListEntries;entry;
        $!jsonSet[userProfile;1hl;1htotalRares;$math[$env[userProfile;1hl;1htotalRares] + $env[entry;1]]]
        
        $arrayForEach[raresMap;rareMap;
          $jsonLoad[rares;$env[rareMap;rares]]
          $if[$arrayIncludes[rares;$arrayAt[snoraKeys;$arrayIndexOf[allRaresNames;$env[entry;0]]]];
            $!jsonSet[userProfile;1hl;1hpoints;$math[$env[userProfile;1hl;1hpoints] + $env[rareMap;points] * $env[entry;1]]]
          ]
        ]
      ]
    ]

    ${normalEmbed()}
    ${pts()}
    ${time()}
    $setUserVar[userProfile;$env[userProfile]]
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
    $onlyIf[$includes[$splitText[0];hidePoints;hideRares;infiniteCommons]]
    $jsonLoad[userProfile;$getUserVar[userProfile]]

    $let[sett;$env[userProfile;1hl;settings;$splitText[0]]]
    $if[$get[sett];
      $!jsonSet[userProfile;1hl;settings;$splitText[0];false]
    ;
      $!jsonSet[userProfile;1hl;settings;$splitText[0];true]
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
  allowedInteractionTypes: ["button"],
  description: "history buttons",
  code: `
    $textSplit[$customID;-]
    $onlyIf[$splitText[1]==$authorID;$callFunction[notYourBTN]]
    $let[butid;$splitText[0]]
    $let[page;$splitText[2]]
    $onlyIf[$includes[$get[butid];historyPageLeft;historyPageRight]]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $jsonLoad[history;$env[userProfile;1hl;history]]
    $jsonLoad[history;$arrayReverse[history]]


    $if[$get[butid]==historyPageLeft;
      $letSub[page;1]
      $if[$get[page]<=0;
        $let[page;$arrayLength[history]]
      ]
    ;
      $letSum[page;1]
      $if[$get[page]>$arrayLength[history];
        $let[page;1]
      ]
    ]

    $!stopTimeout[1HLHISTORY-$authorID]

    ${historyEmbed()}
    $!editMessage[$channelID;$messageID]

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
      $addButton[pages;Page $get[page]/$arrayLength[history];Primary;;true]
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
    $onlyIf[$env[userProfile;1hl;1hstarted];${errorEmbed()} $description[## You don't have an active challenge!]]
  `
}

function interval () {
  return `
    $jsonLoad[history;$env[userProfile;1hl;history]]
    $setInterval[
      $jsonLoad[userProfile;$getUserVar[userProfile]]
      $!jsonSet[userProfile;1hl;1htime;$math[$env[userProfile;1hl;1htime] + 1]]
      $switch[$env[userProfile;1hl;1htime];
        $case[1800;   ${timeLeft(30, `m`)}  ]
        $case[3300;   ${timeLeft(5, `m`)}   ]
        $case[3540;   ${timeLeft(1, `m`)}   ]
        $case[3595;   ${timeLeft(5, `s`)}   ]
        $case[3596;   ${timeLeft(4, `s`)}   ]
        $case[3597;   ${timeLeft(3, `s`)}   ]
        $case[3598;   ${timeLeft(2, `s`)}   ]
        $case[3599;   ${timeLeft(1, `s`)}   ] 
        $case[3600;   $sendMessage[$channelID;# <@$authorID> EXTRA 10 SECONDS!\n-# In case you didn't manage to finish writing]] 
        $case[3610;   $sendMessage[$channelID;# <@$authorID> 1 Hour Luck Ended! ${normalEmbed()} ${pts()}]
          $timezone[$env[userProfile;timezone]]
          $arrayPushJSON[history;{
            "points": $env[userProfile;1hl;1hpoints],
            "rares": $env[userProfile;1hl;1htotalRares],
            "time": "$parseDate[$getTimestamp;Locale]",
            "raresList": $env[userProfile;1hl;1hraresList]
          }]
          $!jsonSet[userProfile;1hl;history;$env[history]]
          ${reset()}
        ] 
      ]
      $setUserVar[userProfile;$env[userProfile]]
    ;1s;1HLUCK-$authorID]
  `
}

function time () {
  return `
    $let[time;$env[userProfile;1hl;1htime]]
    $addField[Time passed:;\`$if[$get[time]>=3600;EXTRA 10 SECONDS;$parseDigital[$get[time]000]]\`]
  `
}

function pts () {
  return `
    ${total()}
    $let[totalRares;$env[userProfile;1hl;1htotalRares]]
    $if[$env[userProfile;1hl;settings;hideRares];
      $addField[Total rares:;||$get[totalRares]||;true]
    ;
      $addField[Total rares:;$get[totalRares];true]
    ]
    $let[list;$advancedReplace[$trimLines[$env[userProfile;1hl;1hraresList]];{;;};;";;,;]]
    $if[$get[list]==;$let[list;none]]
    $addField[All received rares list:;\n$codeBlock[$get[list];JSON]]
  `
}

function reset() {
  return `
    $!stopInterval[1HLUCK-$authorID]
    $!jsonSet[userProfile;1hl;1hstarted;false]
    $!jsonSet[userProfile;1hl;1hraresList;{}]
    $!jsonSet[userProfile;1hl;1htime;0]
    $!jsonSet[userProfile;1hl;1hpoints;0]
    $!jsonSet[userProfile;1hl;1htotalRares;0]
    $!jsonSet[userProfile;1hl;1hpaused;false]
    $!jsonSet[userProfile;1hl;commons;markhor;0]
    $!jsonSet[userProfile;1hl;commons;keelBilled;0]
    $!jsonSet[userProfile;1hl;commons;choco;0]
  `
}

function rares() {
  return `
    $letSum[points;$env[rareMap;points]]
    $arrayPush[caught;$env[rareMap;points]]
    $!jsonSet[userProfile;1hl;1htotalRares;$math[$env[userProfile;1hl;1htotalRares] + 1]]
    
    $if[$env[userProfile;1hl;1hraresList;$env[SNORA;$env[caughtRare]]]==;
      $!jsonSet[userProfile;1hl;1hraresList;$env[SNORA;$env[caughtRare]];1]
    ;
      $!jsonSet[userProfile;1hl;1hraresList;$env[SNORA;$env[caughtRare]];$math[$env[userProfile;1hl;1hraresList;$env[SNORA;$env[caughtRare]]] + 1]]
    ]
  `
}

function commons () { 
  return `
    $if[$env[userProfile;1hl;settings;infiniteCommons];;
      $if[$env[userProfile;1hl;commons;markhor]<3;
        $addField[MAR:;\`$env[userProfile;1hl;commons;markhor]/3\`;true]
      ]
      $if[$env[userProfile;1hl;commons;choco]<3;
        $addField[CHT:;\`$env[userProfile;1hl;commons;choco]/3\`;true]
      ]
      $if[$env[userProfile;1hl;commons;keelBilled]<3;
        $addField[KBT:;\`$env[userProfile;1hl;commons;keelBilled]/3\`;true]
      ]
    ]
  `
}

function timeLeft (num, time) { return `$sendMessage[$channelID;# <@$authorID> ${num}${time} left!]` }

function total () {
  return `
    $let[1hlp;$env[userProfile;1hl;1hpoints]]
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