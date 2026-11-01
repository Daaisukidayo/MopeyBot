import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "startChallengeTimer",
  description: "starts the user's 1h luck timer",
  brackets: false,
  params: [
    {
      name: "userId",
      description: "the user's ID",
      type: ArgType.User,
      required: false,
    },
    {
      name: "fromTime",
      description: "the second to start from (default 0 = a new challenge)",
      type: ArgType.Number,
      required: false,
    },
  ],
  code: `
    $let[userId;$nullish[$env[userId;id];$authorID]]
    $let[fromTime;$nullish[$env[fromTime];0]]
    $jsonLoad[userProfile;$getProfile[$get[userId]]]
    $let[l;$jsonGet[userProfile;language]]

    $c[timers save their env. timeouts only need the keywords above, and a User obj can't be saved anyway]
    $!jsonDelete[userId]
    $!jsonDelete[fromTime]
    $!jsonDelete[userProfile]

    $stopChallengeTimer[$get[userId]]

    $c[one named timeout per milestone, wall-clock based: the hour keeps going while the bot's down, late notices get dropped on startup, the end always fires. they just call a fn, so code changes hit running challenges]
    $arrayForEach[$getGlobalVar[challengeTimerMilestones];milestone;
      $let[milestone;$env[milestone]]
      $c[only future milestones. one firing instantly would share the start cmd's msg, so that cmd shows reached ones itself]
      $if[$get[milestone]>$get[fromTime];
        $setTimeout[$challengeTimerMilestone[$get[userId];$get[l];$get[milestone]];$math[($get[milestone] - $get[fromTime]) * 1000];challengeTimer$get[milestone]-$get[userId]|$channelID;;$if[$get[milestone]<3600;10s]]
      ]
    ]
  `,
})
