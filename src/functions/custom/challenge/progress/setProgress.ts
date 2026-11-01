import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "setProgress",
  description: "sets up the user's luck challenge progress",
  brackets: false,
  params: [
    {
      name: "userId",
      description: "whose progress it is",
      type: ArgType.User,
      required: false,
    },
    {
      name: "teamId",
      description: "the team the progress belongs to",
      type: ArgType.Number,
      required: false,
    },
  ],
  code: `
    $let[userId;$nullish[$env[userId;id];$authorID]]
    $let[teamId;$nullish[$env[teamId];-1]]

    $c[lobby players use the lobby's difficulty, solo ones their own]
    $new[challengeProgress;ChallengeProgress;$get[userId];$get[teamId];$nullish[$jsonGet[$getChannelVar[lobby];settings;difficulty];$jsonGet[$getProfile[$get[userId]];challenge;difficulty]]]
    $saveProgress[$env[challengeProgress];$get[userId]]
  `,
})
