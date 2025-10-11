import universalSnippets from '#snippets/universalSnippets.js'

export default {
  name: "daily",
  type: "messageCreate",
  code: `
    $reply
    ${universalSnippets.checkProfile({addCooldown: false})}

    $timezone[$env[userProfile;timezone]]
    $let[lastDay;$default[$env[userProfile;limiters;lastDailyDay];-1]]
    $let[remHours;$sub[24;$hour]]
    $let[remMinutes;$sub[60;$minute]]

    $if[$env[userProfile;devMode];;
      $onlyIf[$day!=$get[lastDay];
        $let[cd;$sum[$parseString[$get[remHours]h$get[remMinutes]m];$getTimestamp]]
        ${universalSnippets.cooldownEmbed()}
        $description[## You already claimed your daily reward! 
        ## Cooldown resets every day at 00:00 AM UTC+0!
        ## Time left: $discordTimestamp[$get[cd];RelativeTime] $discordTimestamp[$get[cd];LongDateTime]]
      ]
    ]

    $!jsonSet[userProfile;limiters;lastDailyDay;$day]
  
    $let[MC;20000]
    $callFunction[sumMC;$get[MC]]
    $setUserVar[userProfile;$env[userProfile]]

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator
      $addTextDisplay[## Your daily reward is \`$separateNumber[$get[MC];,]\`$getGlobalVar[emoji]!]
    ;$getGlobalVar[defaultColor]]
  `
}