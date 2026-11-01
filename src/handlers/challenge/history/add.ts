import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "handleAddHistory",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]

    $checkProfile
    $addCooldown

    $defer

    $c[the draft page sticks around until upload or cancel]
    $let[saved;$getUserVar[addHistorySavedConfig]]
    $jsonLoad[addHistorySavedConfig;$if[$get[saved]==;$addHistoryNewConfig;$get[saved]]]

    $historyEmbed[$env[addHistorySavedConfig];addHistory]
    $addHistoryExtraEmbed[addHistorySavedConfig]
    $newCommandTimeout
  `,
})
