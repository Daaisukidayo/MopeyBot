"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "lobbyInfoMessage",
    description: "sends a lobby info msg w/ the author and some text",
    params: [
        {
            name: "lobbyVar",
            description: "var w/ the lobby",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "content",
            description: "the text to show",
            type: forgescript_1.ArgType.String,
        },
    ],
    code: `
    $ref[lobby;$env[lobbyVar]]
    $let[l;$jsonGet[userProfile;language]]
    $addContainer[
      $addSection[
        $addTextDisplay[$tl[ui.lobby.author.$get[l];$username[$jsonGet[lobby;host]]]]
        $addThumbnail[$userAvatar[$jsonGet[lobby;host]]]
      ]
      $addSeparator[Large]
      $addTextDisplay[$env[content]]
    ;Orange]
  `,
});
//# sourceMappingURL=lobbyInfoMessage.js.map