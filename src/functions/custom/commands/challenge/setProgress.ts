import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "setProgress",
  description: "Sets the luck challenge progress object for the user.",
  brackets: false,
  params: [
    {
      name: "_userId",
      description: "The ID of the user for whom progress is being set.",
      type: ArgType.User,
      required: false,
    },
    {
      name: "_teamId",
      description: "The ID of the team to which the progress belongs.",
      type: ArgType.Number,
      required: false,
    },
  ],
  code: `
    $let[userId;$findUser[$env[_userId;id];true]]
    $let[teamId;$nullish[$env[_teamId];-1]]

    $jsonLoad[baseChallengeProgress;$getGlobalVar[baseChallengeProgress]]

    $!jsonSet[baseChallengeProgress;userID;"$get[userId]"]
    $!jsonSet[baseChallengeProgress;teamID;$get[teamId]]
    $!jsonSet[baseChallengeProgress;difficulty;$nullish[$env[$getChannelVar[lobby];settings;difficulty];$env[$getProfile[$get[userId]];challenge;difficulty]]]

    $saveProgress[$env[baseChallengeProgress];$get[userId]]
  `
})

