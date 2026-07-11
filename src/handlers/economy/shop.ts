import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: 'handleShop',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer

    $jsonLoad[userPacks;$env[userProfile;userPacks]]
    $jsonLoad[shopItems;$getGlobalVar[shopItems]]

    $shopEmbed
    $newCommandTimeout
  `
})