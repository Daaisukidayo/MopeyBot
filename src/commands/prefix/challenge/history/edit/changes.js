// Message after any change

export default {
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu', 'modal', 'button'],
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys; ;editHistory_resetChanges editHistory_editPoints editHistory_editRares editHistory_editPlayType editHistory_editDifficulty editHistory_editEndDate editHistory_editRaresList]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $addCooldown[history;true]
    $timezone[$env[userProfile;timezone]]

    $let[input;$selectMenuValues]
    $jsonLoad[thisHistory;$getMessageVar[cachedThisHistory;$messageID]]

    $switch[$env[IID;0];

      $case[editHistory_editPoints;
        $let[input;$input[editedPoints]]
        $onlyIf[$and[$isNumber[$get[input]];$get[input]>0];
          $newError[$tl[ui.history.listOptionInvalidPoints]]
        ]
        $!jsonSet[thisHistory;points;$get[input]]
      ]


      $case[editHistory_editRares;
        $let[input;$input[editedRaresQuantity]]
        $onlyIf[$and[$isNumber[$get[input]];$get[input]>0];
          $newError[$tl[ui.history.listOptionInvalidRares]]
        ]
        $!jsonSet[thisHistory;rares;$get[input]]
      ]


      $case[editHistory_editPlayType;
        $!jsonSet[thisHistory;playType;$get[input]]
      ]


      $case[editHistory_editDifficulty;
        $!jsonSet[thisHistory;difficulty;$get[input]]
      ]


      $case[editHistory_editEndDate;
        $let[date;$unparseDate[$input[editedEndDate]]]

        $onlyIf[$and[$get[date]>0;$get[date]<$getTimestamp];
          $newError[$tl[ui.history.listOptionInvalidDate]]
        ]

        $!jsonSet[thisHistory;endDate;"$get[date]"]
      ]


      $case[editHistory_editRaresList;
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

          $if[$get[value]>100;
            $let[value;100]
          ]
          
          $if[$get[value]>0;
            $!jsonSet[thisHistory;raresList;$get[animalID];$get[value]]
          ;
            $!jsonDelete[thisHistory;raresList;$get[animalID]]
          ]
        ]
      ]

      $case[editHistory_resetChanges;
        $jsonLoad[cachedHistory;$getMessageVar[cachedHistory;$messageID]]
        $jsonLoad[history;$env[cachedHistory;history]]
        $jsonLoad[thisHistory;$env[history;$math[$env[cachedHistory;page] - 1]]]
      ]
    ]

    $setMessageVar[cachedThisHistory;$env[thisHistory];$messageID]

    $historyEmbed[$env[thisHistory]]
    $editHistoryExtraEmbed
    $interactionUpdate

    $newHistoryTimeout
  `
}