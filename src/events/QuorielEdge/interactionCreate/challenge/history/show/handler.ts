import { Command } from "@quoriel/edge"

export default new Command({
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

    $c[A view saved before the HistoryView class, or a closed one, is opened again with the command]
    $jsonLoad[view;$getMessageVar[cachedHistory;$messageID]]
    $onlyIf[$isInstance[view];$interactionFail]

    $let[input;$input[modalInput]]

    $switch[$jsonGet[IID;1];
      $case[prevPage;
        $callMethod[view;turn;-1]
      ]

      $case[nextPage;
        $callMethod[view;turn;1]
      ]

      $case[changePageInModal;
        $onlyIf[$isNumber[$get[input]];
          $newError[$tl[ui.history.providedPageIsNotANumber.$get[l]]]
        ]
        $callMethod[view;setPage;$floor[$get[input]]]
      ]

      $case[deletePage;
        $historyEmbed[$callMethod[view;current]]
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
        $new[challengeHistory;ChallengeHistory;$authorID]
        $onlyIf[$callMethod[challengeHistory;remove;$jsonGet[$callMethod[view;current];id]];
          $newError[$tl[ui.history.pageDoesNotExist.$get[l]]]
        ]
        $callMethod[challengeHistory;save]
        $callMethod[view;reload;$getField[challengeHistory;pages]]
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
        $if[$and[$selectMenuValues==3;$jsonGet[view;rareAnimalId]==];
          $modal[showHistory-sortByRare-$authorID;$tl[ui.history.modalTitleSortByRare.$get[l]]]
          $addTextInput[modalInput;$tl[ui.history.modalDescriptionSortByRare.$get[l]];Short;true;$tl[ui.history.modalPlaceholderSortByRare.$get[l]]]
          $showModal
          $stop
        ]
        $callMethod[view;sortBy;$selectMenuValues]
      ]

      $case[orderMenu;
        $callMethod[view;orderBy;$selectMenuValues]
      ]

      $case[sortByRare;
        $let[rareAnimalId;$getRareAnimalID[$toLowerCase[$get[input]]]]
        $onlyIf[$get[rareAnimalId]!=undefined;
          $newError[$tl[ui.history.invalidRare.$get[l]]]
        ]
        $callMethod[view;sortBy;3;$get[rareAnimalId]]
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
        $new[challengeHistory;ChallengeHistory;$authorID]
        $callMethod[view;filterBy;$get[rareAnimalId];$getField[challengeHistory;pages]]
      ]

      $case[filterByChosenRareButton;
        $callMethod[view;filterBy]
      ]

      $case[cancelFilterButton;
        $new[challengeHistory;ChallengeHistory;$authorID]
        $callMethod[view;clearFilter;$getField[challengeHistory;pages]]
      ]

      $case[cancelEditChanges;
        $deleteMessageVar[cachedThisHistory;$messageID]
        $deleteMessageVar[cachedHistoryPageIndex;$messageID]
      ]

      $case[saveEditChanges;
        $jsonLoad[cachedThisHistory;$getMessageVar[cachedThisHistory;$messageID]]
        $new[challengeHistory;ChallengeHistory;$authorID]
        $onlyIf[$callMethod[challengeHistory;replace;$env[cachedThisHistory]];
          $newError[$tl[ui.history.pageDoesNotExist.$get[l]]]
        ]
        $callMethod[challengeHistory;save]
        $callMethod[view;replaceCurrent;$env[cachedThisHistory]]
        $deleteMessageVar[cachedThisHistory;$messageID]
        $deleteMessageVar[cachedHistoryPageIndex;$messageID]
      ]

      $case[editPage;
        $c[A new edit finds the page index again instead of reusing an earlier one]
        $deleteMessageVar[cachedHistoryPageIndex;$messageID]
        $jsonLoad[thisHistory;$callMethod[view;current]]
        $jsonLoad[history;$getField[view;history]]
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

    $setMessageVar[cachedHistory;$env[view];$messageID]

    $historyEmbed[$callMethod[view;current]]
    $showHistoryExtraEmbed[$env[view]]
    $interactionUpdate

    $newHistoryTimeout
  `,
})
