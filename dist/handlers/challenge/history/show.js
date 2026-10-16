"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "handleShowHistory",
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer

    $c[A new view starts on the first page, newest first, as the base view does]
    $jsonLoad[history;$sortHistory[$getUserVar[challengeHistory];0]]
    $jsonLoad[cachedHistory;$getGlobalVar[baseCachedHistory]]
    $!jsonSet[cachedHistory;history;$env[history]]

    $historyEmbed[$jsonGet[history;0]]
    $showHistoryExtraEmbed[$env[cachedHistory]]
    $let[mid;$send]

    $setMessageVar[cachedHistory;$env[cachedHistory];$get[mid]]

    $newHistoryTimeout[$get[mid]]
  `,
});
//# sourceMappingURL=show.js.map