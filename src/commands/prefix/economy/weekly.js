export default {
  name: "weekly",
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    
    $timezone[$env[userProfile;timezone]]
    $let[lastWeek;$env[userProfile;limiters;lastWeeklyWeek]]
    $let[week;$calendarWeek]
    $let[remDays;$sub[7;$weekday]]
    $let[remHours;$sub[24;$hour]]
    $let[remMinutes;$sub[60;$minute]]
    $let[cd;$sum[$parseString[$get[remDays]d$get[remHours]h$get[remMinutes]m];$getTimestamp]]
    $let[MC;$getGlobalVar[weeklyReward]]

    $if[$env[userProfile;devMode]==0;
      $onlyIf[$get[week]!=$get[lastWeek];
        $cooldownEmbed
        $description[
          $tl[ui.weekly.cooldownDescription1]
          $tl[ui.weekly.cooldownDescription2]
          $tl[ui.cooldown.description;$discordTimestamp[$get[cd];RelativeTime];$discordTimestamp[$get[cd];LongDateTime]]
        ]
      ]
    ]

    $!jsonSet[userProfile;limiters;lastWeeklyWeek;$get[week]]
    
    $sumCash[$get[MC]]
    $saveProfile

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.weekly.description;$separate[$get[MC]]]]
    ;$getGlobalVar[defaultColor]]
  `
}