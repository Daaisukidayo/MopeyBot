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
    $jsonLoad[raresMap;$getGlobalVar[raresMap]]
    $arrayLoad[caughtRares; ;$toLowerCase[$message]]
    $jsonLoad[SNORA;$getGlobalVar[SNORA]]
    $jsonLoad[allRaresList;{}]

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

    $addField[Total points:; \`$get[points]\`]
    $addField[Total rares:;\`$get[totalRares]\`]
    $addField[All received rares list:;$codeBlock[$advancedReplace[$trimLines[$env[allRaresList]];{;;};;";;,;];JSON]]
    $if[$arrayLength[unknown]!=0;$addField[# Unknown rares:;$codeBlock[$advancedReplace[$trimLines[$env[unknown]];[;;\\];;";];JSON]]]
    $getGlobalVar[author]
    $color[$getGlobalVar[luckyColor]]
  `
}]


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

