import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "stopChallengeTimer",
  description: "stops the user's running 1h luck timer",
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
    $arrayForEach[$getGlobalVar[challengeTimerMilestones];milestone;
      $!clearTimer[timeout;challengeTimer$env[milestone]-$get[userId]|$channelID]
    ]
  `,
})
