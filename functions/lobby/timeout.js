export default {
  name: 'lobbyTimeout',
  code: `
    $return[
      $!stopTimeout[LOBBYTIMEOUT-$channelID]
      $setTimeout[
        $!deleteMessage[$channelID;$default[$get[msgid];$messageID]]
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