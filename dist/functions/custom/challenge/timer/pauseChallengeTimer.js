"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "pauseChallengeTimer",
    description: "pauses the user's 1h luck timer, keeping the time left (survives restarts too)",
    brackets: false,
    params: [
        {
            name: "userId",
            description: "the user's ID",
            type: forgescript_1.ArgType.User,
            required: false,
        },
    ],
    code: `
    $let[userId;$nullish[$env[userId;id];$authorID]]
    $arrayForEach[$getGlobalVar[challengeTimerMilestones];milestone;
      $!pauseTimer[timeout;challengeTimer$env[milestone]-$get[userId]|$channelID]
    ]
  `,
});
//# sourceMappingURL=pauseChallengeTimer.js.map