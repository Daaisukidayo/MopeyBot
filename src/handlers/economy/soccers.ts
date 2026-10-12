import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "handleSoccer",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    
    $checkProfile
    $addCooldown
    
    $soccerEmbed
  `
})
