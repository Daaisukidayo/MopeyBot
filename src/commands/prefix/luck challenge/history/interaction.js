export default {
  type: "interactionCreate",
  allowedInteractionTypes: ["button", "modal", "selectMenu"],
  description: "history buttons",
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[menuValues;-;$selectMenuValues]
    $arrayLoad[passKeys;,;sortHis,historyPageLeft,historyPageRight,customPage,deleteHistoryPage,historyPageCustom]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]

    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $timezone[$env[userProfile;timezone]]

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[history;$getUserVar[challengeHistory]]

    $onlyIf[$arrayLength[history]>0;
      $addContainer[
        $addAuthorDisplay
        $addTextDisplay[$tl[ui.history.noHistory]]
      ;$getGlobalVar[luckyColor]]
    ]

    $let[IID;$env[IID;2]]
    $let[input;$input[historyPage]]
    $let[page;$default[$env[menuValues;0];$env[IID;0]]]
    $let[pageIndex;$math[$get[page] - 1]]
    $let[sortType;$default[$env[menuValues;1];$env[IID;1]]]

    $jsonLoad[history;$sortHistory[$env[history];$get[sortType]]]
    

    $if[$arrayIncludes[IID;historyPageCustom];
      $modal[$get[page]-$get[sortType]-customPage-$authorID;$tl[ui.history.modalTitleCustomPage]]
      $addTextInput[historyPage;$tl[ui.history.modalDescriptionCustomPage];Short;true;;;1;5]
      $showModal
      $stop
    ]
    

    $switch[$get[IID];
      $case[historyPageLeft;
        $letSub[page;1]
        $if[$get[page]<=0;
          $let[page;$arrayLength[history]]
        ]
      ]


      $case[historyPageRight;
        $letSum[page;1]
        $if[$get[page]>$arrayLength[history];
          $let[page;1]
        ]
      ]


      $case[customPage;
        $onlyIf[$isNumber[$get[input]];
          $newError[$tl[ui.history.customPageNotNumber]]
        ]

        $let[page;$get[input]]
        $if[$get[page]>$arrayLength[history];
          $let[page;$arrayLength[history]]
        ]
        $if[$get[page]<=0;
          $let[page;1]
        ]
      ]

      $case[deleteHistoryPage;

        $!arraySplice[history;$get[pageIndex];1]

        $arrayAdvancedSort[history;A;B;
          $math[$env[A;endDate] - $env[B;endDate]]
        ;history]

        $setUserVar[challengeHistory;$env[history]]
        
        $jsonLoad[history;$sortHistory[$env[history];$get[sortType]]]
        
        $if[$get[page]>$arrayLength[history];
          $let[page;$arrayLength[history]]
        ]
      ]
    ]

    $let[pageIndex;$math[$get[page] - 1]]

    $jsonLoad[thisHistory;$env[history;$get[pageIndex]]]

    $onlyIf[$env[thisHistory]!=;
      $newError[$tl[ui.history.invalidPage]]
    ]

    $historyEmbed[$env[thisHistory]]
    $showHistoryExtraEmbed
    $interactionUpdate
    $newTimeout[history-$authorID;1m]
  `
}