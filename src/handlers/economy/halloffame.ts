import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "handleHalloffame",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $checkProfile
    $addCooldown
    $defer

    $hallOfFameEmbed[all;1]
    $newCommandTimeout[halloffame]
  `,
})
