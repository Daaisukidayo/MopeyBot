"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'checkLobbyExistence',
    description: "Checks if the lobby message exist in the channel.",
    code: `
    $let[l;$env[userProfile;language]]
    $onlyIf[$messageExists[$channelID;$env[lobby;messageID]];
      $sendMessage[$channelID;
        $lobbyInfoMessage[$tl[$get[l];ui;lobby.missingMessage]]
      ]
      $clearEveryProgress
    ]
  `
};
//# sourceMappingURL=checkLobbyExistence.js.map