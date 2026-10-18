import { Command } from "@quoriel/edge"

export default new Command({
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
    $c[Moderators can close it too]
    $onlyIf[$or[$jsonGet[lobby;host]==$authorID;$hasPerms[$guildID;$authorID;ManageMessages]];$onlyAuthorInteraction]

    $let[mid;$jsonGet[lobby;messageID]]

    $switch[$jsonGet[IID;1];
      $case[forcefully;
        $!deleteMessage[$channelID;$messageID]
        $if[$messageExists[$channelID;$get[mid]];
          $!deleteMessage[$channelID;$get[mid]]
        ]

        $c[A started lobby ends the challenge of every player, and the results are sent once everyone has finished]
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
})
