"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'handleClearcoins',
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $onlyIf[$env[userProfile;MC]>0;
      $newError[$tl[$get[l];ui;clearcoins.noCash]]
    ]

    $defer

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[$get[l];ui;clearcoins.warn;$separate[$env[userProfile;MC]]]]

      $addActionRow
      $addButton[confirmClearingCoins-$authorID;$tl[$get[l];ui;clearcoins.buttonLabelConfirm];Success]
      $addButton[declineClearingCoins-$authorID;$tl[$get[l];ui;clearcoins.buttonLabelDecline];Danger]
    ;Orange]
    $newCommandTimeout
  `
};
//# sourceMappingURL=clearCoins.js.map