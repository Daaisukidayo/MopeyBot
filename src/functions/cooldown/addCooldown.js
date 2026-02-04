export default {
  name: "addCooldown",
  description: "Adds a cooldown message to user.",
  params: [
    {
      name: "time",
      description: "Time for the new cooldown.",
      type: "Any",
      required: true,
    }
  ],
  code: `
    $if[$env[userProfile;devMode]==0;
      $userCooldown[$commandName;$env[time];
        $let[time;$getUserCooldownTime[$commandName]]
        $let[cooldownEnd;$sum[$getTimestamp;$get[time]]]
        $let[longDateTime;$discordTimestamp[$get[cooldownEnd];LongDateTime]]
        $let[relativeTimeLeft;$discordTimestamp[$get[cooldownEnd];RelativeTime]]

        $let[deleteTime;$if[$or[$get[time]>30000;$get[time]==0];10000;$get[time]]]

        $cooldownEmbed
        $deleteIn[$get[deleteTime]]
      ]
    ]
  `
}