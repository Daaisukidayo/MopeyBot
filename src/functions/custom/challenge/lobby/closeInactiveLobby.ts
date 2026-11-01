import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "closeInactiveLobby",
  description: "closes the channel's lobby if it hasn't started yet",
  brackets: true,
  params: [
    {
      name: "locale",
      description: "language of the closing msg",
      type: ArgType.String,
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
})
