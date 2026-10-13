"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "handleChart",
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer

    $c[The luck chart and when it was last changed]
    $attachment[res/img/challenge/rare-points-chart.png;rare-points-chart.png]
    $addContainer[
      $addMediaGallery[
        $addMediaItem[attachment://rare-points-chart.png]
      ]
      $addTextDisplay[$discordTimestamp[1791833744470;LongDateTime]]
    ;$getGlobalVar[luckyColor]]
  `
});
//# sourceMappingURL=chart.js.map