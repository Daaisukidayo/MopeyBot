"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "publishLobbyResults",
    description: "Sends the lobby results and removes the lobby. Runs from the named timeout set by allPlayersFinished",
    code: `
    $jsonLoad[lobby;$getChannelVar[lobby]]
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
  `
});
//# sourceMappingURL=publishLobbyResults.js.map