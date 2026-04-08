export default [{
  name: "history",
  aliases: ["his"],
  type: "messageCreate",
  code: `
    $handleHistory
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["button", "modal", "selectMenu"],
  code: `
    $arrayLoad[IID;-;$customID]
    $jsonLoad[passKeys;[
      "showHistory_changePageInModal",
      "showHistory_deletePage",
      "showHistory_confirmDeletePage",
      "showHistory_declineDeletePage",
      "showHistory_showPages",
      "showHistory_sortingMenu",
      "showHistory_prevPage",
      "showHistory_nextPage",
      "showHistory_filterByRareButton",
      "showHistory_filterByRare",
      "showHistory_sortByRare",
      "showHistory_cancelFilterButton",
      "editHistory_cancelChanges",
      "editHistory_saveChanges",
      "showHistory_filterByChosenRareButton"
    \\]]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]

    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $addCooldown[history;true]

    $timezone[$env[userProfile;timezone]]

    $fn[getPageIndex;$return[$math[$env[page] - 1]];page]

    $jsonLoad[cachedHistory;$getMessageVar[cachedHistory;$messageID]]
    $jsonLoad[history;$env[cachedHistory;history]]

    $let[IID;$env[IID;0]]
    $let[input;$input[showHistory_modalInput]]
    $let[page;$env[cachedHistory;page]]
    $let[sortType;$nullish[$selectMenuValues;$env[cachedHistory;sortType];0]]
    $let[rareAnimalId;$env[cachedHistory;rareAnimalId]]
    $let[filter;$env[cachedHistory;filter]]
    

    $switch[$get[IID];
      $case[showHistory_prevPage;
        $letSub[page;1]
      ]


      $case[showHistory_nextPage;
        $letSum[page;1]
      ]


      $case[showHistory_changePageInModal;
        $onlyIf[$isNumber[$get[input]];
          $newError[$tl[ui.history.providedPageIsNotANumber]]
        ]

        $let[page;$get[input]]
      ]


      $case[showHistory_deletePage;
        $jsonLoad[thisHistory;$env[history;$callFn[getPageIndex;$get[page]]]]
        $historyEmbed[$env[thisHistory]]
        $addContainer[
          $addTextDisplay[$tl[ui.history.deletePageWarning]]
          $addActionRow
          $addButton[showHistory_confirmDeletePage-$authorID;$tl[ui.history.buttonLabelConfirm];Success;✅]
          $addButton[showHistory_declineDeletePage-$authorID;$tl[ui.history.buttonLabelDecline];Danger;❌]
        ;$getGlobalVar[luckyColor]]
        $interactionUpdate
        $stop
      ]

      $case[showHistory_confirmDeletePage;
        $let[id;$env[history;$callFn[getPageIndex;$get[page]];id]]

        $onlyIf[$get[id]!=]

        $jsonLoad[history;$getUserVar[challengeHistory]]
        $let[index;$arrayFindIndex[history;page;$env[page;id]==$get[id]]]

        $onlyIf[$get[index]!=-1]

        $!arraySplice[history;$get[index];1]
        $setUserVar[challengeHistory;$env[history]]
        $if[$get[filter];
          $arrayFilter[history;page;$env[page;raresList;$get[rareAnimalId]]!=;history]
        ]
        $jsonLoad[history;$sortHistory[$env[history];$get[sortType]]]
      ]


      $case[showHistory_showPages;
        $modal[showHistory_changePageInModal-$authorID;$tl[ui.history.modalTitleMoveToPage]]
        $addTextInput[showHistory_modalInput;$tl[ui.history.modalDescriptionMoveToPage];Short;true;;;1;5]
        $showModal
        $stop
      ]


      $case[showHistory_sortingMenu;
        $if[$and[$get[sortType]==3;$get[rareAnimalId]==null];
          $modal[showHistory_sortByRare-$authorID;$tl[ui.history.modalTitleSortByRare]]
          $addTextInput[showHistory_modalInput;$tl[ui.history.modalDescriptionSortByRare];Short;true;$tl[ui.history.modalPlaceholderSortByRare]]
          $showModal
          $stop
        ]

        $jsonLoad[history;$sortHistory[$env[history];$get[sortType]]]
        $!jsonSet[cachedHistory;sortType;$get[sortType]]
      ]


      $case[showHistory_sortByRare;
        $jsonLoad[allRares;$getGlobalVar[allRares]]
        $onlyIf[$arrayIncludes[allRares;$get[input]];
          $newError[$tl[ui.history.invalidRare]]
        ]
        $let[rareAnimalId;$getRareAnimalID[$get[input]]]
        $let[sortType;3]
        $jsonLoad[history;$sortHistory[$env[history];$get[sortType]]]
        $!jsonSet[cachedHistory;sortType;$get[sortType]]
      ]


      $case[showHistory_filterByRareButton;
        $modal[showHistory_filterByRare-$authorID;$tl[ui.history.modalTitleFilterByRare]]
        $addTextInput[showHistory_modalInput;$tl[ui.history.modalDescriptionFilterByRare];Short;true;$tl[ui.history.modalPlaceholderFilterByRare]]
        $showModal
        $stop
      ]


      $case[showHistory_filterByRare;
        $jsonLoad[allRares;$getGlobalVar[allRares]]
        $onlyIf[$arrayIncludes[allRares;$get[input]];
          $newError[$tl[ui.history.invalidRare]]
        ]
        $let[rareAnimalId;$getRareAnimalID[$get[input]]]
        $let[page;1]
        $jsonLoad[history;$getUserVar[challengeHistory]]
        $arrayFilter[history;page;$env[page;raresList;$get[rareAnimalId]]!=;history]
        $jsonLoad[history;$sortHistory[$env[history];$get[sortType]]]
        $!jsonSet[cachedHistory;filter;true]
      ]

      $case[showHistory_filterByChosenRareButton;
        $let[page;1]
        $arrayFilter[history;page;$env[page;raresList;$get[rareAnimalId]]!=;history]
        $jsonLoad[history;$sortHistory[$env[history];$get[sortType]]]
        $!jsonSet[cachedHistory;filter;true]
      ]


      $case[showHistory_cancelFilterButton;
        $let[page;1]
        $jsonLoad[history;$getUserVar[challengeHistory]]
        $jsonLoad[history;$sortHistory[$env[history];$get[sortType]]]
        $!jsonSet[cachedHistory;filter;false]
      ]

      $case[editHistory_cancelChanges;
        $deleteMessageVar[cachedThisHistory;$messageID]
      ]

      $case[editHistory_saveChanges;
        $jsonLoad[cachedThisHistory;$getMessageVar[cachedThisHistory;$messageID]]
        $jsonLoad[challengeHistory;$getUserVar[challengeHistory]]

        $let[cachedThisHistoryId;$env[cachedThisHistory;id]]
        $let[i;$arrayFindIndex[challengeHistory;page;$env[page;id]==$get[cachedThisHistoryId]]]

        $onlyIf[$get[i]!=-1]

        $!jsonSet[challengeHistory;$get[i];$env[cachedThisHistory]]
        $!jsonSet[history;$callFn[getPageIndex;$get[page]];$env[cachedThisHistory]]
        $setUserVar[challengeHistory;$env[challengeHistory]]
        $deleteMessageVar[cachedThisHistory;$messageID]
      ]
    ]

    $let[page;$if[$get[page]<=0;$arrayLength[history];$if[$get[page]>$arrayLength[history];1;$get[page]]]]

    $jsonLoad[thisHistory;$env[history;$callFn[getPageIndex;$get[page]]]]
    

    $c[Updating "page" if it's value was changed]
    $if[$env[cachedHistory;page]!=$get[page];
      $!jsonSet[cachedHistory;page;$get[page]]
    ]

    $c[Updating "rareAnimalId" if it's value was changed]
    $if[$env[cachedHistory;rareAnimalId]!=$get[rareAnimalId];
      $!jsonSet[cachedHistory;rareAnimalId;$get[rareAnimalId]]
    ]

    $c[Updating "history" if sorting or any page was changed]
    $if[$advJsonStringify[$env[cachedHistory;history];0]!=$jsonStringify[history;0];
      $!jsonSet[cachedHistory;history;$env[history]]
    ]
    
    $setMessageVar[cachedHistory;$env[cachedHistory];$messageID]

    $historyEmbed[$env[thisHistory]]
    $showHistoryExtraEmbed[$env[cachedHistory]]
    $interactionUpdate

    $newHistoryTimeout
  `
}]