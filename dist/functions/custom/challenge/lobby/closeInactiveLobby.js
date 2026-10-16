"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "closeInactiveLobby",
    description: "Closes the channel's lobby if it has not started yet",
    brackets: true,
    params: [
        {
            name: "locale",
            description: "The language of the closing message",
            type: forgescript_1.ArgType.String,
        },
    ],
    code: `
    $jsonLoad[lobby;$getLobby]
    $if[$env[lobby]==;$return]
    $if[$jsonGet[lobby;started];$return]
    $if[$messageExists[$channelID;$jsonGet[lobby;messageID]];
      $!deleteMessage[$channelID;$jsonGet[lobby;messageID]]
    ]
    $sendMessage[$channelID;
      $lobbyInfoMessage[lobby;$tl[ui.lobby.closedByInactivity.$env[locale];$jsonGet[lobby;host]]]
    ]
    $deleteLobbyProgress[$jsonGet[lobby;allPlayers]]
  `,
});
//# sourceMappingURL=closeInactiveLobby.js.map