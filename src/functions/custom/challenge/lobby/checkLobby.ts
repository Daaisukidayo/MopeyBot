import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "checkLobby",
  description: "checks if the channel has a lobby",
  code: `
    $let[l;$jsonGet[userProfile;language]]
    $onlyIf[$getChannelVar[lobby]!=;
      $newError[$tl[ui.lobby.doesNotExist.$get[l]]]
    ]
  `,
})
