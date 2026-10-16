import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "resumeChallengeTimer",
  description: "Resumes the paused 1 hour luck timer for the provided user from where it was paused.",
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
      $!resumeTimer[timeout;challengeTimer$env[milestone]-$get[userId]|$channelID]
    ]
  `,
})
