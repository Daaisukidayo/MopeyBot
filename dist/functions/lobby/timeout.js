"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'newLobbyTimeout',
    code: `
    $let[l;$env[userProfile;language]]
    $!stopTimeout[lobby-$channelID]
    $setTimeout[
      $jsonLoad[lobby;$getChannelVar[lobby]]
      $if[$env[lobby]==;$return]
      $if[$env[lobby;started];$return]
      $if[$messageExists[$channelID;$env[lobby;messageID]];
        $!deleteMessage[$channelID;$env[lobby;messageID]]
      ]
      $sendMessage[$channelID;
        $lobbyInfoMessage[$tl[$get[l];ui;lobby.closedByInactivity;$env[lobby;host]]]
      ]
      $clearEveryProgress
    ;$getGlobalVar[lobbyInactiveTime];lobby-$channelID]
  `
};
//# sourceMappingURL=timeout.js.map