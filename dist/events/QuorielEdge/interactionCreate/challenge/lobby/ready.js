"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edge_1 = require("@quoriel/edge");
exports.default = new edge_1.Command({
    name: "participantReady",
    type: "interactionCreate",
    code: `
    $jsonLoad[userProfile;$getProfile]

    $checkLobby

    $jsonLoad[lobby;$getLobby]

    $onlyIf[$messageID==$jsonGet[lobby;messageID];$!deleteMessage[$channelID;$messageID]]

    $callMethod[lobby;toggleReady;$authorID]
    $setChannelVar[lobby;$env[lobby]]

    $lobbyEmbed[lobby]
    $interactionUpdate
    $newLobbyTimeout
  `,
});
//# sourceMappingURL=ready.js.map