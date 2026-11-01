"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "checkLobby",
    description: "checks if the channel has a lobby",
    code: `
    $let[l;$jsonGet[userProfile;language]]
    $onlyIf[$getChannelVar[lobby]!=;
      $newError[$tl[ui.lobby.doesNotExist.$get[l]]]
    ]
  `,
});
//# sourceMappingURL=checkLobby.js.map