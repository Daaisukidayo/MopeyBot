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
$arrayLoad[unknown]
$arrayLoad[allRares]
$arrayLoad[raresMap;, \n;$getGlobalVar[raresMap]]
$arrayLoad[caughtRares; ;$toLowerCase[$message]]
$jsonLoad[SNORA;$getGlobalVar[SNORA]]
$jsonLoad[allRaresList;{}]

$arrayForEach[raresMap;rareMap;
  $jsonLoad[rareOBJ;$env[rareMap]]
  $arrayLoad[allRaresFromCat;,;$advancedReplace[$trimLines[$env[rareOBJ;rares]];";;\n;;\\[;;\\];]]
  $arrayConcat[allRares;allRares;allRaresFromCat]
]



$arrayForEach[caughtRares;caughtRare;
  $if[$arrayIncludes[allRares;$env[caughtRare]];
    $arrayForEach[raresMap;rareMap;
      $jsonLoad[rareOBJ;$env[rareMap]]
      $arrayLoad[raresFromOBJ;,;$advancedReplace[$trimLines[$env[rareOBJ;rares]];";;\n;;\\[;;\\];]]

      $if[$arrayIncludes[raresFromOBJ;$env[caughtRare]];
        $if[$env[rareOBJ;category]!=common;
          ${rares()}
        ;
          $arrayForEach[raresFromOBJ;com;
            $if[$and[$env[caughtRare]==$env[com];$get[$env[com]]<3];
              ${rares()}
              $letSum[$env[com];1]
            ]
          ]
        ]
      ]
    ]
  ;
    $arrayPush[unknown;$env[caughtRare]]
  ]
]

# Total points: \`$get[points]\`
# Total rares: \`$get[totalRares]\`
## All received rares list: \n$codeBlock[$advancedReplace[$trimLines[$env[allRaresList]];{;;};;";];JSON]
$if[$arrayLength[unknown]!=0;# Unknown rares:\n$codeBlock[$advancedReplace[$trimLines[$env[unknown]];[;;\\];;";];JSON]]

`}]


function rares() {
return `
$letSum[points;$env[rareOBJ;points]]
$letSum[totalRares;1]

$if[$env[allRaresList;$env[SNORA;$env[caughtRare]]]==;
  $!jsonSet[allRaresList;$env[SNORA;$env[caughtRare]];1]
;
  $!jsonSet[allRaresList;$env[SNORA;$env[caughtRare]];$math[$env[allRaresList;$env[SNORA;$env[caughtRare]]] + 1]]
]
`
}

