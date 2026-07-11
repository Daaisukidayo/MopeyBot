import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: 'handleSoccer',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown
    
    $soccerEmbed
  `
})