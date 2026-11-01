"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "stopChallengeTimer",
    description: "stops the user's running 1h luck timer",
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
      $!clearTimer[timeout;challengeTimer$env[milestone]-$get[userId]|$channelID]
    ]
  `,
});
//# sourceMappingURL=stopChallengeTimer.js.map