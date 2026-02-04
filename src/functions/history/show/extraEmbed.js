export default {
  name: "showHistoryExtraEmbed",
  code: `
    $jsonLoad[sortingOptions;$getGlobalVar[sortingOptions]]
    $addContainer[
      $if[$arrayLength[history]>0;
        $addActionRow
        $addButton[$get[page]-$get[sortType]-deleteHistoryPage-$authorID;$tl[ui.history.buttonLabelDelete];Danger;🗑️]
        $addButton[$get[page]-$get[sortType]-editHistoryPage-$authorID;$tl[ui.history.buttonLabelEdit];Success;✏️]
      ]

      $if[$arrayLength[history]>1;
        $addSeparator[Large]
        $addActionRow
        $addButton[$get[page]-$get[sortType]-historyPageLeft-$authorID;;Primary;⬅️]
        $addButton[$get[page]-$get[sortType]-historyPageCustom-$authorID;$tl[ui.history.buttonLabelPage;$get[page];$arrayLength[history]];Primary;🔎]
        $addButton[$get[page]-$get[sortType]-historyPageRight-$authorID;;Primary;➡️]

        $addSeparator[Large]
        $addActionRow
        $addStringSelectMenu[sortHis-$authorID;$tl[ui.history.menuTitleSort]]
        $arrayForEach[sortingOptions;option;
          $addOption[$tl[ui.history.optionNameSort;$tl[data.sortingOptions.$env[option]]];;$get[page]-$env[option];;$checkCondition[$get[sortType]==$env[option]]]
        ]
      ]
    ;$getGlobalVar[luckyColor]]
  `
}