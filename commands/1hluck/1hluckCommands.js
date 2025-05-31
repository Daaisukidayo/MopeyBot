module.exports = [
{
  name: "start",
  type: "messageCreate",
  code: `
    $reply
    $callFunction[checking;]
    $onlyIf[$getUserVar[1hstarted;$authorID;false]==false;${errorEmbed()} $description[# :x: Error!\n## You already have an active challenge!]]
    
    ${normalEmbed()}
    $description[# 1 hour luck challenge has begun!]
    $setUserVar[1htime;0]
    $setUserVar[1hstarted;true]
    $setUserVar[1hpoints;0]
    $setUserVar[1hpaused;false]
    $setUserVar[kbt;0]
    $setUserVar[cht;0]
    $setUserVar[mar;0]
    $setUserVar[1htotalRares;0]
    $setUserVar[1hallRaresList;{}]
    
    ${interval()}
  `
},{
  name: "time",
  type: "messageCreate",
  code: `
    $reply
    $callFunction[checking;]
    $onlyIf[$getUserVar[1hstarted];${errorEmbed()} $description[# :x: Error!\n## You don't have an active challenge!]]
    ${normalEmbed()}  
    $if[$getUserVar[1hpaused];$description[## Status: Paused]]
    ${time()}
  `
},{
  name: "pause",
  type: "messageCreate",
  code: `
    $reply
    $callFunction[checking;]
    $onlyIf[$getUserVar[1hstarted];${errorEmbed()} $description[# :x: Error!\n## You don't have an active challenge!]]
    $onlyIf[$getUserVar[1hpaused]==false;${errorEmbed()} $description[# :x: Error!\n## You already have paused the challenge!]]
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
    $onlyIf[$getUserVar[1hstarted];${errorEmbed()} $description[# :x: Error!\n## You don't have an active challenge!]]
    $onlyIf[$getUserVar[1hpaused];${errorEmbed()} $description[# :x: Error!\n## You haven't paused your challenge!]]
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
    $onlyIf[$getUserVar[1hstarted]]
    $onlyIf[$startsWith[$messageContent;$getGuildVar[prefix]]==false]
    $onlyIf[$getUserVar[1hpaused]==false]
    
    $let[points;0]
    
    $arrayLoad[caught; ;]
    $arrayLoad[allRares]
    $jsonLoad[raresMap;$getGlobalVar[raresMap]]
    $arrayLoad[caughtRares; ;$toLowerCase[$message]]
    $jsonLoad[SNORA;$getGlobalVar[SNORA]]
    $jsonLoad[allRaresList;$getUserVar[1hallRaresList]]
    
    $arrayForEach[raresMap;rareMap;
      $jsonLoad[allRaresFromCat;$env[rareMap;rares]]
      $arrayConcat[allRares;allRares;allRaresFromCat]
    ]
    
    $c[scanning rares...]
    
    $arrayForEach[caughtRares;caughtRare;
      $if[$arrayIncludes[allRares;$env[caughtRare]];
        $arrayForEach[raresMap;rareMap;
          $jsonLoad[raresFromOBJ;$env[rareMap;rares]]
          $if[$arrayIncludes[raresFromOBJ;$env[caughtRare]];
            $if[$env[rareMap;category]!=common;
              ${rares()}
            ;
              $switch[$env[caughtRare];
                $case[markhor;$let[com;mar]]
                $case[chocotoucan;$let[com;cht]]
                $case[keelbilledtoucan;$let[com;kbt]]
                $case[mar;$let[com;mar]]
                $case[cht;$let[com;cht]]
                $case[kbt;$let[com;kbt]]
              ]
              $if[$getUserVar[$get[com]]<3;
                ${rares()}
                $setUserVar[$get[com];$math[$getUserVar[$get[com]] + 1]]
                $if[$getUserVar[$get[com]]==3;
                  $let[cont;# <@$authorID> You got all $switch[$get[com];$case[mar;Markhor]$case[cht;Choco Toucan]$case[kbt;Keel-Billed Toucan]]s!]
                ]
              ;
                $arrayPush[caught;+0]
              ]
            ]
          ]
        ]
      ;
        $arrayPush[caught;+0]
      ]
    ]
    
    $c[Message sending...]
    
    $if[$get[points]>0;
      $let[pts;]
      $arrayForEach[caught;pts;$let[pts;$get[pts]$env[pts]]]
      $setUserVar[1hpoints;$math[$getUserVar[1hpoints] + $get[points]]]
      $reply
      $sendMessage[$channelID;
        $get[cont]
        ${normalEmbed()}
        $description[# $get[pts] = $get[points]]
        ${commons()}
        ${total()}
        ${time()}
      ]
    ]
  `
},{
  name: "end",
  type: "messageCreate",
  code: `
    $reply
    $callFunction[checking;]
    $onlyIf[$getUserVar[1hstarted];${errorEmbed()} $description[# :x: Error!\n## You don't have an active challenge!]]
    # You ended your challenge!
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
    $callFunction[checking;]
    $onlyIf[$getUserVar[1hstarted];${errorEmbed()} $description[# :x: Error!\n## You don't have an active challenge!]]
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
    $callFunction[checking;]
    $onlyIf[$getUserVar[1hstarted];${errorEmbed()} $description[# :x: Error!\n## You don't have an active challenge!]]
    $onlyIf[$and[$isNumber[$message];$message>=0];${errorEmbed()} $description[# :x: Error!\n## Only a number greater than or equal to 0 is allowed!]]
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
    $callFunction[checking;]
    $onlyIf[$getUserVar[1hstarted];${errorEmbed()} $description[# :x: Error!\n## You don't have an active challenge!]]
    $onlyIf[$or[$and[$isNumber[$message];$message>=0];$checkContains[$message;:]];# :x: Error!\n## Only seconds greater than or equal to 0 or time format "HH:MM:SS" is allowed!]
    
    $if[$checkContains[$message;:];
      $setUserVar[1htime;$round[$math[$unparseDigital[$message] / 1000]]]
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
    $callFunction[checking;]
    $onlyIf[$getUserVar[1hstarted];${errorEmbed()} $description[# :x: Error!\n## You don't have an active challenge!]]
    
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
    $let[usage;# :x: Error!\n## Usage: \`$getGuildVar[prefix]editlist [rare\\] {add/a/+ || remove/r/-} <amount>\`]
    
    $onlyIf[$get[arg1]!=;${errorEmbed()} $description[$get[usage]]]
    $onlyIf[$arrayIncludes[allRares;$get[arg1]];${errorEmbed()} $description[# :x: Error!\n## The rare «\`$get[arg1]\`» does not exist!]]
    $onlyIf[$or[$get[arg2]==+;$get[arg2]==-];${errorEmbed()} $description[$get[usage]]]
    $onlyIf[$or[$and[$get[arg3]==all;$get[arg2]==-];$isNumber[$get[arg3]];$get[arg3]>0];${errorEmbed()} $description[# :x: Error!\n### Only a number greater than 0 or argument «\`all\`» (if removing) is allowed!]]
    
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
}]


function interval () {
  return `
    $setInterval[
      $setUserVar[1htime;$sum[$getUserVar[1htime];1]] 

      $switch[$getUserVar[1htime];
        $case[1800;   ${timeLeft(30, `m`)}  ]
        $case[3300;   ${timeLeft(5, `m`)}   ]
        $case[3540;   ${timeLeft(1, `m`)}   ]
        $case[3595;   ${timeLeft(5, `s`)}   ]
        $case[3596;   ${timeLeft(4, `s`)}   ]
        $case[3597;   ${timeLeft(3, `s`)}   ]
        $case[3598;   ${timeLeft(2, `s`)}   ]
        $case[3599;   ${timeLeft(1, `s`)}   ] 
        $case[3600;   $sendMessage[$channelID;# <@$authorID> EXTRA 5 SECONDS!\n-# In case you didn't manage to finish writing]] 
        $case[3605;   $sendMessage[$channelID;# <@$authorID> 1 Hour Luck Ended! ${normalEmbed()} ${pts()}] ${reset()}] 
      ]
    ;1s;1HLUCK-$authorID]
  `
}

// function vars () {
// return `
// $let[remaining;$math[3600 - $getUserVar[1htime]]]
// $let[hour;0$floor[$math[$get[remaining] / 3600]]]
// $let[minute;$floor[$math[($get[remaining] % 3600) / 60]]]
// $if[$charCount[$get[minute]]==1; $let[minute;0$get[minute]] ]
// $let[second;$floor[$math[$get[remaining] % 60]]]
// $if[$charCount[$get[second]]==1; $let[second;0$get[second]] ]
// `}

function time () {
  return `
    $addField[Time passed:;\`$if[$getUserVar[1htime]>=3600;EXTRA 5 SECONDS;$parseDigital[$getUserVar[1htime]000]]\`]
  `
}

function pts () {
  return `
    ${total()}
    $addField[Total rares:;||$getUserVar[1htotalRares]||;true]
    $addField[All received rares list:;\n$codeBlock[$advancedReplace[$trimLines[$getUserVar[1hallRaresList]];{;;};;";;,;];JSON]]
  `
}

function reset() {
  return `
    $!stopInterval[1HLUCK-$authorID]
    $deleteUserVar[1hstarted]
    $deleteUserVar[1hallRaresList]
    $deleteUserVar[1htime]
    $deleteUserVar[1hpoints]
    $deleteUserVar[1hpaused]
    $deleteUserVar[mar]
    $deleteUserVar[kbt]
    $deleteUserVar[cht]
  `
}

function rares() {
  return `
    $letSum[points;$env[rareMap;points]]
    $arrayPush[caught;+$env[rareMap;points]]
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
    $if[$getUserVar[mar]<3;
      $addField[MAR:;\`$getUserVar[mar]\`/3;true]
    ]
    $if[$getUserVar[cht]<3;
      $addField[CHT:;\`$getUserVar[cht]\`/3;true]
    ]
    $if[$getUserVar[kbt]<3;
      $addField[KBT:;\`$getUserVar[kbt]\`/3;true]
    ]
  `
}

function timeLeft (num, time) { return `$sendMessage[$channelID;# <@$authorID> ${num}${time} left!]` }

function total () {
  return `
    $addField[Total points:;||$getUserVar[1hpoints]||]
  `
}

function errorEmbed () {
  return `
    $getGlobalVar[author]
    $color[$getGlobalVar[errorColor]]
  `
}

function normalEmbed () {
  return `
    $getGlobalVar[author]
    $color[$getGlobalVar[luckyColor]]
  `
}