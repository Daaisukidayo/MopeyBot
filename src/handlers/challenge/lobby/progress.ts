import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "handleProgress",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $checkProfile
    $addCooldown

    $jsonLoad[lobby;$getChannelVar[lobby]]
    $checkLobby
    $onlyIf[$jsonGet[lobby;started];
      $newError[$tl[ui.lobby.notStarted.$get[l]]]
    ]

    $defer

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.lobby.lobbyProgressTitle.$get[l]]]
      $addSeparator[Large]
      $addLobbyStandings[lobby;$lobbyLeaderboard[lobby]]
    ;$getGlobalVar[luckyColor]]
  `
})
