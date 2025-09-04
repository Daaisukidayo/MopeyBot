export default {
  name: 'lobbyTimeout',
  code: `
    $return[
      $!stopTimeout[LOBBYTIMEOUT-$channelID]
      $setTimeout[
        $if[$getChannelVar[lobby]==;$stop]
        $!deleteMessage[$channelID;$default[$env[lobby;messageID];$messageID]]
        $sendMessage[$channelID;
          $description[## Party created by <@$get[host]> was closed due to inactivity]
          $color[Orange]
        ]
        $arrayForEach[allPlayers;ID;
          $deleteUserVar[participating|$channelID;$env[ID]]
        ]
        $callFunction[deleteLobbyVars]
      ;$getGlobalVar[lobbyInactiveTime];LOBBYTIMEOUT-$channelID]
    ]
  `
}