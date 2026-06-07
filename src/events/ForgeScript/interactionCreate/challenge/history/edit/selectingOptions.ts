// After selecting editing option

export default {
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu'],
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;editHistory_selectEditOption]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $addCooldown[showhistory;true]
    $timezone[$env[userProfile;timezone]]

    $jsonLoad[difficulties;$getGlobalVar[difficulties]]
    $jsonLoad[playTypes;$getGlobalVar[playTypes]]

    $jsonLoad[thisHistory;$getMessageVar[cachedThisHistory;$messageID]]

    $historyEmbed[$env[thisHistory]]

    $switch[$selectMenuValues;

      $case[points;
        $editHistoryExtraEmbed
        $modal[editHistory_editPoints-$authorID;$tl[$get[l];ui;history.modalTitlePoints]]
        $addTextInput[editedPoints;$tl[$get[l];ui;history.modalDescriptionPoints];Short;true;$tl[$get[l];ui;history.modalPlaceholderPoints;$env[thisHistory;points]];;1;5]
        $showModal
      ]

      $case[raresQuantity;
        $editHistoryExtraEmbed
        $modal[editHistory_editRares-$authorID;$tl[$get[l];ui;history.modalTitleRares]]
        $addTextInput[editedRaresQuantity;$tl[$get[l];ui;history.modalDescriptionRares];Short;true;$tl[$get[l];ui;history.modalPlaceholderRares;$env[thisHistory;rares]];;1;3]
        $showModal
      ]

      $case[playType;
        $addContainer[
          $addActionRow
          $addStringSelectMenu[editHistory_editPlayType-$authorID;$tl[$get[l];ui;history.menuTitlePlayType]]
          $arrayForEach[playTypes;type;
            $addOption[$tl[$get[l];data;playTypes.$env[type]];;$env[type];;$checkCondition[$env[thisHistory;playType]==$env[type]]]
          ]
        ;$getGlobalVar[luckyColor]]
      ]

      $case[difficulty;
        $addContainer[
          $addActionRow
          $addStringSelectMenu[editHistory_editDifficulty-$authorID;$tl[$get[l];ui;history.menuTitleDifficulty]]
          $arrayForEach[difficulties;dif;
            $addOption[$tl[$get[l];data;difficulties.$env[dif]];;$env[dif];;$checkCondition[$env[thisHistory;difficulty]==$env[dif]]]
          ]
        ;$getGlobalVar[luckyColor]]
      ]

      $case[endDate;
        $editHistoryExtraEmbed
        $modal[editHistory_editEndDate-$authorID;$tl[$get[l];ui;history.modalTitleEndDate]]
        $addTextInput[editedEndDate;$tl[$get[l];ui;history.modalDescriptionEndDate];Paragraph;true;$tl[$get[l];ui;history.modalPlaceholderEndDate]]
        $showModal
      ]

      $case[raresList;
        $editHistoryExtraEmbed
        $modal[editHistory_editRaresList-$authorID;$tl[$get[l];ui;history.modalTitleList]]
        $addTextInput[editedRaresList;$tl[$get[l];ui;history.modalDescriptionList];Paragraph;true;$tl[$get[l];ui;history.modalPlaceholderList]]
        $showModal
      ]

    ]

    $interactionUpdate
    $newHistoryTimeout
  `
}