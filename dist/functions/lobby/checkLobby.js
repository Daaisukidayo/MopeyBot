"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'checkLobby',
    description: "Checks if a lobby exist in a channel.",
    code: `
    $let[l;$env[userProfile;language]]
    $onlyIf[$getChannelVar[lobby]!=;
      $newError[$tl[$get[l];ui;lobby.doesNotExist]]
    ]
  `
};
//# sourceMappingURL=checkLobby.js.map