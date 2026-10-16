"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "startChallengeTimer",
    description: "Starts 1 hour luck timer for the provided user.",
    brackets: false,
    params: [
        {
            name: "userId",
            description: "ID of the user.",
            type: forgescript_1.ArgType.User,
            required: false,
        },
        {
            name: "fromTime",
            description: "The second of the challenge to start from (default: 0, a new challenge).",
            type: forgescript_1.ArgType.Number,
            required: false,
        },
    ],
    code: `
    $let[userId;$nullish[$env[userId;id];$authorID]]
    $let[fromTime;$nullish[$env[fromTime];0]]
    $jsonLoad[userProfile;$getProfile[$get[userId]]]
    $let[l;$jsonGet[userProfile;language]]

    $c[Timers save their environment: the timeouts only need the keywords above, and a User object can't be saved]
    $!jsonDelete[userId]
    $!jsonDelete[fromTime]
    $!jsonDelete[userProfile]

    $stopChallengeTimer[$get[userId]]

    $c[One named timeout per milestone, on the wall clock: the hour goes on while the bot is offline, a late notice is dropped on startup, the end always comes. They only call a function, so code changes apply to running challenges]
    $arrayForEach[$getGlobalVar[challengeTimerMilestones];milestone;
      $let[milestone;$env[milestone]]
      $c[Only milestones ahead: a timer firing at once shares the starting command's message, so that command shows a reached one]
      $if[$get[milestone]>$get[fromTime];
        $setTimeout[$challengeTimerMilestone[$get[userId];$get[l];$get[milestone]];$math[($get[milestone] - $get[fromTime]) * 1000];challengeTimer$get[milestone]-$get[userId]|$channelID;;$if[$get[milestone]<3600;10s]]
      ]
    ]
  `,
});
//# sourceMappingURL=startChallengeTimer.js.map