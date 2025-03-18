module.exports = ({
  name: "daily",
  type: "messageCreate",
  code: `
    $reply

    $onlyIf[$getGlobalVar[botEnabled]==true]
    $onlyIf[$getUserVar[isBanned]==false]
    $onlyIf[$getUserVar[acceptedRules]==true;$callFunction[rulesSchema;]]
    $onlyIf[$getUserVar[onSlowmode]==false]

    $let[currentMinute;$minute]
    $let[currentHour;$hour]
    $let[currentDay;$day]
    $let[lastDay;$getUserVar[lastDailyDay;$authorID;0]]
    $let[lastHour;$getUserVar[lastDailyHour;$authorID;0]]

    $let[resetHour;0] 
    $let[remainingHours;$if[$get[currentHour]<$get[resetHour];$sub[$get[resetHour];$get[currentHour]];$sub[24;$get[currentHour]]]]
    $let[remainingMinutes;$sub[60;$get[currentMinute]]]
      
    $if[$getUserVar[dev]==false;

      $onlyIf[$and[$get[currentDay]!=$get[lastDay];$get[currentHour]>=0];
        $let[cd;$sum[$parseString[$get[remainingHours]h$get[remainingMinutes]m];$getTimestamp]]
        $callFunction[cooldownSchema;$commandName]
        $description[## You already claimed your daily reward! 
        ## Cooldown will reset at 00:00 AM (UTC+0) every day!
        ## Time left: $discordTimestamp[$get[cd];RelativeTime] $discordTimestamp[$get[cd];LongDateTime]]
      ]
    ]

    $setUserVar[lastDailyDay;$get[currentDay]]
    $setUserVar[lastDailyHour;$get[currentHour]]
  
    $let[r;$randomNumber[15000;20001]]
    $callFunction[sumMC;$get[r]]

    $sendMessage[$channelID;
      $description[## Your daily reward is $get[r]$getGlobalVar[emoji]!]
      $author[$userDisplayName • MUID: $getUserVar[MUID];$userAvatar]
      $color[$getGlobalVar[defaultColor]] 
    ]
    $callFunction[logSchema;$commandName]
    `
})