export default {
  name: "editHistoryExtraEmbed",
  code: `
    $let[l;$env[userProfile;language]]
    $addContainer[
      $addActionRow
      $addStringSelectMenu[editHistory_selectEditOption-$authorID;$tl[$get[l];ui;history.menuTitleChooseOptions]]
      $addOption[$tl[$get[l];ui;history.optionNamePoints];;points]
      $addOption[$tl[$get[l];ui;history.optionNameRares];;raresQuantity]
      $addOption[$tl[$get[l];ui;history.optionNamePlayType];;playType]
      $addOption[$tl[$get[l];ui;history.optionNameDifficulty];;difficulty]
      $addOption[$tl[$get[l];ui;history.optionNameEndDate];;endDate]
      $addOption[$tl[$get[l];ui;history.optionNameRaresList];;raresList]
      
      $addActionRow
      $addButton[editHistory_saveChanges-$authorID;$tl[$get[l];ui;history.buttonLabelSaveChanges];Success]
      $addButton[editHistory_resetChanges-$authorID;$tl[$get[l];ui;history.buttonLabelResetChanges];Secondary]
      $addButton[editHistory_cancelChanges-$authorID;$tl[$get[l];ui;history.buttonLabelCancelChanges];Danger]
    ;$getGlobalVar[luckyColor]]
  `
}