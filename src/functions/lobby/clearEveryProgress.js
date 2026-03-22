export default {
  name: 'clearEveryProgress',
  description: "Clears the progress and time for all players in the lobby.",
  code: `
    $arrayForEach[allPlayers;ID;
      $deleteProgress[$env[ID]]
      $deleteTime[$env[ID]]
    ]
    $deleteChannelVar[lobby]
  `
}