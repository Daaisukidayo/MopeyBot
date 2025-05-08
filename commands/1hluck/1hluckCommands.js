module.exports = [{
  name: "start",
  type: "messageCreate",
  code: `
    $reply
    $onlyIf[$getUserVar[1hstarted;$authorID;false]==false;# You already have an active challenge!]

    # 1 hour luck challenge has begun!
    $setUserVar[1htime;0]
    $setUserVar[1hstarted;true]
    $setUserVar[1hpoints;0]
    $setUserVar[1hpaused;false]
    $setUserVar[kbt;0]
    $setUserVar[cht;0]
    $setUserVar[mh;0]
    $setUserVar[1htotalRares;0]
    $setUserVar[1hallRaresList;{}]

    ${interval()}
  `
},{
  name: "time",
  type: "messageCreate",
  code: `
    $reply
    $onlyIf[$getUserVar[1hstarted];# You dont have an active challenge!]
    
    ${vars()}
    
    ${time()}
    $if[$getUserVar[1hpaused];# Status: Paused]
  `
},{

  name: "pause",
  type: "messageCreate",
  code: `
    $reply
    $onlyIf[$getUserVar[1hstarted];# You dont have an active challenge!]
    $!stopInterval[1HLUCK]
    $setUserVar[1hpaused;true]
    ${vars()}

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
    $setUserVar[1hpaused;false]

    ${vars()}

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

    $let[common;1]
    $let[uncommon;2]
    $let[rare;3]
    $let[epic;5]
    $let[insane;8]
    $let[legendary;15]
    $let[extreme;20]
    $let[mythic;30]
    $let[godly;50]

    $arrayLoad[rares; ;$toLowerCase[$message]]
    $arrayLoad[unknown]

    $arrayLoad[common; ;cht kbt mh]
    $arrayLoad[uncommon; ;doe bm jag leo ft yp ln]
    $arrayLoad[rare; ;wd pp mad gph mm mf bp lc bml]
    $arrayLoad[epic; ;ja gir wt wl wln wlc bg sbf ssm ssg]
    $arrayLoad[insane; ;sp md bl bln blc pr ge wr ay]
    $arrayLoad[legendary; ;lt dp br wg]
    $arrayLoad[extreme; ;wgf]
    $arrayLoad[mythic; ;lbf lsm lsg kd]
    $arrayLoad[godly; ;sm hht arg shh he gse]

    $arrayLoad[caught; ;]

    $arrayForEach[rares;an;
      $if[$arrayIncludes[common;$env[an]];
        $arrayForEach[common;com;
          $if[$env[an]==$env[com]; 
            $if[$getUserVar[$env[com]]<3; 
              ${rares("common")}
              $setUserVar[$env[com];$math[$getUserVar[$env[com]] + 1]]
              $if[$getUserVar[$env[com]]==3;
                $sendMessage[$channelID;# <@$authorID> You got all $switch[$env[com];$case[mh;Markhor]$case[cht;Choco Toucan]$case[kbt;Keel-Billed Toucan]]s!]
              ]
            ;
              $arrayPush[caught;+0]
            ]
          ]
        ]
      ;
        $if[$arrayIncludes[uncommon;$env[an]];
          ${rares("uncommon")}
        ;
          $if[$arrayIncludes[rare;$env[an]];
            ${rares("rare")}
          ;
            $if[$arrayIncludes[epic;$env[an]];
              ${rares("epic")}
            ;
              $if[$arrayIncludes[insane;$env[an]];
                ${rares("insane")}
              ;
                $if[$arrayIncludes[legendary;$env[an]];
                  ${rares("legendary")}
                ;
                  $if[$arrayIncludes[extreme;$env[an]];
                    ${rares("extreme")}
                  ;
                    $if[$arrayIncludes[mythic;$env[an]];
                      ${rares("mythic")}
                    ;
                      $if[$arrayIncludes[godly;$env[an]];
                        ${rares("godly")}
                      ;
                        $arrayPush[caught;+0]
                      ]
                    ]
                  ]
                ]
              ]
            ]
          ]
        ]
      ]
    ]

    
    $if[$get[points]>0;
      $let[pts;]
      $arrayForEach[caught;pts;$let[pts;$get[pts]$env[pts] ]]
      $reply[$channelID;$messageID;true]
      $setUserVar[1hpoints;$math[$getUserVar[1hpoints] + $get[points]]]
      # $get[pts] = $get[points]\n### Total: ||$getUserVar[1hpoints]||$if[$getUserVar[mh]<3;\n-# M: \`$getUserVar[mh]\`]$if[$getUserVar[cht]<3;\n-# CHT: \`$getUserVar[cht]\`]$if[$getUserVar[kbt]<3;\n-# KBT: \`$getUserVar[kbt]\`]
    ]
  `
},{
  name: "end",
  type: "messageCreate",
  code: `
    $reply
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
    $onlyIf[$getUserVar[1hstarted];# You dont have an active challenge!]
    ${pts()}
  `
},{
  name: "editpoints",
  aliases: ["epts", "editscore", "escr"],
  type: "messageCreate",
  code: `
    $reply
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
    $onlyIf[$getUserVar[1hstarted];# You dont have an active challenge!]
    $onlyIf[$or[$and[$isNumber[$message];$message>=0];$checkContains[$message;:]];## Only seconds greater than or equal to 0 or time format "HH:MM:SS" is allowed!]

    $if[$checkContains[$message;:];
      $setUserVar[1htime;$round[$math[$unparseDigital[$message] / 1000]]]
    ;
      $setUserVar[1htime;$message]
    ]
    ${vars()}
    ${time()}
  `
}]




