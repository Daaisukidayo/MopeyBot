export default {
  name: "showHistoryExtraEmbed",
  description: "Displays an extra embed with page buttons, sort menu, etc.",
  params: [
    {
      name: "_historyData_",
      description: "The cached history object.",
      type: "Json",
      required: true,
    }
  ],
  code: `
    $jsonLoad[sortingOptions;$getGlobalVar[sortingOptions]]
    
    $let[l;$env[userProfile;language]]
    $let[page;$env[_historyData_;page]]
    $let[sortType;$env[_historyData_;sortType]]
    $let[rareAnimalId;$env[_historyData_;rareAnimalId]]
    $let[filter;$env[cachedHistory;filter]]
    $jsonLoad[history;$env[_historyData_;history]]

    $let[entriesCount;$arrayLength[history]]
    $let[disableEditing;$not[$checkCondition[$get[entriesCount]>0]]]
    $let[disablePages;$not[$checkCondition[$get[entriesCount]>1]]]

    $let[rareEmoji;$getAnimalVariantInfo[$get[rareAnimalId];emoji]]

    $fn[getFinalEmoji;
      $if[$get[rareAnimalId]!=null;
        $return[$get[rareEmoji]]
      ]
      $return[$getGlobalVar[undefined]]
    ]

    $fn[getEmoji;
      $return[$switch[$env[_sortType];
        $case[0;📅]
        $case[1;🔢]
        $case[2;🎏]
        $case[3;$callFn[getFinalEmoji]]
      ]]
    ;_sortType]

    $addContainer[
      $addActionRow
      $addButton[showHistory-deletePage-$authorID;$tl[ui.history.buttonLabelDelete.$get[l]];Danger;🗑️;$get[disableEditing]]
      $addButton[showHistory-editPage-$authorID;$tl[ui.history.buttonLabelEdit.$get[l]];Success;✏️;$get[disableEditing]]
      
      $addSeparator[Large]

      $addActionRow
      $addButton[showHistory-prevPage-$authorID;;Primary;⬅️;$get[disablePages]]
      $addButton[showHistory-showPages-$authorID;$tl[ui.history.buttonLabelPage.$get[l];$get[page];$get[entriesCount]];Primary;🔎;$get[disablePages]]
      $addButton[showHistory-nextPage-$authorID;;Primary;➡️;$get[disablePages]]

      $addSeparator[Large]

      $addActionRow
      $addStringSelectMenu[showHistory-sortingMenu-$authorID;;$get[disablePages]]
      $arrayForEach[sortingOptions;option;
        $addOption[$tl[ui.history.optionNameSort.$get[l];$tl[data.sortingOptions.$env[option].$get[l]]];;$env[option];$callFn[getEmoji;$env[option]];$checkCondition[$get[sortType]==$env[option]]]
      ]

      $addActionRow
      $addButton[showHistory-filterByRareButton-$authorID;$tl[ui.history.buttonLabelFilterByRare.$get[l]];Secondary;$getGlobalVar[filter]]
      $if[$get[filter];
        $addButton[showHistory-cancelFilterButton-$authorID;$tl[ui.history.buttonLabelCancelFilter.$get[l]];Danger;$getGlobalVar[filter]]
      ;
        $if[$get[rareAnimalId]!=null;
          $addButton[showHistory-filterByChosenRareButton-$authorID;$tl[ui.history.buttonLabelFilterByRare.$get[l]];Success;$get[rareEmoji]]
        ]
      ]
    ;$getGlobalVar[luckyColor]]
  `
}