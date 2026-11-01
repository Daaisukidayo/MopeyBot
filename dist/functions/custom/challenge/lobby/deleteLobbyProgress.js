"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "deleteLobbyProgress",
    description: "wipes the progress and time of every lobby player",
    params: [
        {
            name: "allPlayers",
            description: "array of all lobby players",
            type: forgescript_1.ArgType.Json,
        },
    ],
    code: `
    $if[$jsonType[allPlayers]!=array;$return]
    $arrayForEach[allPlayers;userId;
      $deleteChallengeProgress[$env[userId]]
    ]
    $deleteChannelVar[lobby]
  `,
});
//# sourceMappingURL=deleteLobbyProgress.js.map