"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "addLobbyStandings",
    description: "Adds the lines of the lobby standings and the victory type of the lobby loaded in 'lobby'.",
    params: [
        {
            name: "lobbyVar",
            description: "The name of the variable that holds the lobby.",
            type: forgescript_1.ArgType.String
        },
        {
            name: "standings",
            description: "The standings returned by $lobbyLeaderboard.",
            type: forgescript_1.ArgType.Json
        }
    ],
    code: `
    $ref[lobby;$env[lobbyVar]]
    $let[l;$jsonGet[userProfile;language]]
    $c[One team shows its players, several teams show the teams with their players under them]
    $arrayForEach[$jsonGet[standings;lines];line;
      $addTextDisplay[$env[line]]
      $if[$jsonGet[standings;solo];$addSeparator[Small;false];$addSeparator[Large]]
    ]
    $if[$jsonGet[standings;solo];$addSeparator[Large]]
    $addTextDisplay[$tl[ui.lobby.victoryTypeTitle.$get[l];$tl[data.victoryTypes.$jsonGet[lobby;settings;victoryType].$get[l]]]]
  `
});
//# sourceMappingURL=addLobbyStandings.js.map