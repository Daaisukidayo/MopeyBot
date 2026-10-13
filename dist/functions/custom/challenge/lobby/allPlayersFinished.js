"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "allPlayersFinished",
    code: `
    $if[$jsonGet[$getProgress;teamID]==-1;$return]

    $jsonLoad[lobby;$getChannelVar[lobby]]
    $jsonLoad[allPlayers;$jsonGet[lobby;allPlayers]]

    $if[$not[$arrayEvery[allPlayers;ID;$jsonGet[$getProgress[$env[ID]];started]==false]];$return]

    $c[The last players can finish at the same moment and all get here. The results go out through one named timeout: a new one replaces the pending one, so they are sent once]
    $setTimeout[$publishLobbyResults;1s;lobbyResults-$channelID]
  `
});
//# sourceMappingURL=allPlayersFinished.js.map