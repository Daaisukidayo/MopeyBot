export default {
  name: 'checkLobby',
  description: "Checks if a lobby exist in a channel.",
  code: `
    $onlyIf[$getChannelVar[lobby]!=;
      $newError[$tl[ui.lobby.doesNotExist]]
    ]
  `
}