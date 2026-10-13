"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edge_1 = require("@quoriel/edge");
exports.default = new edge_1.Command({
    name: "showLobbySettings",
    type: "interactionCreate",
    allowed: ["button"],
    code: `
    $jsonLoad[userProfile;$getProfile]

    $checkLobby

    $jsonLoad[lobby;$getChannelVar[lobby]]
    $onlyIf[$messageID==$jsonGet[lobby;messageID];
      $!deleteMessage[$channelID;$messageID]
    ]

    $ephemeral
    $lobbySettingsEmbed[lobby]
    $interactionReply
  `
});
//# sourceMappingURL=showSettings.js.map