import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "pauseChallengeTimer",
  description: "pauses the user's 1h luck timer, keeping the time left (survives restarts too)",
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
      $!pauseTimer[timeout;challengeTimer$env[milestone]-$get[userId]|$channelID]
    ]
  `,
})
