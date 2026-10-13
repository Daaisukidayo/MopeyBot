"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edge_1 = require("@quoriel/edge");
exports.default = new edge_1.Command({
    name: "participantReady",
    type: "interactionCreate",
    code: `
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $checkLobby

    $jsonLoad[lobby;$getChannelVar[lobby]]
    $jsonLoad[ready;$jsonGet[lobby;ready]]

    $onlyIf[$messageID==$jsonGet[lobby;messageID];$!deleteMessage[$channelID;$messageID]]

    $onlyIf[$arrayIncludes[$jsonGet[lobby;allPlayers];$authorID];
      $newError[$tl[ui.lobby.notParticipant.$get[l]]]
    ]

    $if[$arrayIncludes[ready;$authorID];
      $arrayRemove[ready;$authorID]
    ;
      $arrayPush[ready;$authorID]
    ]
    $!jsonSet[lobby;ready;$env[ready]]
    $setChannelVar[lobby;$env[lobby]]

    $lobbyEmbed[lobby]
    $interactionUpdate
    $newLobbyTimeout
  `
});
//# sourceMappingURL=ready.js.map