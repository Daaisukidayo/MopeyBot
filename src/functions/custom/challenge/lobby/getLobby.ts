import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "getLobby",
  description: "the channel's lobby as a Lobby instance, empty if there's none",
  code: `
    $jsonLoad[lobby;$getChannelVar[lobby]]
    $c[old lobbies (pre Lobby class) have no class name]
    $if[$and[$env[lobby]!=;$isInstance[lobby]==false];
      $!jsonSet[lobby;__class;Lobby]
    ]
    $return[$env[lobby]]
  `,
})
