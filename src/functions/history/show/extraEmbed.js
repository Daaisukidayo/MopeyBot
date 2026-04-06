export default {
  name: "showHistoryExtraEmbed",
  description: "Displays an extra embed with page buttons, sort menu, etc.",
  params: [
    {
      name: "c",
      description: "The cached history object.",
      type: "Json",
      required: true,
    }
  ],
  code: `
    $jsonLoad[sortingOptions;$getGlobalVar[sortingOptions]]
    
    $let[page;$env[c;page]]
    $let[sortType;$env[c;sortType]]
    $let[rareAnimalId;$env[c;rareAnimalId]]
    $let[filter;$env[cachedHistory;filter]]
    $jsonLoad[h;$env[c;history]]

    $let[l;$arrayLength[h]]
    $let[disableEditing;$not[$checkCondition[$get[l]>0]]]
    $let[disablePages;$not[$checkCondition[$get[l]>1]]]

    $addContainer[
      $addActionRow
      $addButton[showHistory_deletePage-$authorID;$tl[ui.history.buttonLabelDelete];Danger;🗑️;$get[disableEditing]]
      $addButton[showHistory_editPage-$authorID;$tl[ui.history.buttonLabelEdit];Success;✏️;$get[disableEditing]]
      
      $addSeparator[Large]

      $addActionRow
      $addButton[showHistory_prevPage-$authorID;;Primary;⬅️;$get[disablePages]]
      $addButton[showHistory_showPages-$authorID;$tl[ui.history.buttonLabelPage;$get[page];$get[l]];Primary;🔎;$get[disablePages]]
      $addButton[showHistory_nextPage-$authorID;;Primary;➡️;$get[disablePages]]

      $addSeparator[Large]

      $addActionRow
      $addStringSelectMenu[showHistory_sortingMenu-$authorID;;$get[disablePages]]
      $arrayForEach[sortingOptions;option;
        $addOption[$tl[ui.history.optionNameSort;$tl[data.sortingOptions.$env[option]]];;$env[option];;$checkCondition[$get[sortType]==$env[option]]]
      ]

      $addActionRow
      $addButton[showHistory_filterByRareButton-$authorID;$tl[ui.history.buttonLabelFilterByRare];Secondary;$getGlobalVar[filter]]
      $if[$get[filter];
        $addButton[showHistory_cancelFilterButton-$authorID;$tl[ui.history.buttonLabelCancelFilter];Danger;$getGlobalVar[filter]]
      ]
    ;$getGlobalVar[luckyColor]]
  `
}