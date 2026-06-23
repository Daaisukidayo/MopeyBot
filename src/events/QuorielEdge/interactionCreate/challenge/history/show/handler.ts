export default {
  name: "showHistory",
  type: "interactionCreate",
  allowed: ["button", "modal", "stringSelect"],
  code: `
    $arrayLoad[IID;-;$customID]
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $fn[getPageIndex;$return[$math[$get[page] - 1]]]
    
    $addCooldown[showhistory;true]
    $timezone[$env[userProfile;timezone]]

    $jsonLoad[cachedHistory;$getMessageVar[cachedHistory;$messageID]]
    $jsonLoad[history;$env[cachedHistory;history]]

    $let[actionId;$env[IID;1]]
    $let[input;$input[modalInput]]
    $let[page;$env[cachedHistory;page]]
    $let[sortType;$nullish[$selectMenuValues;$env[cachedHistory;sortType];0]]
    $let[rareAnimalId;$env[cachedHistory;rareAnimalId]]
    $let[filter;$env[cachedHistory;filter]]
    

    $switch[$get[actionId];
      $case[prevPage;
        $letSub[page;1]
      ]


      $case[nextPage;
        $letSum[page;1]
      ]


      $case[changePageInModal;
        $onlyIf[$isNumber[$get[input]];
          $newError[$tl[ui.history.providedPageIsNotANumber.$get[l]]]
        ]

        $let[page;$get[input]]
      ]


      $case[deletePage;
        $jsonLoad[thisHistory;$env[history;$callFn[getPageIndex]]]
        $historyEmbed[$env[thisHistory]]
        $addContainer[
          $addTextDisplay[$tl[ui.history.deletePageWarning.$get[l]]]
          $addActionRow
          $addButton[showHistory-confirmDeletePage-$authorID;$tl[ui.history.buttonLabelConfirm.$get[l]];Success]
          $addButton[showHistory-declineDeletePage-$authorID;$tl[ui.history.buttonLabelDecline.$get[l]];Danger]
        ;$getGlobalVar[luckyColor]]
        $interactionUpdate
        $stop
      ]

      $case[confirmDeletePage;
        $let[id;$env[history;$callFn[getPageIndex];id]]

        $onlyIf[$get[id]!=;
          $newError[$tl[ui.history.pageDoesNotExist.$get[l]]]
        ]

        $jsonLoad[history;$getUserVar[challengeHistory]]
        $let[index;$arrayFindIndex[history;page;$env[page;id]==$get[id]]]

        $onlyIf[$get[index]!=-1;
          $newError[$tl[ui.history.pageDoesNotExist.$get[l]]]
        ]

        $!arraySplice[history;$get[index];1]
        $setUserVar[challengeHistory;$env[history]]
        $if[$get[filter];
          $arrayFilter[history;page;$env[page;raresList;$get[rareAnimalId]]!=;history]
        ]
        $jsonLoad[history;$sortHistory[$env[history];$get[sortType]]]
      ]

      $case[declineDeletePage;]


      $case[showPages;
        $modal[showHistory-changePageInModal-$authorID;$tl[ui.history.modalTitleMoveToPage.$get[l]]]
        $addTextInput[modalInput;$tl[ui.history.modalDescriptionMoveToPage.$get[l]];Short;true;;;1;5]
        $showModal
        $stop
      ]


      $case[sortingMenu;
        $if[$and[$get[sortType]==3;$get[rareAnimalId]==null];
          $modal[showHistory-sortByRare-$authorID;$tl[ui.history.modalTitleSortByRare.$get[l]]]
          $addTextInput[modalInput;$tl[ui.history.modalDescriptionSortByRare.$get[l]];Short;true;$tl[ui.history.modalPlaceholderSortByRare.$get[l]]]
          $showModal
          $stop
        ]

        $jsonLoad[history;$sortHistory[$env[history];$get[sortType]]]
        $!jsonSet[cachedHistory;sortType;$get[sortType]]
      ]


      $case[sortByRare;
        $onlyIf[$arrayIncludes[$getCache[rares;allRares];$get[input]];
          $newError[$tl[ui.history.invalidRare.$get[l]]]
        ]
        $let[rareAnimalId;$getRareAnimalID[$get[input]]]
        $let[sortType;3]
        $jsonLoad[history;$sortHistory[$env[history];$get[sortType]]]
        $!jsonSet[cachedHistory;sortType;$get[sortType]]
      ]


      $case[filterByRareButton;
        $modal[showHistory-filterByRare-$authorID;$tl[ui.history.modalTitleFilterByRare.$get[l]]]
        $addTextInput[modalInput;$tl[ui.history.modalDescriptionFilterByRare.$get[l]];Short;true;$tl[ui.history.modalPlaceholderFilterByRare.$get[l]]]
        $showModal
        $stop
      ]


      $case[filterByRare;
        $onlyIf[$arrayIncludes[$getCache[rares;allRares];$get[input]];
          $newError[$tl[ui.history.invalidRare.$get[l]]]
        ]
        $let[rareAnimalId;$getRareAnimalID[$get[input]]]
        $let[page;1]
        $arrayFilter[$getUserVar[challengeHistory];page;$env[page;raresList;$get[rareAnimalId]]!=;history]
        $jsonLoad[history;$sortHistory[$env[history];$get[sortType]]]
        $!jsonSet[cachedHistory;filter;true]
      ]


      $case[filterByChosenRareButton;
        $let[page;1]
        $arrayFilter[history;page;$env[page;raresList;$get[rareAnimalId]]!=;history]
        $jsonLoad[history;$sortHistory[$env[history];$get[sortType]]]
        $!jsonSet[cachedHistory;filter;true]
      ]


      $case[cancelFilterButton;
        $let[page;1]
        $jsonLoad[history;$sortHistory[$getUserVar[challengeHistory];$get[sortType]]]
        $!jsonSet[cachedHistory;filter;false]
      ]


      $case[cancelEditChanges;
        $deleteMessageVar[cachedThisHistory;$messageID]
        $deleteMessageVar[cachedHistoryPageIndex;$messageID]
      ]


      $case[saveEditChanges;
        $jsonLoad[cachedThisHistory;$getMessageVar[cachedThisHistory;$messageID]]
        $jsonLoad[challengeHistory;$getUserVar[challengeHistory]]

        $let[index;$arrayFindIndex[challengeHistory;page;$env[page;id]==$env[cachedThisHistory;id]]]

        $onlyIf[$get[index]!=-1;
          $newError[$tl[ui.history.pageDoesNotExist.$get[l]]]
        ]

        $!jsonSet[challengeHistory;$get[index];$env[cachedThisHistory]]
        $!jsonSet[history;$callFn[getPageIndex];$env[cachedThisHistory]]
        $setUserVar[challengeHistory;$env[challengeHistory]]
        $deleteMessageVar[cachedThisHistory;$messageID]
      ]


      $case[editPage;
        $jsonLoad[thisHistory;$env[history;$callFn[getPageIndex]]]
        $setMessageVar[cachedThisHistory;$env[thisHistory];$messageID]

        $historyEmbed[$env[thisHistory]]
        $editHistoryExtraEmbed
        $interactionUpdate

        $newHistoryTimeout
        $stop
      ]


      $case[default;
        $stop
      ]
    ]

    $let[page;$if[$get[page]<=0;$arrayLength[history];$if[$get[page]>$arrayLength[history];1;$get[page]]]]

    $jsonLoad[thisHistory;$env[history;$callFn[getPageIndex]]]
    

    $c[Updating "page" if it's value was changed]
    $if[$env[cachedHistory;page]!=$get[page];
      $!jsonSet[cachedHistory;page;$get[page]]
    ]

    $c[Updating "rareAnimalId" if it's value was changed]
    $if[$env[cachedHistory;rareAnimalId]!=$get[rareAnimalId];
      $!jsonSet[cachedHistory;rareAnimalId;$get[rareAnimalId]]
    ]

    $c[Updating "history" if sorting or any page was changed]
    $if[$jsonStringify[$env[cachedHistory;history]]!=$jsonStringify[history];
      $!jsonSet[cachedHistory;history;$env[history]]
    ]
    
    $setMessageVar[cachedHistory;$env[cachedHistory];$messageID]

    $historyEmbed[$env[thisHistory]]
    $showHistoryExtraEmbed[$env[cachedHistory]]
    $interactionUpdate

    $newHistoryTimeout
  `
}