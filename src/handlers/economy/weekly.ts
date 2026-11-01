import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
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
})
