import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "handleChart",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $checkProfile
    $addCooldown

    $defer

    $attachment[res/assets/challenge/rare-points-chart.png;rare-points-chart.png]
    $addContainer[
      $addMediaGallery[
        $addMediaItem[attachment://rare-points-chart.png]
      ]
      $addTextDisplay[$discordTimestamp[1791833744470;LongDateTime]]
    ;$getGlobalVar[luckyColor]]
  `,
})
