import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: 'checkLobby',
  description: "Checks if a lobby exist in a channel.",
  code: `
    $let[l;$env[userProfile;language]]
    $onlyIf[$getChannelVar[lobby]!=;
      $newError[$tl[ui.lobby.doesNotExist.$get[l]]]
    ]
  `
})