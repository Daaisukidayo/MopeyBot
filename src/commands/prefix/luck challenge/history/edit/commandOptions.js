// Embed when editing an existing history page, appears after running 'edithistory'

export default [{
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

    $modal[editHistoryPageModal-$authorID;$tl[ui.edithistory.modalEditExistingPageTitle]]
    $addTextInput[editHistoryPageNumber;$tl[ui.edithistory.modalEnterExistingPageDescription];Short;true]
    $addTextInput[editHistoryPageSorting;$tl[ui.edithistory.modalEnterSortingDescription];Short;true;$tl[ui.edithistory.modalEnterSortingPlaceholder];0]
    $showModal

    $fetchResponse
    $interactionUpdate
    $newTimeout[edit_history-$authorID;1m]
  `
},{
  type: 'interactionCreate',
  allowedInteractionTypes: ['button', 'modal'],
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

    $onlyIf[$and[$isNumber[$get[page]];$get[page]>0];
      $newError[$tl[ui.edithistory.invalidPage]]
    ]

    $let[sortType;$default[$input[editHistoryPageSorting];$env[IID;1]]]
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