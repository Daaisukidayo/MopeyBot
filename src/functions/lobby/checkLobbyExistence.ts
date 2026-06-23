export default {
  name: 'checkLobbyExistence',
  description: "Checks if the lobby message exist in the channel.",
  code: `
    $let[l;$env[userProfile;language]]
    $onlyIf[$messageExists[$channelID;$env[lobby;messageID]];
      $sendMessage[$channelID;
        $lobbyInfoMessage[$tl[ui.lobby.missingMessage.$get[l]]]
      ]
      $clearEveryProgress
    ]
  `
}