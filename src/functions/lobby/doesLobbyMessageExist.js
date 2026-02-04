export default {
  name: 'checkLobbyMessage',
  code: `
    $if[$messageExists[$channelID;$env[lobby;messageID]];;
      $sendMessage[$channelID;
        $infoMessage[$tl[ui.lobby.missingMessage]]
      ]
      $clearEveryProgress
      $stop
    ]
  `
}