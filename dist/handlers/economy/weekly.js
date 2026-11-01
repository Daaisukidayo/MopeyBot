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
    $c[once a week, devs bypass it]
    $onlyIf[$or[$jsonGet[userProfile;rewards;weekly_week]!=$get[week];$isDev];
      $newCooldown[$msUntilNextWeek]
    ]

    $defer

    $let[MC;$getGlobalVar[weeklyReward]]
    $!jsonSet[userProfile;rewards;weekly_week;$get[week]]
    $callMethod[userProfile;addCoins;$get[MC]]
    $callMethod[userProfile;save]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.weekly.description.$get[l];$separate[$get[MC]]]]
    ;$getGlobalVar[defaultColor]]
  `,
});
//# sourceMappingURL=weekly.js.map