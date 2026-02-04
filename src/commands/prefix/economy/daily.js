export default {
  name: "daily",
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile

    $timezone[$env[userProfile;timezone]]
    $let[lastDay;$default[$env[userProfile;limiters;lastDailyDay];-1]]
    $let[remHours;$sub[24;$hour]]
    $let[remMinutes;$sub[60;$minute]]
    $let[MC;$getGlobalVar[dailyReward]]

    $if[$env[userProfile;devMode]==0;
      $onlyIf[$day!=$get[lastDay];
        $let[cd;$sum[$parseString[$get[remHours]h$get[remMinutes]m];$getTimestamp]]
        $cooldownEmbed
        $description[
          $tl[ui.daily.cooldownDescription1]
          $tl[ui.daily.cooldownDescription2]
          $tl[ui.cooldown.description;$discordTimestamp[$get[cd];RelativeTime];$discordTimestamp[$get[cd];LongDateTime]]
        ]
      ]
    ]

    $!jsonSet[userProfile;limiters;lastDailyDay;$day]
  
    $sumCash[$get[MC]]
    $saveProfile

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.daily.description;$separate[$get[MC]]]]
    ;$getGlobalVar[defaultColor]]
  `
}