function interval () {
return `
$setInterval[
    $setUserVar[1htime;$sum[$getUserVar[1htime];1]] 

    $if[$getUserVar[1htime]==1800;  $sendMessage[$channelID;# <@$authorID> 30 minutes left!]  ]
    $if[$getUserVar[1htime]==3300;  $sendMessage[$channelID;# <@$authorID> 5 minutes left!]   ]
    $if[$getUserVar[1htime]==3540;  $sendMessage[$channelID;# <@$authorID> 1 minute left!]    ]
    $if[$getUserVar[1htime]==3570;  $sendMessage[$channelID;# <@$authorID> 30 seconds left!]  ]
    $if[$getUserVar[1htime]==3585;  $sendMessage[$channelID;# <@$authorID> 15 seconds left!]  ]
    $if[$getUserVar[1htime]==3595;  $sendMessage[$channelID;# <@$authorID> 5 seconds left!]   ]
    $if[$getUserVar[1htime]==3596;  $sendMessage[$channelID;# <@$authorID> 4 seconds left!]   ]
    $if[$getUserVar[1htime]==3597;  $sendMessage[$channelID;# <@$authorID> 3 seconds left!]   ]
    $if[$getUserVar[1htime]==3598;  $sendMessage[$channelID;# <@$authorID> 2 seconds left!]   ]
    $if[$getUserVar[1htime]==3599;  $sendMessage[$channelID;# <@$authorID> 1 second left!]    ] 
    $if[$getUserVar[1htime]==3600;  $sendMessage[$channelID;# <@$authorID> 1 Hour Luck Ended!\n${pts()}]  ${reset()}] 
;1s;1HLUCK]`
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

function time () {
return `
## Time passed: \`$parseDigital[$getUserVar[1htime]000]\`
## Time left: \`$get[hour]:$get[minute]:$get[second]\``
}

function pts () {
return `
# Points: ||$getUserVar[1hpoints]||
## Total rares: ||$getUserVar[1htotalRares]||
$c[## Commons: \n$codeBlock[Markhor: $getuservar[mh]\nChoco: $getuservar[cht]\nKeel-Billed: $getuservar[kbt];JSON]]
## All received rares list: \n$codeBlock[$advancedReplace[$trimLines[$getUserVar[1hallRaresList]];{;;};;";];JSON]
`
}

function reset() {
return `
$!stopInterval[1HLUCK]
$deleteUserVar[1hstarted]
$deleteUserVar[1hallRaresList]
$deleteUserVar[1htime]
$deleteUserVar[1hpoints]
$deleteUserVar[1hpaused]
$deleteUserVar[mh]
$deleteUserVar[kbt]
$deleteUserVar[cht]`
}

function rares(category) {
return `
$if[$isJson[$env[allRaresList]];;$jsonLoad[allRaresList;$getUserVar[1hallRaresList]]]
$if[$isJson[$env[SNORA]];;$jsonLoad[SNORA;${SNORA()}]]
$letSum[points;$get[${category}]]
$arrayPush[caught;+$get[${category}]]
$setUserVar[1htotalRares;$math[$getUserVar[1htotalRares] + 1]]

$if[$env[allRaresList;$env[SNORA;$env[an]]]==;
  $!jsonSet[allRaresList;$env[SNORA;$env[an]];1]
;
  $!jsonSet[allRaresList;$env[SNORA;$env[an]];$math[$env[allRaresList;$env[SNORA;$env[an]]] + 1]]
]
$setUserVar[1hallRaresList;$env[allRaresList]]`
}

function SNORA() {
return `
{
  "wd": "White Dove",
  "pp": "Pinky Pig",
  "sp": "Stinky Pig",
  "doe": "Doe",
  "mad": "Marsh Deer",
  "md": "Musk Deer",
  "gph": "Golden Pheasant",
  "bm": "Blue Macaw",
  "sm": "Spix Macaw",
  "ja": "Jackass",
  "mm": "Momaffie",
  "mf": "Momaffie Family",
  "gir": "Girabie",
  "jag": "Jaguar",
  "leo": "Leopard",
  "bp": "Black Panther",
  "cht": "Choco Toucan",
  "kbt": "Keel-Billed Toucan",
  "ft": "Fiery Toucan",
  "lt": "Lava Toucan",
  "hht": "Helmeted Hornbill Toucan",
  "yp": "Yellow Pufferfish",
  "dp": "Demon Pufferfish",
  "wt": "White Tiger",
  "lc": "Lion Cub",
  "wlc": "White Lion Cub",
  "blc": "Black Lion Cub",
  "ln": "Lioness",
  "wln": "White Lioness",
  "bln": "Black Lioness",
  "bml": "Black-Maned Lion",
  "wl": "White Lion",
  "bl": "Black Lion",
  "arg": "Argentavis",
  "pr": "Predator",
  "shh": "Shaheen",
  "wr": "White Rhino",
  "br": "Black Rhino",
  "ge": "Golden Eagle",
  "he": "Harpy Eagle",
  "gse": "Greater-Spotted Eagle",
  "mh": "Markhor",
  "bg": "Big Goat",
  "wg": "White Giraffe",
  "wgf": "White Giraffe Family",
  "ay": "Aqua Yeti",
  "ssm": "Shop Snowman",
  "lsm": "Luck Snowman",
  "sbf": "Shop BigFoot",
  "lbf": "Luck BigFoot",
  "ssg": "Shop Snowgirl",
  "lsg": "Luck Snowgirl",
  "kd": "King Dragon"
}`
}
