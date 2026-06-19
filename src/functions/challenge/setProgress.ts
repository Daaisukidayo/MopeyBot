export default {
  name: "setProgress",
  description: "Sets the luck challenge progress object for the user.",
  params: [
    {
      name: "_userId",
      type: "User",
      required: false,
    },
    {
      name: "_teamId",
      type: "Number",
      required: false,
    },
  ],
  brackets: false,
  code: `
    $let[userId;$findUser[$env[_userId;id];true]]
    $let[teamId;$nullish[$env[_teamId];-1]]

    $jsonLoad[baseChallengeProgress;$getGlobalVar[baseChallengeProgress]]

    $!jsonSet[baseChallengeProgress;userID;"$get[userId]"]
    $!jsonSet[baseChallengeProgress;teamID;$get[teamId]]
    $c[
      $!jsonSet[baseChallengeProgress;startedAt;"$getTimestamp"]
    ]
    $!jsonSet[baseChallengeProgress;difficulty;$nullish[$dump[$getChannelVar[lobby];settings;difficulty];$dump[$getProfile[$get[userId]];challenge;difficulty]]]

    $saveProgress[$env[baseChallengeProgress];$get[userId]]
  `
}

