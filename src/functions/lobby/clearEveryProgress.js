export default {
  name: 'clearEveryProgress',
  code: `
    $arrayForEach[allPlayers;ID;
      $deleteProgress[$env[ID]]
      $deleteTime[$env[ID]]
    ]
    $deleteChannelVar[lobby]
  `
}