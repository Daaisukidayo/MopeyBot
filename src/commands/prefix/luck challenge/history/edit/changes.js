// Message after the changes were made

export default {
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu', 'modal'],
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;editHistoryCustomPoints,editHistoryCustomRares,editHistoryCustomPlayType,editHistoryCustomDifficulty,editHistoryCustomEndDate,editHistoryCustomTags,editHistoryCustomRaresList]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $let[value;$selectMenuValues]
    $let[page;$env[IID;0]]
    $let[sortType;$env[IID;1]]
    $let[pageIndex;$math[$get[page] - 1]]

    $timezone[$env[userProfile;timezone]]

    $jsonLoad[history;$getUserVar[challengeHistory]]
    $jsonLoad[difficulties;$getGlobalVar[difficulties]]
    $jsonLoad[playTypes;$getGlobalVar[playTypes]]
    $jsonLoad[sortingOptions;$getGlobalVar[sortingOptions]]

    $onlyIf[$env[history;$get[pageIndex]]!=;
      $newError[$tl[ui.addHistory.unknownPage]]
    ]

    $jsonLoad[history;$sortHistory[$env[history];$get[sortType]]]
    $jsonLoad[thisHistory;$env[history;$get[pageIndex]]]

    $switch[$env[IID;2];

      $case[editHistoryCustomPoints;
        $let[input;$input[editedPoints]]
        $onlyIf[$and[$isNumber[$get[input]];$get[input]>0];
          $newError[$tl[ui.history.listOptionInvalidPoints]]
        ]
        $!jsonSet[thisHistory;points;$get[input]]
      ]


      $case[editHistoryCustomRares;
        $let[input;$input[editedRaresQuantity]]
        $onlyIf[$and[$isNumber[$get[input]];$get[input]>0];
          $newError[$tl[ui.history.listOptionInvalidRares]]
        ]
        $!jsonSet[thisHistory;rares;$get[input]]
      ]


      $case[editHistoryCustomPlayType;
        $!jsonSet[thisHistory;playType;$get[value]]
      ]


      $case[editHistoryCustomDifficulty;
        $!jsonSet[thisHistory;difficulty;$get[value]]
      ]


      $case[editHistoryCustomEndDate;
        $let[date;$unparseDate[$input[editedEndDate]]]

        $onlyIf[$and[$get[date]>0;$get[date]<$getTimestamp];
          $newError[$tl[ui.history.listOptionInvalidDate]]
        ]

        $!jsonSet[thisHistory;endDate;$get[date]]
      ]


      $case[editHistoryCustomRaresList;
        $let[input;$replace[$input[editedRaresList];\n;;-1]]
        $arrayLoad[editedRaresList;,;$get[input]]

        $arrayForEach[editedRaresList;elem;
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
            $!jsonSet[thisHistory;raresList;$get[animalID];$get[value]]
          ;
            $!jsonDelete[thisHistory;raresList;$get[animalID]]
          ]
        ]
      ]
    ]

    $!jsonSet[history;$get[pageIndex];$env[thisHistory]]
    $setUserVar[challengeHistory;$env[history]]

    $historyEmbed[$env[thisHistory]]
    $editHistoryExtraEmbed
    $interactionUpdate

    $newTimeout[edit_history-$authorID;1m]
  `
}