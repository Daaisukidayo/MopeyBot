module.exports = [{ 
name: "countpoints", 
aliases: ["count","cp"], 
type: "messageCreate", 
code: `
$reply 
$onlyIf[$message!=]

$let[totalRares;0]
$let[points;0]

$let[kbt;0]
$let[mh;0]
$let[cht;0]

$jsonLoad[pointsMap;{
  "common": 1,
  "uncommon": 2,
  "rare": 3,
  "epic": 5,
  "insane": 8,
  "legendary": 15,
  "extreme": 20,
  "mythic": 30,
  "godly": 50
}]


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

$arrayForEach[rares;an;

    $if[$arrayIncludes[common;$env[an]];
      $if[$arrayIncludes[common;$env[an]];
        $arrayForEach[common;com;
          $if[$and[$env[an]==$env[com];$get[$env[com]]<3];
              ${rares("common")}
              $letSum[$env[com];1]
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
                                        $arrayPush[unknown;$env[an]]
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
# Total points: \`$get[points]\`
# Total rares: \`$get[totalRares]\`
## All received rares list: \n$codeBlock[$advancedReplace[$trimLines[$env[allRaresList]];{;;};;";];JSON]
$if[$arrayLength[unknown]!=0;# Unknown rares:\n$codeBlock[$advancedReplace[$trimLines[$env[unknown]];[;;\\];;";];JSON]]

`}]


function rares(category) {
return `
$if[$isJson[$env[allRaresList]];;$jsonLoad[allRaresList;{}]]
$if[$isJson[$env[SNORA]];;$jsonLoad[SNORA;${SNORA()}]]
$letSum[points;$env[pointsMap;${category}]]
$letSum[totalRares;1]

$if[$env[allRaresList;$env[SNORA;$env[an]]]==;
  $!jsonSet[allRaresList;$env[SNORA;$env[an]];1]
;
  $!jsonSet[allRaresList;$env[SNORA;$env[an]];$math[$env[allRaresList;$env[SNORA;$env[an]]] + 1]]
]
`
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
