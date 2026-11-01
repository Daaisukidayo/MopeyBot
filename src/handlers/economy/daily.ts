import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
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
})
