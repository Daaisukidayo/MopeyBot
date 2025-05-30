module.exports = [
{
  name: "start",
  type: "messageCreate",
  code: `
    $reply
    $callFunction[checking;]
    $onlyIf[$getUserVar[1hstarted;$authorID;false]==false;# You already have an active challenge!]

    # 1 hour luck challenge has begun!
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
    $onlyIf[$getUserVar[1hstarted];# You dont have an active challenge!]    
    $if[$getUserVar[1hpaused];# Status: Paused]
    ${time()}
  `
},{

  name: "pause",
  type: "messageCreate",
  code: `
    $reply
    $callFunction[checking;]
    $onlyIf[$getUserVar[1hstarted];# You dont have an active challenge!]
    $onlyIf[$getUserVar[1hpaused]==false;# You already have paused the challenge!]
    $!stopInterval[1HLUCK-$authorID]
    $setUserVar[1hpaused;true]
    # Paused!
    ${time()}
  `
},{
  name: "resume",
  aliases: ["continue", "res"],
  type: "messageCreate",
  code: `
    $reply
    $onlyIf[$getUserVar[1hstarted];# You dont have an active challenge!]
    $onlyIf[$getUserVar[1hpaused];# You haven't paused your challenge!]
    $setUserVar[1hpaused;false]
    # Continued!
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
    $let[typo;false]

    $arrayLoad[caught; ;]
    $arrayLoad[allRares]
    $jsonLoad[raresMap;$getGlobalVar[raresMap]]
    $arrayLoad[caughtRares; ;$toLowerCase[$message]]
    $jsonLoad[SNORA;$getGlobalVar[SNORA]]
    $jsonLoad[allRaresList;$getUserVar[1hallRaresList]]

    $arrayForEach[raresMap;rareMap;
      $jsonLoad[rareOBJ;$env[rareMap]]
      $jsonLoad[allRaresFromCat;$env[rareOBJ;rares]]
      $arrayConcat[allRares;allRares;allRaresFromCat]
    ]


    $arrayForEach[caughtRares;caughtRare;
      $if[$arrayIncludes[allRares;$env[caughtRare]];
        $arrayForEach[raresMap;rareMap;
          $jsonLoad[rareOBJ;$env[rareMap]]
          $jsonLoad[raresFromOBJ;$env[rareOBJ;rares]]

          $if[$arrayIncludes[raresFromOBJ;$env[caughtRare]];
            $if[$env[rareOBJ;category]!=common;
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
                  $sendMessage[$channelID;# <@$authorID> You got all $switch[$get[com];$case[mar;Markhor]$case[cht;Choco Toucan]$case[kbt;Keel-Billed Toucan]]s!]
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

    
    $if[$get[points]>0;
      $let[pts;]
      $arrayForEach[caught;pts;$let[pts;$get[pts]$env[pts] ]]
      $reply[$channelID;$messageID;true]
      $setUserVar[1hpoints;$math[$getUserVar[1hpoints] + $get[points]]]
      $trimLines[# $get[pts] = $get[points]
      ## Total: ||$getUserVar[1hpoints]||
      ${commons("-#")}
      ${time("-#")}]
    ]
  `
},{
  name: "end",
  type: "messageCreate",
  code: `
    $reply
    $callFunction[checking;]
    $onlyIf[$getUserVar[1hstarted];# You dont have an active challenge!]
    # You ended your challenge!
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
    $onlyIf[$getUserVar[1hstarted];# You dont have an active challenge!]
    ${pts()}
  `
},{
  name: "editpoints",
  aliases: ["epts", "editscore", "escr"],
  type: "messageCreate",
  code: `
    $reply
    $callFunction[checking;]
    $onlyIf[$getUserVar[1hstarted];# You dont have an active challenge!]
    $onlyIf[$and[$isNumber[$message];$message>=0];## Only a number greater than or equal to 0 is allowed!]
    $setUserVar[1hpoints;$message]
    ${pts()}
  `
},{
  name: "edittime",
  aliases: ["etime", "et"],
  type: "messageCreate",
  code: `
    $reply
    $callFunction[checking;]
    $onlyIf[$getUserVar[1hstarted];# You dont have an active challenge!]
    $onlyIf[$or[$and[$isNumber[$message];$message>=0];$checkContains[$message;:]];## Only seconds greater than or equal to 0 or time format "HH:MM:SS" is allowed!]

    $if[$checkContains[$message;:];
      $setUserVar[1htime;$round[$math[$unparseDigital[$message] / 1000]]]
    ;
      $setUserVar[1htime;$message]
    ]
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
      $case[3600;   $sendMessage[$channelID;# <@$authorID> EXTRA 5 SECONDS!!\n-# In case you didn't manage to finish writing]    ] 
      $case[3605;   $sendMessage[$channelID;# <@$authorID> 1 Hour Luck Ended!\n${pts()}]  ${reset()}] 
    ]
;1s;1HLUCK-$authorID]`
}

function vars () {
return `
$let[remaining;$math[3600 - $getUserVar[1htime]]]
$let[hour;0$floor[$math[$get[remaining] / 3600]]]
$let[minute;$floor[$math[($get[remaining] % 3600) / 60]]]
$if[$charCount[$get[minute]]==1; $let[minute;0$get[minute]] ]
$let[second;$floor[$math[$get[remaining] % 60]]]
$if[$charCount[$get[second]]==1; $let[second;0$get[second]] ]
`}

function time (beginning = "##") {
return `
${beginning} Time passed: \`$if[$getUserVar[1htime]>=3600;EXTRA 5 SECONDS;$parseDigital[$getUserVar[1htime]000]]\``
}

function pts () {
return `
# Points: ||$getUserVar[1hpoints]||
## Total rares: ||$getUserVar[1htotalRares]||
## All received rares list: \n$codeBlock[$advancedReplace[$trimLines[$getUserVar[1hallRaresList]];{;;};;";;,;];JSON]
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
$deleteUserVar[cht]`
}

function rares() {
return `
$letSum[points;$env[rareOBJ;points]]
$arrayPush[caught;+$env[rareOBJ;points]]
$setUserVar[1htotalRares;$math[$getUserVar[1htotalRares] + 1]]

$if[$env[allRaresList;$env[SNORA;$env[caughtRare]]]==;
  $!jsonSet[allRaresList;$env[SNORA;$env[caughtRare]];1]
;
  $!jsonSet[allRaresList;$env[SNORA;$env[caughtRare]];$math[$env[allRaresList;$env[SNORA;$env[caughtRare]]] + 1]]
]

$setUserVar[1hallRaresList;$env[allRaresList]]
`
}

function commons (beginning = "##") {
return `
$if[$getUserVar[mar]<3;\n${beginning} MAR: \`$getUserVar[mar]\`/3]$if[$getUserVar[cht]<3;\n${beginning} CHT: \`$getUserVar[cht]\`/3]$if[$getUserVar[kbt]<3;\n${beginning} KBT: \`$getUserVar[kbt]\`/3]`
}

function timeLeft (num, time) {
  return `$sendMessage[$channelID;# <@$authorID> ${num}${time} left!]`
}