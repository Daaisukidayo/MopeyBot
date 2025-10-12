import universalSnippets from '#snippets/universalSnippets.js'

export default {
  name: "weekly",
  type: "messageCreate",
  code: `
    $reply
    ${universalSnippets.checkProfile({addCooldown: false})}
    
    $timezone[$env[userProfile;timezone]]
    $let[lastWeek;$env[userProfile;limiters;lastWeeklyWeek]]
    $let[remDays;$sub[7;$dayOfWeek]]
    $let[remHours;$sub[24;$hour]]
    $let[remMinutes;$sub[60;$minute]]
    $let[cd;$sum[$parseString[$get[remDays]d$get[remHours]h$get[remMinutes]m];$getTimestamp]]
    $let[MC;$getGlobalVar[weeklyReward]]
    
    $if[$env[userProfile;devMode];;
      $onlyIf[$week!=$get[lastWeek];
        ${universalSnippets.cooldownEmbed()}
        $description[## You already have claimed your weekly reward! 
        ## Cooldown resets every monday at 12:00 PM UTC+0!
        ## Time left: $discordTimestamp[$get[cd];RelativeTime] $discordTimestamp[$get[cd];LongDateTime]]
      ]
    ]

    $!jsonSet[userProfile;limiters;lastWeeklyWeek;$week]
    
    $callFunction[sumMC;$get[MC]]
    $setUserVar[userProfile;$env[userProfile]]    

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator
      $addTextDisplay[## Your weekly reward is \`$separateNumber[$get[MC];,]\`$getGlobalVar[emoji]!]
    ;$getGlobalVar[defaultColor]]
  `
}