"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "handleAddHistory",
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]

    $checkProfile
    $addCooldown

    $defer

    $c[the draft page sticks around until upload or cancel]
    $let[saved;$getUserVar[addHistorySavedConfig]]
    $jsonLoad[addHistorySavedConfig;$if[$get[saved]==;$addHistoryNewConfig;$get[saved]]]

    $historyEmbed[$env[addHistorySavedConfig];addHistory]
    $addHistoryExtraEmbed[addHistorySavedConfig]
    $newCommandTimeout
  `,
});
//# sourceMappingURL=add.js.map