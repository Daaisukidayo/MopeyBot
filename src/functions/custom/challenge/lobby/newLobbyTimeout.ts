import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "newLobbyTimeout",
  code: `
    $let[l;$jsonGet[userProfile;language]]
    $!stopTimeout[lobby-$channelID]
    $c[the stored timeout just calls a fn, so code changes hit pending ones too]
    $setTimeout[$closeInactiveLobby[$get[l]];$getGlobalVar[lobbyInactiveTime];lobby-$channelID]
  `,
})
