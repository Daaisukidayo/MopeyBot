// Message after the changes were made

export default {
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu', 'modal'],
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;editHistoryOptions,addNewHistoryPageModalPoints,addNewHistoryPageModalRares,addHistoryCustomPoints,addHistoryCustomRares,addHistoryCustomPlayType,addHistoryCustomDifficulty,addHistoryCustomEndDate,addHistoryCustomTags,addHistoryCustomRaresList]
    $let[value;$selectMenuValues]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]
    $onlyIf[$get[value]!=editExistingHistoryPage]
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[difficulties;$getGlobalVar[difficulties]]
    $jsonLoad[playTypes;$getGlobalVar[playTypes]]

    $timezone[$env[userProfile;timezone]]

    $if[$getUserVar[savedNewHistoryConfig]==;
      $addHistoryNewConfig
    ]

    $jsonLoad[savedNewHistoryConfig;$getUserVar[savedNewHistoryConfig]]


    $switch[$env[IID;0];

      $case[addHistoryCustomPoints;
        $let[input;$input[addedPoints]]
        $onlyIf[$and[$isNumber[$get[input]];$get[input]>0];
          $newError[$tl[ui.history.listOptionInvalidPoints]]
        ]
        $!jsonSet[savedNewHistoryConfig;points;$get[input]]
      ]


      $case[addHistoryCustomRares;
        $let[input;$input[addedRaresQuantity]]
        $onlyIf[$and[$isNumber[$get[input]];$get[input]>0];
          $newError[$tl[ui.history.listOptionInvalidRares]]
        ]
        $!jsonSet[savedNewHistoryConfig;rares;$get[input]]
      ]


      $case[addHistoryCustomPlayType;
        $!jsonSet[savedNewHistoryConfig;playType;$get[value]]
      ]


      $case[addHistoryCustomDifficulty;
        $!jsonSet[savedNewHistoryConfig;difficulty;$get[value]]
      ]


      $case[addHistoryCustomEndDate;
        $let[date;$unparseDate[$input[addedEndDate]]]

        $onlyIf[$and[$get[date]>0;$get[date]<$getTimestamp];
          $newError[$tl[ui.history.listOptionInvalidDate]]
        ]

        $!jsonSet[savedNewHistoryConfig;endDate;$get[date]]
      ]


      $case[addHistoryCustomRaresList;
        $let[input;$replace[$input[addedRaresList];\n;;-1]]
        $arrayLoad[addedRaresList;,;$get[input]]

        $arrayForEach[addedRaresList;elem;
          $arrayLoad[keyValue;=;$env[elem]]
          $let[animalID;$getRareAnimalID[$trim[$env[keyValue;0]]]]
          $let[value;$trim[$env[keyValue;1]]]

          $onlyIf[$get[animalID]!=undefined;
            $newError[$tl[ui.history.listOptionUnknownRare;$env[keyValue;0];$env[elem]]]
          ]

          $onlyIf[$isNumber[$get[value]];
            $newError[$tl[ui.history.listOptionInvalidValue;$get[value];$env[elem]]]
          ]

          $if[$get[value]>200;
            $let[value;200]
          ]
          
          $if[$get[value]>0;
            $!jsonSet[savedNewHistoryConfig;raresList;$get[animalID];$get[value]]
          ;
            $!jsonDelete[savedNewHistoryConfig;raresList;$get[animalID]]
          ]
        ]

        $jsonLoad[res;$generateList[$sortList[$env[savedNewHistoryConfig;raresList]];$env[savedNewHistoryConfig;difficulty]]]
        $!jsonSet[savedNewHistoryConfig;points;$env[res;p]]
        $!jsonSet[savedNewHistoryConfig;rares;$env[res;r]]
      ]
    ]

    $setUserVar[savedNewHistoryConfig;$env[savedNewHistoryConfig]]

    $historyEmbed[$env[savedNewHistoryConfig]]
    $addHistoryExtraEmbed
    $interactionUpdate
  `
}