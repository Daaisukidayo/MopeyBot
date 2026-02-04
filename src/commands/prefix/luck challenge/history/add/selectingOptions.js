// Embed with editing options that are gonna be added to history

export default {
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu'],
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;historyChooseAdd]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $let[option;$selectMenuValues]
    $timezone[$env[userProfile;timezone]]
    
    $jsonLoad[difficulties;$getGlobalVar[difficulties]]
    $jsonLoad[playTypes;$getGlobalVar[playTypes]]

    $jsonLoad[savedNewHistoryConfig;$getUserVar[savedNewHistoryConfig]]

    $historyEmbed[$env[savedNewHistoryConfig]]

    $switch[$get[option];

      $case[points;
        $addHistoryExtraEmbed
        $modal[addHistoryCustomPoints-$authorID;$tl[ui.history.modalTitlePoints]]
        $addTextInput[addedPoints;$tl[ui.history.modalDescriptionPoints];Short;true;$tl[ui.history.modalPlaceholderPoints;$env[savedNewHistoryConfig;points]];;1;4]
        $showModal
      ]

      $case[raresQuantity;
        $addHistoryExtraEmbed
        $modal[addHistoryCustomRares-$authorID;$tl[ui.history.modalTitleRares]]
        $addTextInput[addedRaresQuantity;$tl[ui.history.modalDescriptionRares];Short;true;$tl[ui.history.modalPlaceholderRares;$env[savedNewHistoryConfig;rares]];;1;3]
        $showModal
      ]

      $case[playType;
        $addContainer[
          $addActionRow
          $addStringSelectMenu[addHistoryCustomPlayType-$authorID;$tl[ui.history.menuTitlePlayType]]
          $arrayForEach[playTypes;type;
            $addOption[$tl[data.playTypes.$env[type]];;$env[type]]
          ]
        ;$getGlobalVar[luckyColor]]
      ]

      $case[difficulty;
        $addContainer[
          $addActionRow
          $addStringSelectMenu[addHistoryCustomDifficulty-$authorID;$tl[ui.history.menuTitleDifficulty]]
          $arrayForEach[difficulties;dif;
            $addOption[$tl[data.difficulties.$env[dif]];;$env[dif]]
          ]
        ;$getGlobalVar[luckyColor]]
      ]

      $case[endDate;
        $addHistoryExtraEmbed
        $modal[addHistoryCustomEndDate-$authorID;$tl[ui.history.modalTitleEndDate]]
        $addTextInput[addedEndDate;$tl[ui.history.modalDescriptionEndDate];Paragraph;true;$tl[ui.history.modalPlaceholderEndDate]]
        $showModal
      ]

      $case[raresList;
        $addHistoryExtraEmbed
        $modal[addHistoryCustomRaresList-$authorID;$tl[ui.history.modalTitleList]]
        $addTextInput[addedRaresList;$tl[ui.history.modalDescriptionList];Paragraph;true;$tl[ui.history.modalPlaceholderList]]
        $showModal
      ]

    ]
    $interactionUpdate
    $!stopTimeout[history-$authorID]
  `
}