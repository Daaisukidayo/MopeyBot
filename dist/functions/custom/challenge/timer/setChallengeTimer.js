"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "setChallengeTimer",
    description: "Sets how many seconds of the 1 hour luck challenge have passed for a user, keeping it paused if it was.",
    params: [
        {
            name: "newTime",
            description: "The new passed time in seconds.",
            type: forgescript_1.ArgType.Number
        },
        {
            name: "userId",
            description: "Optional user to set the timer for.",
            type: forgescript_1.ArgType.User,
            required: false
        }
    ],
    code: `
    $let[userId;$nullish[$env[userId;id];$authorID]]
    $jsonLoad[challengeProgress;$getProgress[$get[userId]]]

    $startChallengeTimer[$get[userId];$env[newTime]]
    $c[3600 ends the hour right away, even for a paused challenge]
    $if[$and[$jsonGet[challengeProgress;paused];$env[newTime]<3600];
      $pauseChallengeTimer[$get[userId]]
    ]
  `
});
//# sourceMappingURL=setChallengeTimer.js.map