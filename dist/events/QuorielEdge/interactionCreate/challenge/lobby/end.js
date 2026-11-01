"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edge_1 = require("@quoriel/edge");
exports.default = new edge_1.Command({
    name: "closeLobby",
    type: "interactionCreate",
    description: "When pressing End or Close manually",
    allowed: ["button"],
    code: `
    $arrayLoad[IID;-;$customID]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $checkLobby

    $jsonLoad[lobby;$getLobby]
    $c[mods can close it too]
    $onlyIf[$or[$jsonGet[lobby;host]==$authorID;$hasPerms[$guildID;$authorID;ManageMessages]];$onlyAuthorInteraction]

    $let[mid;$jsonGet[lobby;messageID]]

    $switch[$jsonGet[IID;1];
      $case[forcefully;
        $!deleteMessage[$channelID;$messageID]
        $if[$messageExists[$channelID;$get[mid]];
          $!deleteMessage[$channelID;$get[mid]]
        ]

        $c[ending a started lobby ends everyone's challenge, results go out once all are done]
        $if[$jsonGet[lobby;started];
          $arrayForEach[$callMethod[lobby;players];ID;
            $jsonLoad[progress;$getProgress[$env[ID]]]
            $if[$env[progress]!=;
              $setField[progress;started;false]
              $saveProgress[$env[progress];$env[ID]]
            ]
            $stopChallengeTimer[$env[ID]]
          ]

          $allPlayersFinished
        ;
          $deleteLobbyProgress[$jsonGet[lobby;allPlayers]]
        ]
      ]

      $case[manually;
        $onlyIf[$messageID==$get[mid];$!deleteMessage[$channelID;$messageID]]
        $!deleteMessage[$channelID;$messageID]
        $deleteChannelVar[lobby]
      ]
    ]

    $lobbyInfoMessage[lobby;$tl[ui.lobby.closedByHost.$get[l]]]
    $sendMessage[$channelID]
    $!stopTimeout[lobby-$channelID]
  `,
});
//# sourceMappingURL=end.js.map