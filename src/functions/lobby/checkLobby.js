export default {
  name: 'checkLobby',
  description: "Checks the lobby for existence.",
  code: `
    $onlyIf[$getChannelVar[lobby]!=;
      $newError[$tl[ui.lobby.doesNotExist]]
    ]
  `
}