"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edge_1 = require("@quoriel/edge");
exports.default = new edge_1.Command({
    name: "joinLobby",
    type: "interactionCreate",
    description: "When pressing Join",
    code: `
    $arrayLoad[IID;-;$customID]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    
    $checkProfile
    $checkLobby

    $jsonLoad[lobby;$getLobby]
    
    $onlyIf[$messageID==$jsonGet[lobby;messageID];$!deleteMessage[$channelID;$messageID]]

    $onlyIf[$getProgress==;
      $newError[$tl[ui.lobby.hasActiveChallengeParticipate.$get[l]]]
    ]

    $callMethod[lobby;join;$authorID;$jsonGet[IID;1];$jsonGet[userProfile;testerMode]]
    $setChannelVar[lobby;$env[lobby]]

    $lobbyEmbed[lobby]
    $interactionUpdate
    $newLobbyTimeout
  `,
});
//# sourceMappingURL=join.js.map