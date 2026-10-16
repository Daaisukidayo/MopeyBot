"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edge_1 = require("@quoriel/edge");
exports.default = new edge_1.Command({
    name: "quitLobby",
    type: "interactionCreate",
    description: "When pressing Quit",
    code: `
    $arrayLoad[IID;-;$customID]

    $jsonLoad[userProfile;$getProfile]
    $checkLobby

    $jsonLoad[lobby;$getLobby]

    $onlyIf[$messageID==$jsonGet[lobby;messageID];$!deleteMessage[$channelID;$messageID]]

    $callMethod[lobby;quit;$authorID;$jsonGet[IID;1]]
    $setChannelVar[lobby;$env[lobby]]

    $lobbyEmbed[lobby]
    $interactionUpdate
    $newLobbyTimeout
  `,
});
//# sourceMappingURL=quit.js.map