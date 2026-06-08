"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'clearEveryProgress',
    description: "Clears the progress and time for all players in the lobby.",
    code: `
    $arrayForEach[allPlayers;userId;
      $deleteProgress[$env[userId]]
    ]
    $deleteChannelVar[lobby]
  `
};
//# sourceMappingURL=clearEveryProgress.js.map