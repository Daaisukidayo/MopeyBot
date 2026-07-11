import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: 'handleRaretrymode',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer

    $jsonLoad[modes;$getGlobalVar[raretryModes]]

    $raretrymodeEmbed
    $newCommandTimeout
  `
})