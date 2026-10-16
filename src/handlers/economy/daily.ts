import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
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
})
