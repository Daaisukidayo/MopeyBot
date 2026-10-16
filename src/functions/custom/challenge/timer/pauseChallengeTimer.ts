import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "pauseChallengeTimer",
  description: "Pauses the 1 hour luck timer for the provided user, keeping the time left (also across restarts).",
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
      $!pauseTimer[timeout;challengeTimer$env[milestone]-$get[userId]|$channelID]
    ]
  `,
})
