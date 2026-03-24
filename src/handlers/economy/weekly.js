export default {
  name: 'handleWeekly',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile

    $timezone[$env[userProfile;timezone]]

    $let[MC;$getGlobalVar[weeklyReward]]

    $let[lastWeek;$default[$env[userProfile;limiters;lastWeeklyWeek];-1]]
    $let[week;$calendarWeek]

    $let[remDays;$sub[7;$weekday]]
    $let[remHours;$sub[24;$hour]]
    $let[remMinutes;$sub[60;$minute]]

    $let[remainingTimeUnix;$parseString[$get[remDays]d$get[remHours]h$get[remMinutes]m]]
    $let[endingTimeUnix;$math[$get[remainingTimeUnix] + $getTimestamp]]

    $if[$env[userProfile;devMode]==0;
      $onlyIf[$get[week]!=$get[lastWeek];
        $newCooldown[$get[endingTimeUnix]]
      ]
    ]

    $defer

    $!jsonSet[userProfile;limiters;lastWeeklyWeek;$get[week]]
    
    $sumCash[$get[MC]]
    $saveProfile

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.weekly.description;$separate[$get[MC]]]]
    ;$getGlobalVar[defaultColor]]
    $send
  `
}