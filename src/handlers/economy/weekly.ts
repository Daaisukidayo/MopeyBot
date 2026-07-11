import { ForgeFunction } from "@tryforge/forgescript";

export default new ForgeFunction({
  name: 'handleWeekly',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $calendar[Iso8601]

    $let[MC;$getGlobalVar[weeklyReward]]

    $let[lastWeek;$default[$env[userProfile;limiters;lastWeeklyWeek];-1]]
    $let[week;$calendarWeek]

    $let[remDays;$sub[7;$replace[$weekday;0;7]]]
    $let[remHours;$sub[24;$hour]]
    $let[remMinutes;$sub[60;$minute]]

    $let[remainingTimeUnix;$parseString[$get[remDays]d$get[remHours]h$get[remMinutes]m]]

    $if[$env[userProfile;devMode]==0;
      $onlyIf[$get[week]!=$get[lastWeek];
        $newCooldown[$get[remainingTimeUnix]]
      ]
    ]

    $defer

    $!jsonSet[userProfile;limiters;lastWeeklyWeek;$get[week]]
    
    $sumCash[$get[MC]]
    $saveProfile[$env[userProfile]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.weekly.description.$get[l];$separate[$get[MC]]]]
    ;$getGlobalVar[defaultColor]]
  `
})