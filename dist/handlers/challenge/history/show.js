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

    $new[challengeHistory;ChallengeHistory;$authorID]
    $new[view;HistoryView;$getField[challengeHistory;pages]]

    $historyEmbed[$callMethod[view;current]]
    $showHistoryExtraEmbed[$env[view]]
    $let[mid;$send]

    $setMessageVar[cachedHistory;$env[view];$get[mid]]

    $newHistoryTimeout[$get[mid]]
  `,
});
//# sourceMappingURL=show.js.map