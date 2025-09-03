export default {
  name: 'lobbyExist',
  code: `
    $onlyIf[$getChannelVar[lobby]!=;
      $ephemeral
      $callFunction[embed;error]
      $description[## Lobby does not exist anymore]
    ]
  `
}