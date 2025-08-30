export default {
  name: "cooldown",
  params: ["time"],
  code: `
    $if[$env[userProfile;devMode];;
      $userCooldown[$commandName;$env[time];$callFunction[cooldownSchema;$commandName]]
    ]
  `
}