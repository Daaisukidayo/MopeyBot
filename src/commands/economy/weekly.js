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
    
    $if[$env[userProfile;devMode];;
      $onlyIf[$week!=$get[lastWeek];
        ${universalSnippets.cooldownEmbed()}
        $description[## You already claimed your weekly reward! 
        ## Cooldown resets every monday at 00:00 AM UTC+0!
        ## Time left: $discordTimestamp[$get[cd];RelativeTime] $discordTimestamp[$get[cd];LongDateTime]]
      ]
    ]

    $!jsonSet[userProfile;limiters;lastWeeklyWeek;$week]
    
    $let[MC;150000]
    $callFunction[sumMC;$get[MC]]
    
    $addContainer[
      $callFunction[newAuthor]
      $addSeparator
      $addTextDisplay[## Your weekly reward is \`$separateNumber[$get[MC];,]\`$getGlobalVar[emoji]!]
    ;$getGlobalVar[defaultColor]]
    
    $setUserVar[userProfile;$env[userProfile]]
  `
}