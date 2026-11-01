import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "handleBalance",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $checkProfile
    $addCooldown
    $defer

    $balanceEmbed[packs]
  `,
})
