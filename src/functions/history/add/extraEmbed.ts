export default {
  name: "addHistoryExtraEmbed",
  code: `
    $let[l;$env[userProfile;language]]
    $addContainer[
      $addActionRow
      $addButton[addHistory-uploadNewHistoryPage-$authorID;$tl[$get[l];ui;addhistory.buttonLabelUpload];Success;;$or[$env[addHistorySavedConfig;points]==0;$env[addHistorySavedConfig;rares]==0;$env[addHistorySavedConfig;endDate]==0;$env[addHistorySavedConfig;raresList]=={}]]
      $addButton[addHistory-resetNewHistoryPage-$authorID;$tl[$get[l];ui;addhistory.buttonLabelReset];Secondary]
      $addButton[addHistory-cancelNewHistoryPage-$authorID;$tl[$get[l];ui;addhistory.buttonLabelCancel];Primary]

      $addSeparator[Large]

      $addActionRow
      $addStringSelectMenu[addHistory-editOptions-$authorID;$tl[$get[l];ui;history.menuTitleChooseOptions]]
      $addOption[$tl[$get[l];ui;history.optionNamePoints];;points]
      $addOption[$tl[$get[l];ui;history.optionNameRares];;raresQuantity]
      $addOption[$tl[$get[l];ui;history.optionNamePlayType];;playType]
      $addOption[$tl[$get[l];ui;history.optionNameDifficulty];;difficulty]
      $addOption[$tl[$get[l];ui;history.optionNameEndDate];;endDate]
      $addOption[$tl[$get[l];ui;history.optionNameRaresList];;raresList]
    ;$getGlobalVar[luckyColor]]
  `
}