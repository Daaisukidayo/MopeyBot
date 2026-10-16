import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "stopChallengeTimer",
  description: "Stops the active 1 hour luck timer for the provided user.",
  brackets: false,
  params: [
    {
      name: "userId",
      description: "ID of the user.",
      type: ArgType.User,
      required: false,
    },
  ],
  code: `
    $let[userId;$nullish[$env[userId;id];$authorID]]
    $arrayForEach[$getGlobalVar[challengeTimerMilestones];milestone;
      $!clearTimer[timeout;challengeTimer$env[milestone]-$get[userId]|$channelID]
    ]
  `,
})
