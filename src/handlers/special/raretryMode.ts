import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "handleRaretrymode",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer

    $raretrymodeEmbed
    $newCommandTimeout
  `
})
