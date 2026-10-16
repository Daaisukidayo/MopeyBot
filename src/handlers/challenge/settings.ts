import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "handleSettings",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer

    $settingsEmbed

    $newCommandTimeout
  `,
})
