"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "handleClearcoins",
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $onlyIf[$jsonGet[userProfile;MC]>0;
      $newError[$tl[ui.clearcoins.noCash.$get[l]]]
    ]

    $defer

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.clearcoins.warn.$get[l];$separate[$jsonGet[userProfile;MC]]]]

      $addActionRow
      $addButton[clearCoins-confirm-$authorID;$tl[ui.clearcoins.buttonLabelConfirm.$get[l]];Success]
      $addButton[clearCoins-decline-$authorID;$tl[ui.clearcoins.buttonLabelDecline.$get[l]];Danger]
    ;Orange]
    $newCommandTimeout
  `
});
//# sourceMappingURL=clearCoins.js.map