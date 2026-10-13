"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "getChallengeTimer",
    description: "Returns how many seconds of the 1 hour luck challenge have passed for a user in the current channel.",
    output: forgescript_1.ArgType.Number,
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
    $let[endTimer;challengeTimer3600-$get[userId]|$channelID]

    $c[While the hour goes on or is paused, the time is read from the timer that ends it]
    $if[$timerExists[timeout;$get[endTimer]];
      $let[secondsLeft;$ceil[$math[$getTimer[timeout;$get[endTimer];timeLeft] / 1000]]]
      $return[$min[3600;$math[3600 - $get[secondsLeft]]]]
    ]

    $c[No timer: the hour is over if the challenge is still started (a paused one keeps its timers), else it hasn't started]
    $jsonLoad[challengeProgress;$getProgress[$get[userId]]]
    $return[$if[$jsonGet[challengeProgress;started];3600;0]]
  `
});
//# sourceMappingURL=getChallengeTimer.js.map