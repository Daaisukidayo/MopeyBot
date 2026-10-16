"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
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
});
//# sourceMappingURL=getLobby.js.map