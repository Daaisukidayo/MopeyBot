"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "pauseChallengeTimer",
    description: "Pauses the 1 hour luck timer for the provided user, keeping the time left (also across restarts).",
    brackets: false,
    params: [
        {
            name: "userId",
            description: "ID of the user.",
            type: forgescript_1.ArgType.User,
            required: false
        }
    ],
    code: `
    $let[userId;$nullish[$env[userId;id];$authorID]]
    $arrayForEach[$getGlobalVar[challengeTimerMilestones];milestone;
      $!pauseTimer[timeout;challengeTimer$env[milestone]-$get[userId]|$channelID]
    ]
  `
});
//# sourceMappingURL=pauseChallengeTimer.js.map