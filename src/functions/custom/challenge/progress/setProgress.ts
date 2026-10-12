import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "setProgress",
  description: "Sets the luck challenge progress object for the user.",
  brackets: false,
  params: [
    {
      name: "userId",
      description: "The ID of the user for whom progress is being set.",
      type: ArgType.User,
      required: false
    },
    {
      name: "teamId",
      description: "The ID of the team to which the progress belongs.",
      type: ArgType.Number,
      required: false
    }
  ],
  code: `
    $let[userId;$nullish[$env[userId;id];$authorID]]
    $let[teamId;$nullish[$env[teamId];-1]]

    $jsonLoad[baseChallengeProgress;$getGlobalVar[baseChallengeProgress]]

    $c[A lobby player plays the lobby's difficulty, a solo player their own]
    $objectMerge[baseChallengeProgress;$objectOf[userID;"$get[userId]";teamID;$get[teamId];difficulty;$nullish[$jsonGet[$getChannelVar[lobby];settings;difficulty];$jsonGet[$getProfile[$get[userId]];challenge;difficulty]]]]

    $saveProgress[$env[baseChallengeProgress];$get[userId]]
  `
})
