"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "setChallengeTimer",
    description: "sets how many seconds of the 1h luck challenge passed for the user, stays paused if it was",
    params: [
        {
            name: "newTime",
            description: "the new passed time in seconds",
            type: forgescript_1.ArgType.Number,
        },
        {
            name: "userId",
            description: "whose timer to set, optional",
            type: forgescript_1.ArgType.User,
            required: false,
        },
    ],
    code: `
    $let[userId;$nullish[$env[userId;id];$authorID]]
    $jsonLoad[challengeProgress;$getProgress[$get[userId]]]

    $startChallengeTimer[$get[userId];$env[newTime]]
    $c[3600 ends the hour instantly, paused or not]
    $if[$and[$jsonGet[challengeProgress;paused];$env[newTime]<3600];
      $pauseChallengeTimer[$get[userId]]
    ]
  `,
});
//# sourceMappingURL=setChallengeTimer.js.map