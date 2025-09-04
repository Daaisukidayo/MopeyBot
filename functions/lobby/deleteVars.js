export default {
  name: 'deleteLobbyVars',
  code: `
    $arrayForEach[allPlayers;ID;
      $deleteUserVar[participating|$channelID;$env[ID]]
      $deleteUserVar[challengeProgress|$channelID;$env[ID]]
      $deleteUserVar[1htime|$channelID;$env[ID]]
    ]
    $deleteChannelVar[lobby]
  `
}