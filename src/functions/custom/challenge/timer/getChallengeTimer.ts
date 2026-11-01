import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "getChallengeTimer",
  description: "how many seconds of the 1h luck challenge passed for the user in this channel",
  output: ArgType.Number,
  brackets: false,
  params: [
    {
      name: "userId",
      description: "the user's ID",
      type: ArgType.User,
      required: false,
    },
  ],
  code: `
    $let[userId;$nullish[$env[userId;id];$authorID]]
    $let[endTimer;challengeTimer3600-$get[userId]|$channelID]

    $c[running or paused: read the time off the timer that ends the hour]
    $if[$timerExists[timeout;$get[endTimer]];
      $let[secondsLeft;$ceil[$math[$getTimer[timeout;$get[endTimer];timeLeft] / 1000]]]
      $return[$min[3600;$math[3600 - $get[secondsLeft]]]]
    ]

    $c[no timer: still started = hour's over (paused ones keep their timers), otherwise not started yet]
    $jsonLoad[challengeProgress;$getProgress[$get[userId]]]
    $return[$if[$jsonGet[challengeProgress;started];3600;0]]
  `,
})
