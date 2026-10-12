import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "handleReminders",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer

    $remindersEmbed
    $newCommandTimeout
  `
})
