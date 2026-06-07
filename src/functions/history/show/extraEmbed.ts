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
      $addButton[showHistory_deletePage-$authorID;$tl[$get[l];ui;history.buttonLabelDelete];Danger;🗑️;$get[disableEditing]]
      $addButton[showHistory_editPage-$authorID;$tl[$get[l];ui;history.buttonLabelEdit];Success;✏️;$get[disableEditing]]
      
      $addSeparator[Large]

      $addActionRow
      $addButton[showHistory_prevPage-$authorID;;Primary;⬅️;$get[disablePages]]
      $addButton[showHistory_showPages-$authorID;$tl[$get[l];ui;history.buttonLabelPage;$get[page];$get[entriesCount]];Primary;🔎;$get[disablePages]]
      $addButton[showHistory_nextPage-$authorID;;Primary;➡️;$get[disablePages]]

      $addSeparator[Large]

      $addActionRow
      $addStringSelectMenu[showHistory_sortingMenu-$authorID;;$get[disablePages]]
      $arrayForEach[sortingOptions;option;
        $addOption[$tl[$get[l];ui;history.optionNameSort;$tl[$get[l];data;sortingOptions.$env[option]]];;$env[option];$callFn[getEmoji;$env[option]];$checkCondition[$get[sortType]==$env[option]]]
      ]

      $addActionRow
      $addButton[showHistory_filterByRareButton-$authorID;$tl[$get[l];ui;history.buttonLabelFilterByRare];Secondary;$getGlobalVar[filter]]
      $if[$get[filter];
        $addButton[showHistory_cancelFilterButton-$authorID;$tl[$get[l];ui;history.buttonLabelCancelFilter];Danger;$getGlobalVar[filter]]
      ;
        $if[$get[rareAnimalId]!=null;
          $addButton[showHistory_filterByChosenRareButton-$authorID;$tl[$get[l];ui;history.buttonLabelFilterByRare];Success;$get[rareEmoji]]
        ]
      ]
    ;$getGlobalVar[luckyColor]]
  `
}