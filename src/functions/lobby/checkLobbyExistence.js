export default {
  name: 'checkLobbyExistence',
  description: "Checks if the lobby message exist in the channel.",
  code: `
    $onlyIf[$messageExists[$channelID;$env[lobby;messageID]];
      $sendMessage[$channelID;
        $lobbyInfoMessage[$tl[ui.lobby.missingMessage]]
      ]
      $clearEveryProgress
    ]
  `
}