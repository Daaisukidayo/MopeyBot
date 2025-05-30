module.exports = [{
  name: "weekly",
  type: "messageCreate",
  code: `
    $reply
    $callFunction[checking;]
  
    $let[currentHour;$hour]
    $let[currentMinute;$minute]
    $let[currentDay;$day]
    $let[currentWeek;$week]

    $let[dayOfWeek;$switch[$day[Long];$case[Monday;1]$case[Tuesday;2]$case[Wednesday;3]$case[Thursday;4]$case[Friday;5]$case[Saturday;6]$case[Sunday;7]]]
    
    $if[$or[$get[dayOfWeek]==6;$get[dayOfWeek]==7];
      $let[currentWeek;$math[$week - 1]] 
    ]

    $let[lastWeek;$getUserVar[lastWeeklyWeek;$authorID;-1]]

    $let[remainingDays;$sub[7;$get[dayOfWeek]]]
    $let[remainingHours;$sub[24;$get[currentHour]]]
    $let[remainingMinutes;$sub[60;$get[currentMinute]]]

    $let[cd;$sum[$parseString[$get[remainingDays]d$get[remainingHours]h$get[remainingMinutes]m];$getTimestamp]]

    $onlyIf[$get[currentWeek]!=$get[lastWeek];

      $callFunction[cooldownSchema;$commandName]
      $description[## You already claimed your weekly reward! 
      ## Cooldown will reset at 00:00 AM (UTC+0) every monday!
      ## Time left: $discordTimestamp[$get[cd];RelativeTime] $discordTimestamp[$get[cd];LongDateTime]]
    ]

    $setUserVar[lastWeeklyWeek;$get[currentWeek]]
    $setUserVar[lastWeeklyHour;0] 

    $let[r;$randomNumber[100000;150001]]
    $callFunction[sumMC;$get[r]]

    $sendMessage[$channelID;
      $description[## Your weekly reward is $get[r]$getGlobalVar[emoji]!]
      $author[$userDisplayName • MUID: $getUserVar[MUID];$userAvatar]
      $color[$getGlobalVar[defaultColor]] 
    ]
  `
}]