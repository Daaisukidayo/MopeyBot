import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "setChallengeTimer",
  description:
    "Sets how many seconds of the 1 hour luck challenge have passed for a user, keeping it paused if it was.",
  params: [
    {
      name: "newTime",
      description: "The new passed time in seconds.",
      type: ArgType.Number,
    },
    {
      name: "userId",
      description: "Optional user to set the timer for.",
      type: ArgType.User,
      required: false,
    },
  ],
  code: `
    $let[userId;$nullish[$env[userId;id];$authorID]]
    $jsonLoad[challengeProgress;$getProgress[$get[userId]]]

    $startChallengeTimer[$get[userId];$env[newTime]]
    $c[3600 ends the hour right away, even for a paused challenge]
    $if[$and[$jsonGet[challengeProgress;paused];$env[newTime]<3600];
      $pauseChallengeTimer[$get[userId]]
    ]
  `,
})
