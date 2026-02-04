export default {
  name: "setProgress",
  description: "Sets the luck challenge progress object for the user.",
  params: [
    {
      name: "user_id",
      required: false
    },
    {
      name: "team_id",
      required: false
    },
  ],
  brackets: false,
  code: `
    $let[uid;$findUser[$env[user_id];true]]
    $let[tid;$nullish[$env[team_id];-1]]

    $if[$env[lobby]==;$jsonLoad[lobby;$getChannelVar[lobby]]]
    $jsonLoad[UP;$getProfile[$get[uid]]]

    $jsonLoad[CP;$getGlobalVar[baseChallengeProgress]]

    $!jsonSet[CP;userID;"$get[uid]"]
    $!jsonSet[CP;teamID;$get[tid]]
    $!jsonSet[CP;difficulty;$default[$env[lobby;difficulty];$env[UP;challenge;difficulty]]]

    $saveProgress[$get[uid];CP]
    $setUserVar[1htime|$channelID;0;$get[uid]]
  `
}

