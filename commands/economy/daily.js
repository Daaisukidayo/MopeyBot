module.exports = ({
  name: "daily",
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]

    $let[lastDay;$env[userProfile;limiters;lastDailyDay]]
    $let[remHours;$sub[24;$hour]]
    $let[remMinutes;$sub[60;$minute]]
      
    $if[$env[userProfile;devMode];;
      $onlyIf[$day!=$get[lastDay];
        $let[cd;$sum[$parseString[$get[remHours]h$get[remMinutes]m];$getTimestamp]]
        $callFunction[cooldownSchema;$commandName]
        $description[## You already claimed your daily reward! 
        ## Cooldown will reset at 00:00 AM (UTC+0) every day!
        ## Time left: $discordTimestamp[$get[cd];RelativeTime] $discordTimestamp[$get[cd];LongDateTime]]
      ]
    ]

    $!jsonSet[userProfile;limiters;lastDailyDay;$day]
  
    $let[r;$randomNumber[15000;20001]]
    $callFunction[sumMC;$get[r]]

    $sendMessage[$channelID;
      $description[## Your daily reward is $separateNumber[$get[r];,]$getGlobalVar[emoji]!]
      $getGlobalVar[author]
      $color[$getGlobalVar[defaultColor]] 
    ]
    
    $setUserVar[userProfile;$env[userProfile]]
  `
})