export default {
  name: "editHistoryExtraEmbed",
  code: `
    $addContainer[
      $addActionRow
      $addStringSelectMenu[$get[page]-$get[sortType]-historyChooseEdit-$authorID;$tl[ui.history.menuTitleChooseOptions]]
      $addOption[$tl[ui.history.optionNamePoints];;points]
      $addOption[$tl[ui.history.optionNameRares];;raresQuantity]
      $addOption[$tl[ui.history.optionNamePlayType];;playType]
      $addOption[$tl[ui.history.optionNameDifficulty];;difficulty]
      $addOption[$tl[ui.history.optionNameEndDate];;endDate]
      $addOption[$tl[ui.history.optionNameRaresList];;raresList]
    ;$getGlobalVar[luckyColor]]
  `
}