export default {
  name: "editHistoryExtraEmbed",
  code: `
    $addContainer[
      $addActionRow
      $addStringSelectMenu[editHistory_selectEditOption-$authorID;$tl[ui.history.menuTitleChooseOptions]]
      $addOption[$tl[ui.history.optionNamePoints];;points]
      $addOption[$tl[ui.history.optionNameRares];;raresQuantity]
      $addOption[$tl[ui.history.optionNamePlayType];;playType]
      $addOption[$tl[ui.history.optionNameDifficulty];;difficulty]
      $addOption[$tl[ui.history.optionNameEndDate];;endDate]
      $addOption[$tl[ui.history.optionNameRaresList];;raresList]
      
      $addActionRow
      $addButton[editHistory_saveChanges-$authorID;$tl[ui.history.buttonLabelSaveChanges];Success]
      $addButton[editHistory_resetChanges-$authorID;$tl[ui.history.buttonLabelResetChanges];Secondary]
      $addButton[editHistory_cancelChanges-$authorID;$tl[ui.history.buttonLabelCancelChanges];Danger]
    ;$getGlobalVar[luckyColor]]
  `
}