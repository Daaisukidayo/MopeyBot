import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "resumeChallengeTimer",
  description: "resumes the user's paused 1h luck timer from where it stopped",
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
      $!resumeTimer[timeout;challengeTimer$env[milestone]-$get[userId]|$channelID]
    ]
  `,
})
