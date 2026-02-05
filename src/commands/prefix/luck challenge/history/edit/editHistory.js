export default [{
  name: 'edithistory',
  aliases: ['edithis', 'eh', 'ehis'],
  type: 'messageCreate',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown[1m]

    $jsonLoad[history;$getUserVar[challengeHistory]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.$commandName.welcomeTitle]]
      $addActionRow
      $addStringSelectMenu[editHistoryOptions-$authorID;$tl[ui.$commandName.menuTitleEditHistoryOptions]]
      $addOption[$tl[ui.$commandName.optionNameAddPage];;addNewHistoryPage]
      $addOption[$tl[ui.$commandName.optionNameEditPage];;editExistingHistoryPage]
    ;$getGlobalVar[luckyColor]]

    $newTimeout[edit_history-$authorID;1m;$sendMessage[$channelID;;true]]
  `
},{
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu'],
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;editHistoryOptions]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]
    $onlyIf[$selectMenuValues==editExistingHistoryPage]
    
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[sortingOptions;$getGlobalVar[sortingOptions]]
    $let[length;$advArrayLength[$getUserVar[challengeHistory]]]

    $modal[editHistoryPageModal-$authorID;$tl[ui.edithistory.modalTitleEditExistingPage]]
    $addTextInput[editHistoryPageNumber;$tl[ui.edithistory.modalDescriptionEnterExistingPage];Short;true;$tl[ui.edithistory.modalPlaceholderEnterExistingPage;$get[length]]]
    $addLabel[$tl[ui.edithistory.modalNameSorting];
      $addActionRow
      $addStringSelectMenu[editHistorySortingChoose;$tl[ui.edithistory.menuTitleChooseSortingType]]
      $arrayForEach[sortingOptions;option;
        $addOption[$tl[data.sortingOptions.$env[option]];;$env[option]]
      ]
    ]
    $showModal

    $fetchResponse
    $interactionUpdate
    $newTimeout[edit_history-$authorID;1m]
  `
},{
  type: 'interactionCreate',
  allowedInteractionTypes: ['button', 'modal', 'selectMenu'],
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;editHistoryPage,editHistoryPageModal]

    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]

    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $timezone[$env[userProfile;timezone]]

    $jsonLoad[history;$getUserVar[challengeHistory]]
    $jsonLoad[sortingOptions;$getGlobalVar[sortingOptions]]

    $let[page;$default[$input[editHistoryPageNumber];$env[IID;0]]]
    $let[pageIndex;$math[$get[page] - 1]]
    $let[value;$input[editHistorySortingChoose]]

    $onlyIf[$and[$isNumber[$get[page]];$get[page]>0];
      $newError[$tl[ui.edithistory.invalidPage]]
    ]

    $let[sortType;$default[$get[value];$env[IID;1]]]
    $onlyIf[$arrayIncludes[sortingOptions;$get[sortType]];
      $newError[$tl[ui.edithistory.invalidSorting]]
    ]

    $jsonLoad[history;$sortHistory[$env[history];$get[sortType]]]
    $jsonLoad[thisHistory;$env[history;$get[pageIndex]]]

    $onlyIf[$env[thisHistory]!=;
      $newError[$tl[ui.edithistory.unknownPage]]
    ]

    $historyEmbed[$env[thisHistory]]
    $editHistoryExtraEmbed
    $interactionUpdate

    $newTimeout[edit_history-$authorID;1m]
  `
}]