import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "handleShowHistory",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer

    $new[challengeHistory;ChallengeHistory;$authorID]
    $new[view;HistoryView;$getField[challengeHistory;pages]]

    $historyEmbed[$callMethod[view;current]]
    $showHistoryExtraEmbed[$env[view]]
    $let[mid;$send]

    $setMessageVar[cachedHistory;$env[view];$get[mid]]

    $newHistoryTimeout[$get[mid]]
  `,
})
