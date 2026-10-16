"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "lobbyInfoMessage",
    description: "Creates and sends a formatted lobby information message with author and content.",
    params: [
        {
            name: "lobbyVar",
            description: "The name of the variable that holds the lobby.",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "content",
            description: "The content text to display in the lobby info message.",
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