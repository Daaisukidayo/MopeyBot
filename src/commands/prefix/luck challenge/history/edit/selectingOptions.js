// After choosing editing option

export default {
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu'],
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;historyChooseEdit]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $let[option;$selectMenuValues]
    $let[page;$env[IID;0]]
    $let[sortType;$env[IID;1]]
    $let[pageIndex;$math[$get[page] - 1]]

    $timezone[$env[userProfile;timezone]]

    $jsonLoad[history;$getUserVar[challengeHistory]]
    $jsonLoad[difficulties;$getGlobalVar[difficulties]]
    $jsonLoad[playTypes;$getGlobalVar[playTypes]]

    $onlyIf[$env[history;$get[pageIndex]]!=;
      $newError[$tl[ui.edithistory.unknownPage]]
    ]

    $jsonLoad[history;$sortHistory[$env[history];$get[sortType]]]
    $jsonLoad[thisHistory;$env[history;$get[pageIndex]]]

    $historyEmbed[$env[thisHistory]]

    $switch[$get[option];

      $case[points;
        $editHistoryExtraEmbed
        $modal[$get[page]-$get[sortType]-editHistoryCustomPoints-$authorID;$tl[ui.history.modalTitlePoints]]
        $addTextInput[editedPoints;$tl[ui.history.modalDescriptionPoints];Short;true;$tl[ui.history.modalPlaceholderPoints;$env[thisHistory;points]];;1;5]
        $showModal
      ]

      $case[raresQuantity;
        $editHistoryExtraEmbed
        $modal[$get[page]-$get[sortType]-editHistoryCustomRares-$authorID;$tl[ui.history.modalTitleRares]]
        $addTextInput[editedRaresQuantity;$tl[ui.history.modalDescriptionRares];Short;true;$tl[ui.history.modalPlaceholderRares;$env[thisHistory;rares]];;1;3]
        $showModal
      ]

      $case[playType;
        $addContainer[
          $addActionRow
          $addStringSelectMenu[$get[page]-$get[sortType]-editHistoryCustomPlayType-$authorID;$tl[ui.history.menuTitlePlayType]]
          $arrayForEach[playTypes;type;
            $addOption[$tl[data.playTypes.$env[type]];;$env[type]]
          ]
        ;$getGlobalVar[luckyColor]]
      ]

      $case[difficulty;
        $addContainer[
          $addActionRow
          $addStringSelectMenu[$get[page]-$get[sortType]-editHistoryCustomDifficulty-$authorID;$tl[ui.history.menuTitleDifficulty]]
          $arrayForEach[difficulties;dif;
            $addOption[$tl[data.difficulties.$env[dif]];;$env[dif]]
          ]
        ;$getGlobalVar[luckyColor]]
      ]

      $case[endDate;
        $editHistoryExtraEmbed
        $modal[$get[page]-$get[sortType]-editHistoryCustomEndDate-$authorID;$tl[ui.history.modalTitleEndDate]]
        $addTextInput[editedEndDate;$tl[ui.history.modalDescriptionEndDate];Paragraph;true;$tl[ui.history.modalPlaceholderEndDate]]
        $showModal
      ]

      $case[raresList;
        $editHistoryExtraEmbed
        $modal[$get[page]-$get[sortType]-editHistoryCustomRaresList-$authorID;$tl[ui.history.modalTitleList]]
        $addTextInput[editedRaresList;$tl[ui.history.modalDescriptionList];Paragraph;true;$tl[ui.history.modalPlaceholderList]]
        $showModal
      ]

    ]
    $interactionUpdate
    $!stopTimeout[history-$authorID]
    $newTimeout[edit_history-$authorID;1m]
  `
}