export default {
  name: 'newLobbyTimeout',
  code: `
    $!stopTimeout[lobby-$channelID]
    $setTimeout[
      $jsonLoad[l;$getChannelVar[lobby]]
      $if[$env[l]==;$return]
      $if[$env[l;started];$return]
      $if[$messageExists[$channelID;$env[l;messageID]];
        $!deleteMessage[$channelID;$env[l;messageID]]
      ]
      $sendMessage[$channelID;
        $infoMessage[$tl[ui.lobby.closedByInactivity;<@$env[l;host]>]]
      ]
      $clearEveryProgress
    ;$getGlobalVar[lobbyInactiveTime];lobby-$channelID]
  `
}