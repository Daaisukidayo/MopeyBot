export default {
  name: "addHistoryExtraEmbed",
  code: `
    $let[l;$env[userProfile;language]]
    $addContainer[
      $addActionRow
      $addButton[addHistory-uploadNewHistoryPage-$authorID;$tl[ui.addhistory.buttonLabelUpload.$get[l]];Success;;$or[$env[addHistorySavedConfig;points]==0;$env[addHistorySavedConfig;rares]==0;$env[addHistorySavedConfig;endDate]==0;$env[addHistorySavedConfig;raresList]=={}]]
      $addButton[addHistory-resetNewHistoryPage-$authorID;$tl[ui.addhistory.buttonLabelReset.$get[l]];Secondary]
      $addButton[addHistory-cancelNewHistoryPage-$authorID;$tl[ui.addhistory.buttonLabelCancel.$get[l]];Primary]

      $addSeparator[Large]

      $addActionRow
      $addStringSelectMenu[addHistory-editOptions-$authorID;$tl[ui.history.menuTitleChooseOptions.$get[l]]]
      $addOption[$tl[ui.history.optionNamePoints.$get[l]];;points]
      $addOption[$tl[ui.history.optionNameRares.$get[l]];;raresQuantity]
      $addOption[$tl[ui.history.optionNamePlayType.$get[l]];;playType]
      $addOption[$tl[ui.history.optionNameDifficulty.$get[l]];;difficulty]
      $addOption[$tl[ui.history.optionNameEndDate.$get[l]];;endDate]
      $addOption[$tl[ui.history.optionNameRaresList.$get[l]];;raresList]
    ;$getGlobalVar[luckyColor]]
  `
}