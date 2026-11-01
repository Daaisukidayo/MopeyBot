"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "challengeTimerMilestone",
    description: "fires when the challenge timer hits a milestone: sends the time-left notice or wraps up the hour",
    brackets: true,
    params: [
        {
            name: "userId",
            description: "the user's ID",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "locale",
            description: "the user's language",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "milestone",
            description: "the second the challenge reached (see challengeTimerMilestones)",
            type: forgescript_1.ArgType.Number,
        },
    ],
    code: `
    $let[userId;$env[userId]]
    $let[l;$env[locale]]
    $let[remaining;$math[3600 - $env[milestone]]]

    $c[time-left notice in minutes, seconds for the last one]
    $if[$get[remaining]>0;
      $let[inMinutes;$checkCondition[$get[remaining]>=60]]
      $sendMessage[$channelID;
        $addTextDisplay[$tl[ui.challenge.timeLeft_$if[$get[inMinutes];m;s].$get[l];<@$get[userId]>;$if[$get[inMinutes];$math[$get[remaining] / 60];$get[remaining]]]]
      ]
      $return
    ]

    $c[hour's over. load the profile here, the timer doesn't keep its env]
    $jsonLoad[userProfile;$getProfile[$get[userId]]]

    $sendMessage[$channelID;$addHourOverContainer[$get[userId];$get[l]]]
  `,
});
//# sourceMappingURL=challengeTimerMilestone.js.map