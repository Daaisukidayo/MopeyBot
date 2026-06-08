"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "addHistoryExtraEmbed",
    code: `
    $let[l;$env[userProfile;language]]
    $addContainer[
      $addActionRow
      $addButton[uploadNewHistoryPage-$authorID;$tl[$get[l];ui;addhistory.buttonLabelUpload];Success;;$disabledUploadButton]
      $addButton[resetNewHistoryPage-$authorID;$tl[$get[l];ui;addhistory.buttonLabelReset];Secondary]
      $addButton[cancelNewHistoryPage-$authorID;$tl[$get[l];ui;addhistory.buttonLabelCancel];Primary]

      $addSeparator[Large]

      $addActionRow
      $addStringSelectMenu[historyChooseAdd-$authorID;$tl[$get[l];ui;history.menuTitleChooseOptions]]
      $addOption[$tl[$get[l];ui;history.optionNamePoints];;points]
      $addOption[$tl[$get[l];ui;history.optionNameRares];;raresQuantity]
      $addOption[$tl[$get[l];ui;history.optionNamePlayType];;playType]
      $addOption[$tl[$get[l];ui;history.optionNameDifficulty];;difficulty]
      $addOption[$tl[$get[l];ui;history.optionNameEndDate];;endDate]
      $addOption[$tl[$get[l];ui;history.optionNameRaresList];;raresList]
    ;$getGlobalVar[luckyColor]]
  `
};
//# sourceMappingURL=extraEmbed.js.map