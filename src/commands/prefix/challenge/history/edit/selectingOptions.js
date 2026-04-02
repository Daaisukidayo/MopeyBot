// After selecting editing option

export default {
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu'],
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;editHistory_selectEditOption]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $addCooldown[history;true]
    $timezone[$env[userProfile;timezone]]

    $jsonLoad[difficulties;$getGlobalVar[difficulties]]
    $jsonLoad[playTypes;$getGlobalVar[playTypes]]

    $jsonLoad[thisHistory;$getMessageVar[cachedThisHistory;$messageID]]

    $historyEmbed[$env[thisHistory]]

    $switch[$selectMenuValues;

      $case[points;
        $editHistoryExtraEmbed
        $modal[editHistory_editPoints-$authorID;$tl[ui.history.modalTitlePoints]]
        $addTextInput[editedPoints;$tl[ui.history.modalDescriptionPoints];Short;true;$tl[ui.history.modalPlaceholderPoints;$env[thisHistory;points]];;1;5]
        $showModal
      ]

      $case[raresQuantity;
        $editHistoryExtraEmbed
        $modal[editHistory_editRares-$authorID;$tl[ui.history.modalTitleRares]]
        $addTextInput[editedRaresQuantity;$tl[ui.history.modalDescriptionRares];Short;true;$tl[ui.history.modalPlaceholderRares;$env[thisHistory;rares]];;1;3]
        $showModal
      ]

      $case[playType;
        $addContainer[
          $addActionRow
          $addStringSelectMenu[editHistory_editPlayType-$authorID;$tl[ui.history.menuTitlePlayType]]
          $arrayForEach[playTypes;type;
            $addOption[$tl[data.playTypes.$env[type]];;$env[type]]
          ]
        ;$getGlobalVar[luckyColor]]
      ]

      $case[difficulty;
        $addContainer[
          $addActionRow
          $addStringSelectMenu[editHistory_editDifficulty-$authorID;$tl[ui.history.menuTitleDifficulty]]
          $arrayForEach[difficulties;dif;
            $addOption[$tl[data.difficulties.$env[dif]];;$env[dif]]
          ]
        ;$getGlobalVar[luckyColor]]
      ]

      $case[endDate;
        $editHistoryExtraEmbed
        $modal[editHistory_editEndDate-$authorID;$tl[ui.history.modalTitleEndDate]]
        $addTextInput[editedEndDate;$tl[ui.history.modalDescriptionEndDate];Paragraph;true;$tl[ui.history.modalPlaceholderEndDate]]
        $showModal
      ]

      $case[raresList;
        $editHistoryExtraEmbed
        $modal[editHistory_editRaresList-$authorID;$tl[ui.history.modalTitleList]]
        $addTextInput[editedRaresList;$tl[ui.history.modalDescriptionList];Paragraph;true;$tl[ui.history.modalPlaceholderList]]
        $showModal
      ]

    ]

    $interactionUpdate

    $newHistoryTimeout
  `
}