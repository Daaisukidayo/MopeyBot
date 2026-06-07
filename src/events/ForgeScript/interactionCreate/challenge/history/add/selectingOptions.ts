// Embed with editing options that are gonna be added to history

export default {
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu'],
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;historyChooseAdd]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]
    
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $let[option;$selectMenuValues]
    $timezone[$env[userProfile;timezone]]
    
    $jsonLoad[difficulties;$getGlobalVar[difficulties]]
    $jsonLoad[playTypes;$getGlobalVar[playTypes]]

    $jsonLoad[addHistorySavedConfig;$getUserVar[addHistorySavedConfig]]

    $historyEmbed[$env[addHistorySavedConfig]]

    $switch[$get[option];

      $case[points;
        $addHistoryExtraEmbed
        $modal[addHistoryCustomPoints-$authorID;$tl[$get[l];ui;history.modalTitlePoints]]
        $addTextInput[addedPoints;$tl[$get[l];ui;history.modalDescriptionPoints];Short;true;$tl[$get[l];ui;history.modalPlaceholderPoints;$env[addHistorySavedConfig;points]];;1;4]
        $showModal
      ]

      $case[raresQuantity;
        $addHistoryExtraEmbed
        $modal[addHistoryCustomRares-$authorID;$tl[$get[l];ui;history.modalTitleRares]]
        $addTextInput[addedRaresQuantity;$tl[$get[l];ui;history.modalDescriptionRares];Short;true;$tl[$get[l];ui;history.modalPlaceholderRares;$env[addHistorySavedConfig;rares]];;1;3]
        $showModal
      ]

      $case[playType;
        $addContainer[
          $addActionRow
          $addStringSelectMenu[addHistoryCustomPlayType-$authorID;$tl[$get[l];ui;history.menuTitlePlayType]]
          $arrayForEach[playTypes;type;
            $addOption[$tl[$get[l];data;playTypes.$env[type]];;$env[type]]
          ]
        ;$getGlobalVar[luckyColor]]
      ]

      $case[difficulty;
        $addContainer[
          $addActionRow
          $addStringSelectMenu[addHistoryCustomDifficulty-$authorID;$tl[$get[l];ui;history.menuTitleDifficulty]]
          $arrayForEach[difficulties;dif;
            $addOption[$tl[$get[l];data;difficulties.$env[dif]];;$env[dif]]
          ]
        ;$getGlobalVar[luckyColor]]
      ]

      $case[endDate;
        $addHistoryExtraEmbed
        $modal[addHistoryCustomEndDate-$authorID;$tl[$get[l];ui;history.modalTitleEndDate]]
        $addTextInput[addedEndDate;$tl[$get[l];ui;history.modalDescriptionEndDate];Paragraph;true;$tl[$get[l];ui;history.modalPlaceholderEndDate]]
        $showModal
      ]

      $case[raresList;
        $addHistoryExtraEmbed
        $modal[addHistoryCustomRaresList-$authorID;$tl[$get[l];ui;history.modalTitleList]]
        $addTextInput[addedRaresList;$tl[$get[l];ui;history.modalDescriptionList];Paragraph;true;$tl[$get[l];ui;history.modalPlaceholderList]]
        $showModal
      ]

    ]
    $interactionUpdate
    $newCommandTimeout[addhistory]
  `
}