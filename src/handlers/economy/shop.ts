import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "handleShop",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer

    $shopEmbed
    $newCommandTimeout
  `,
})
