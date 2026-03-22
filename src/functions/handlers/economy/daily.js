export default {
  name: 'handleDaily',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile

    $timezone[$env[userProfile;timezone]]

    $let[MC;$getGlobalVar[dailyReward]]

    $let[lastDay;$default[$env[userProfile;limiters;lastDailyDay];-1]]
    $let[day;$day]

    $let[remHours;$sub[24;$hour]]
    $let[remMinutes;$sub[60;$minute]]

    $let[remainingTimeUnix;$parseString[$get[remHours]h$get[remMinutes]m]]
    $let[endingTimeUnix;$math[$get[remainingTimeUnix] + $getTimestamp]]


    $if[$env[userProfile;devMode]==0;
      $onlyIf[$get[day]!=$get[lastDay];
        $newCooldown[$get[endingTimeUnix]]
      ]
    ]

    $defer

    $!jsonSet[userProfile;limiters;lastDailyDay;$get[day]]
  
    $sumCash[$get[MC]]
    $saveProfile

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.daily.description;$separate[$get[MC]]]]
    ;$getGlobalVar[defaultColor]]
    $send
  `
}