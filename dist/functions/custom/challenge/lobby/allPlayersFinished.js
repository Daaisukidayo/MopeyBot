"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "allPlayersFinished",
    code: `
    $if[$jsonGet[$getProgress;teamID]==-1;$return]

    $jsonLoad[lobby;$getLobby]
    $jsonLoad[allPlayers;$jsonGet[lobby;allPlayers]]

    $if[$not[$arrayEvery[allPlayers;ID;$jsonGet[$getProgress[$env[ID]];started]==false]];$return]

    $c[the last players can finish at the same time and all land here. results go out via one named timeout, each new one replaces the pending one, so it's sent once]
    $setTimeout[$publishLobbyResults;1s;lobbyResults-$channelID]
  `,
});
//# sourceMappingURL=allPlayersFinished.js.map