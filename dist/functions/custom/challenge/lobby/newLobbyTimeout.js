"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "newLobbyTimeout",
    code: `
    $let[l;$jsonGet[userProfile;language]]
    $!stopTimeout[lobby-$channelID]
    $c[the stored timeout just calls a fn, so code changes hit pending ones too]
    $setTimeout[$closeInactiveLobby[$get[l]];$getGlobalVar[lobbyInactiveTime];lobby-$channelID]
  `,
});
//# sourceMappingURL=newLobbyTimeout.js.map