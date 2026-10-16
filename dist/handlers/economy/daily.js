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
    $c[Once a day, any time for a developer]
    $onlyIf[$or[$jsonGet[userProfile;limiters;lastDailyDay]!=$get[day];$isDev];
      $newCooldown[$msUntilNextDay]
    ]

    $defer

    $let[MC;$getGlobalVar[dailyReward]]
    $!jsonSet[userProfile;limiters;lastDailyDay;$get[day]]
    $sumCash[$get[MC]]
    $saveProfile[$env[userProfile]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.daily.description.$get[l];$separate[$get[MC]]]]
    ;$getGlobalVar[defaultColor]]
  `,
});
//# sourceMappingURL=daily.js.map