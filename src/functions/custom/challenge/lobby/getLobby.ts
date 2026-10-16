import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "getLobby",
  description: "Returns the lobby of the channel as a Lobby instance, empty when there is none.",
  code: `
    $jsonLoad[lobby;$getChannelVar[lobby]]
    $c[Lobbies saved before the Lobby class have no class name]
    $if[$and[$env[lobby]!=;$isInstance[lobby]==false];
      $!jsonSet[lobby;__class;Lobby]
    ]
    $return[$env[lobby]]
  `,
})
