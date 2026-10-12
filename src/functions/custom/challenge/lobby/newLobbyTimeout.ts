import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "newLobbyTimeout",
  code: `
    $let[l;$jsonGet[userProfile;language]]
    $!stopTimeout[lobby-$channelID]
    $c[The stored timeout only calls a function, so code changes apply to pending timeouts too]
    $setTimeout[$closeInactiveLobby[$get[l]];$getGlobalVar[lobbyInactiveTime];lobby-$channelID]
  `
})
