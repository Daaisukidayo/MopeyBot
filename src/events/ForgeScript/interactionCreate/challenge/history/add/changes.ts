// Message after making changes or after selecting 'Add new page'

export default {
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu', 'modal'],
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;addNewHistoryPageModalPoints,addNewHistoryPageModalRares,addHistoryCustomPoints,addHistoryCustomRares,addHistoryCustomPlayType,addHistoryCustomDifficulty,addHistoryCustomEndDate,addHistoryCustomTags,addHistoryCustomRaresList]
    $let[value;$selectMenuValues]

    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]
    $onlyIf[$get[value]!=editExistingHistoryPage]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[difficulties;$getGlobalVar[difficulties]]
    $jsonLoad[playTypes;$getGlobalVar[playTypes]]

    $timezone[$env[userProfile;timezone]]

    $if[$getUserVar[addHistorySavedConfig]==;
      $addHistoryNewConfig
    ]

    $jsonLoad[addHistorySavedConfig;$getUserVar[addHistorySavedConfig]]


    $switch[$env[IID;0];

      $case[addHistoryCustomPoints;
        $let[input;$input[addedPoints]]
        $onlyIf[$and[$isNumber[$get[input]];$get[input]>0];
          $newError[$tl[$get[l];ui;history.listOptionInvalidPoints]]
        ]
        $!jsonSet[addHistorySavedConfig;points;$get[input]]
      ]


      $case[addHistoryCustomRares;
        $let[input;$input[addedRaresQuantity]]
        $onlyIf[$and[$isNumber[$get[input]];$get[input]>0];
          $newError[$tl[$get[l];ui;history.listOptionInvalidRares]]
        ]
        $!jsonSet[addHistorySavedConfig;rares;$get[input]]
      ]


      $case[addHistoryCustomPlayType;
        $!jsonSet[addHistorySavedConfig;playType;$get[value]]
      ]


      $case[addHistoryCustomDifficulty;
        $!jsonSet[addHistorySavedConfig;difficulty;$get[value]]
      ]


      $case[addHistoryCustomEndDate;
        $let[date;$unparseDate[$input[addedEndDate]]]

        $onlyIf[$and[$get[date]>0;$get[date]<$getTimestamp];
          $newError[$tl[$get[l];ui;history.listOptionInvalidDate]]
        ]

        $!jsonSet[addHistorySavedConfig;endDate;"$get[date]"]
      ]


      $case[addHistoryCustomRaresList;
        $let[input;$replace[$input[addedRaresList];\n;;-1]]
        $arrayLoad[addedRaresList; ;$trim[$get[input]]]

        $arrayForEach[addedRaresList;elem;
          $arrayLoad[keyValue;=;$env[elem]]
          $let[animalID;$getRareAnimalID[$trim[$env[keyValue;0]]]]
          $let[value;$trim[$env[keyValue;1]]]

          $onlyIf[$get[animalID]!=undefined;
            $newError[$tl[$get[l];ui;history.listOptionUnknownRare;$env[keyValue;0];$env[elem]]]
          ]

          $onlyIf[$isNumber[$get[value]];
            $newError[$tl[$get[l];ui;history.listOptionInvalidValue;$get[value];$env[elem]]]
          ]

          $if[$get[value]>200;
            $let[value;200]
          ]
          
          $if[$get[value]>0;
            $!jsonSet[addHistorySavedConfig;raresList;$get[animalID];$get[value]]
          ;
            $!jsonDelete[addHistorySavedConfig;raresList;$get[animalID]]
          ]
        ]

        $jsonLoad[res;$generateList[$sortList[$env[addHistorySavedConfig;raresList]]]]
        $!jsonSet[addHistorySavedConfig;points;$env[res;p]]
        $!jsonSet[addHistorySavedConfig;rares;$env[res;r]]
      ]
    ]

    $setUserVar[addHistorySavedConfig;$env[addHistorySavedConfig]]

    $historyEmbed[$env[addHistorySavedConfig]]
    $addHistoryExtraEmbed
    $interactionUpdate
    $newCommandTimeout[addhistory]
  `
}