"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "handleDaily",
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $checkProfile

    $let[day;$calendarDay]
    $c[once a day, devs bypass it]
    $onlyIf[$or[$jsonGet[userProfile;rewards;daily_day]!=$get[day];$isDev];
      $newCooldown[$msUntilNextDay]
    ]

    $defer

    $let[MC;$getGlobalVar[dailyReward]]
    $!jsonSet[userProfile;rewards;daily_day;$get[day]]
    $callMethod[userProfile;addCoins;$get[MC]]
    $callMethod[userProfile;save]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.daily.description.$get[l];$separate[$get[MC]]]]
    ;$getGlobalVar[defaultColor]]
  `,
});
//# sourceMappingURL=daily.js.map