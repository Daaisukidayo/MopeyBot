"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edge_1 = require("@quoriel/edge");
exports.default = new edge_1.Command({
    name: "showHistory",
    type: "interactionCreate",
    allowed: ["button", "modal", "stringSelect"],
    code: `
    $arrayLoad[IID;-;$customID]
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $addCooldown[showhistory;true]
    $timezone[$jsonGet[userProfile;timezone]]

    $jsonLoad[cachedHistory;$getMessageVar[cachedHistory;$messageID]]
    $jsonLoad[history;$jsonGet[cachedHistory;history]]

    $let[input;$input[modalInput]]
    $let[page;$jsonGet[cachedHistory;page]]
    $c[Each select menu sets only its own option: sort type or order]
    $let[sortType;$nullish[$if[$jsonGet[IID;1]==sortingMenu;$selectMenuValues];$jsonGet[cachedHistory;sortType];0]]
    $let[sortOrder;$nullish[$if[$jsonGet[IID;1]==orderMenu;$selectMenuValues];$jsonGet[cachedHistory;sortOrder];desc]]
    $let[rareAnimalId;$jsonGet[cachedHistory;rareAnimalId]]
    $let[filter;$jsonGet[cachedHistory;filter]]

    $c[After a change of order, filter or pages, the pages are filtered and sorted again at the end]
    $switch[$jsonGet[IID;1];
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
        $let[page;$floor[$get[input]]]
      ]

      $case[deletePage;
        $historyEmbed[$jsonGet[history;$math[$get[page] - 1]]]
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
        $let[id;$jsonGet[history;$math[$get[page] - 1];id]]
        $jsonLoad[challengeHistory;$getUserVar[challengeHistory]]
        $let[index;$arrayFindIndex[challengeHistory;page;$jsonGet[page;id]==$get[id]]]

        $onlyIf[$and[$get[id]!=;$get[index]!=-1];
          $newError[$tl[ui.history.pageDoesNotExist.$get[l]]]
        ]

        $!arraySplice[challengeHistory;$get[index];1]
        $setUserVar[challengeHistory;$env[challengeHistory]]
        $jsonLoad[history;$env[challengeHistory]]
        $let[refresh;true]
      ]

      $case[declineDeletePage;]

      $case[showPages;
        $modal[showHistory-changePageInModal-$authorID;$tl[ui.history.modalTitleMoveToPage.$get[l]]]
        $addTextInput[modalInput;$tl[ui.history.modalDescriptionMoveToPage.$get[l]];Short;true;;;1;5]
        $showModal
        $stop
      ]

      $case[sortingMenu;
        $c[Sorting by a rare needs the rare first]
        $if[$and[$get[sortType]==3;$get[rareAnimalId]==];
          $modal[showHistory-sortByRare-$authorID;$tl[ui.history.modalTitleSortByRare.$get[l]]]
          $addTextInput[modalInput;$tl[ui.history.modalDescriptionSortByRare.$get[l]];Short;true;$tl[ui.history.modalPlaceholderSortByRare.$get[l]]]
          $showModal
          $stop
        ]
        $let[refresh;true]
      ]

      $case[orderMenu;
        $let[refresh;true]
      ]

      $case[sortByRare;
        $let[rareAnimalId;$getRareAnimalID[$toLowerCase[$get[input]]]]
        $onlyIf[$get[rareAnimalId]!=undefined;
          $newError[$tl[ui.history.invalidRare.$get[l]]]
        ]
        $let[sortType;3]
        $let[refresh;true]
      ]

      $case[filterByRareButton;
        $modal[showHistory-filterByRare-$authorID;$tl[ui.history.modalTitleFilterByRare.$get[l]]]
        $addTextInput[modalInput;$tl[ui.history.modalDescriptionFilterByRare.$get[l]];Short;true;$tl[ui.history.modalPlaceholderFilterByRare.$get[l]]]
        $showModal
        $stop
      ]

      $case[filterByRare;
        $let[rareAnimalId;$getRareAnimalID[$toLowerCase[$get[input]]]]
        $onlyIf[$get[rareAnimalId]!=undefined;
          $newError[$tl[ui.history.invalidRare.$get[l]]]
        ]
        $jsonLoad[history;$getUserVar[challengeHistory]]
        $let[filter;true]
        $let[page;1]
        $let[refresh;true]
      ]

      $case[filterByChosenRareButton;
        $let[filter;true]
        $let[page;1]
        $let[refresh;true]
      ]

      $case[cancelFilterButton;
        $jsonLoad[history;$getUserVar[challengeHistory]]
        $let[filter;false]
        $let[page;1]
        $let[refresh;true]
      ]

      $case[cancelEditChanges;
        $deleteMessageVar[cachedThisHistory;$messageID]
        $deleteMessageVar[cachedHistoryPageIndex;$messageID]
      ]

      $case[saveEditChanges;
        $jsonLoad[cachedThisHistory;$getMessageVar[cachedThisHistory;$messageID]]
        $jsonLoad[challengeHistory;$getUserVar[challengeHistory]]
        $let[index;$arrayFindIndex[challengeHistory;page;$jsonGet[page;id]==$jsonGet[cachedThisHistory;id]]]

        $onlyIf[$get[index]!=-1;
          $newError[$tl[ui.history.pageDoesNotExist.$get[l]]]
        ]

        $!jsonSet[challengeHistory;$get[index];$env[cachedThisHistory]]
        $!jsonSet[history;$math[$get[page] - 1];$env[cachedThisHistory]]
        $setUserVar[challengeHistory;$env[challengeHistory]]
        $deleteMessageVar[cachedThisHistory;$messageID]
        $deleteMessageVar[cachedHistoryPageIndex;$messageID]
      ]

      $case[editPage;
        $c[A new edit finds the page index again instead of reusing an earlier one]
        $deleteMessageVar[cachedHistoryPageIndex;$messageID]
        $jsonLoad[thisHistory;$jsonGet[history;$math[$get[page] - 1]]]
        $setMessageVar[cachedThisHistory;$env[thisHistory];$messageID]

        $historyEmbed[$env[thisHistory];editHistory]
        $editHistoryExtraEmbed[thisHistory;history]
        $interactionUpdate

        $newHistoryTimeout
        $stop
      ]

      $case[default;
        $stop
      ]
    ]

    $c[When filtered, only pages with the chosen rare are shown, in the chosen order]
    $if[$get[refresh];
      $if[$get[filter];
        $arrayFilter[history;page;$jsonGet[page;raresList;$get[rareAnimalId]]!=;history]
      ]
      $jsonLoad[history;$sortHistory[$env[history];$get[sortType];$get[rareAnimalId];$get[sortOrder]]]
    ]

    $c[Pages wrap around]
    $let[page;$if[$get[page]<=0;$jsonSize[history];$if[$get[page]>$jsonSize[history];1;$get[page]]]]

    $objectMerge[cachedHistory;$objectOf[page;$get[page];sortType;$get[sortType];sortOrder;$get[sortOrder];rareAnimalId;$default[$get[rareAnimalId];null];filter;$get[filter]]]
    $!jsonSet[cachedHistory;history;$env[history]]
    $setMessageVar[cachedHistory;$env[cachedHistory];$messageID]

    $historyEmbed[$jsonGet[history;$math[$get[page] - 1]]]
    $showHistoryExtraEmbed[$env[cachedHistory]]
    $interactionUpdate

    $newHistoryTimeout
  `
});
//# sourceMappingURL=handler.js.map