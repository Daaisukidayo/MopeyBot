"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
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
});
//# sourceMappingURL=getLobby.js.map