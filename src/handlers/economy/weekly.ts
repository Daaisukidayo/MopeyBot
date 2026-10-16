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
  `,
})
