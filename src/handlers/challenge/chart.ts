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

    $c[The luck chart and when it was last changed]
    $attachment[res/img/challenge/rare-points-chart.png;rare-points-chart.png]
    $addContainer[
      $addMediaGallery[
        $addMediaItem[attachment://rare-points-chart.png]
      ]
      $addTextDisplay[$discordTimestamp[1791557000000;LongDateTime]]
    ;$getGlobalVar[luckyColor]]
  `
})
