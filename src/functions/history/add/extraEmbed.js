export default {
  name: "addHistoryExtraEmbed",
  code: `
    $addContainer[
      $addActionRow
      $addStringSelectMenu[historyChooseAdd-$authorID;$tl[ui.history.menuTitleChooseOptions]]
      $addOption[$tl[ui.history.optionNamePoints];;points]
      $addOption[$tl[ui.history.optionNameRares];;raresQuantity]
      $addOption[$tl[ui.history.optionNamePlayType];;playType]
      $addOption[$tl[ui.history.optionNameDifficulty];;difficulty]
      $addOption[$tl[ui.history.optionNameEndDate];;endDate]
      $addOption[$tl[ui.history.optionNameRaresList];;raresList]

      $addActionRow
      $addButton[uploadNewHistoryPage-$authorID;$tl[ui.addHistory.buttonLabelUpload];Success;;$disabledUploadButton]
      $addButton[resetNewHistoryPage-$authorID;$tl[ui.addHistory.buttonLabelReset];Secondary]
      $addButton[cancelNewHistoryPage-$authorID;$tl[ui.addHistory.buttonLabelCancel];Primary]
    ;$getGlobalVar[luckyColor]]
  `
}