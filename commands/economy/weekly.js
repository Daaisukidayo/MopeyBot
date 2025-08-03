module.exports = [{
  name: "weekly",
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking;]
    
    $let[lastWeek;$env[userProfile;limiters;lastWeeklyWeek]]
    $let[remDays;$sub[7;$dayOfWeek]]
    $let[remHours;$sub[24;$hour]]
    $let[remMinutes;$sub[60;$minute]]
      
    $let[cd;$sum[$parseString[$get[remDays]d$get[remHours]h$get[remMinutes]m];$getTimestamp]]
    
    $onlyIf[$week!=$get[lastWeek];
      $callFunction[cooldownSchema;$commandName]
      $description[## You already claimed your weekly reward! 
      ## Cooldown will reset at 00:00 AM (UTC+0) every monday!
      ## Time left: $discordTimestamp[$get[cd];RelativeTime] $discordTimestamp[$get[cd];LongDateTime]]
    ]
    
    $!jsonSet[userProfile;limiters;lastWeeklyWeek;$week]
    
    $let[r;$randomNumber[100000;150001]]
    $callFunction[sumMC;$get[r]]
    
    $addContainer[
      $callFunction[newAuthor]
      $addSeparator
      $addTextDisplay[## Your weekly reward is $get[r]$getGlobalVar[emoji]!]
    ;$getGlobalVar[defaultColor]]
    
    $setUserVar[userProfile;$env[userProfile]]
  `
}]