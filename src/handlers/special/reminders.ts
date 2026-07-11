import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: 'handleReminders',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer

    $remindersEmbed
    $newCommandTimeout
  `
})