import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "publishLobbyResults",
  description: "Sends the lobby results and removes the lobby. Runs from the named timeout set by allPlayersFinished",
  code: `
    $jsonLoad[lobby;$getLobby]
    $if[$env[lobby]==;$return]

    $jsonLoad[userProfile;$getProfile[$jsonGet[lobby;host]]]
    $let[l;$jsonGet[userProfile;language]]
    $jsonLoad[standings;$lobbyLeaderboard[lobby]]

    $sendMessage[$channelID;
      $addContainer[
        $addTextDisplay[$tl[ui.lobby.winner.$get[l];$jsonGet[standings;winner]]]
        $addSeparator[Small]
        $addLobbyStandings[lobby;$env[standings]]
      ;$getGlobalVar[luckyColor]]
    ]
    $deleteLobbyProgress[$jsonGet[lobby;allPlayers]]
  `,
})
