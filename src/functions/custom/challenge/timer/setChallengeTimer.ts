import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "setChallengeTimer",
  description: "sets how many seconds of the 1h luck challenge passed for the user, stays paused if it was",
  params: [
    {
      name: "newTime",
      description: "the new passed time in seconds",
      type: ArgType.Number,
    },
    {
      name: "userId",
      description: "whose timer to set, optional",
      type: ArgType.User,
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
})
