"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "handleWeekly",
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $checkProfile

    $calendar[Iso8601]
    $let[week;$calendarWeek]
    $c[Once a week, any time for a developer]
    $onlyIf[$or[$jsonGet[userProfile;limiters;lastWeeklyWeek]!=$get[week];$isDev];
      $newCooldown[$msUntilNextWeek]
    ]

    $defer

    $let[MC;$getGlobalVar[weeklyReward]]
    $!jsonSet[userProfile;limiters;lastWeeklyWeek;$get[week]]
    $sumCash[$get[MC]]
    $saveProfile[$env[userProfile]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.weekly.description.$get[l];$separate[$get[MC]]]]
    ;$getGlobalVar[defaultColor]]
  `
});
//# sourceMappingURL=weekly.js.map