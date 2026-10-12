import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "challengeTimerMilestone",
  description: "Runs when the challenge timer reaches a milestone: sends the time left notice, or completes the hour.",
  brackets: true,
  params: [
    {
      name: "userId",
      description: "ID of the user.",
      type: ArgType.String
    },
    {
      name: "locale",
      description: "The user's language.",
      type: ArgType.String
    },
    {
      name: "milestone",
      description: "The reached second of the challenge (see challengeTimerMilestones).",
      type: ArgType.Number
    }
  ],
  code: `
    $let[userId;$env[userId]]
    $let[l;$env[locale]]
    $let[remaining;$math[3600 - $env[milestone]]]

    $c[Time left notice: in minutes while at least one is left, then in seconds]
    $if[$get[remaining]>0;
      $let[inMinutes;$checkCondition[$get[remaining]>=60]]
      $sendMessage[$channelID;
        $addTextDisplay[$tl[ui.challenge.timeLeft_$if[$get[inMinutes];m;s].$get[l];<@$get[userId]>;$if[$get[inMinutes];$math[$get[remaining] / 60];$get[remaining]]]]
      ]
      $return
    ]

    $c[The hour is over. The profile is loaded here: the timer doesn't keep the environment it was made in]
    $jsonLoad[userProfile;$getProfile[$get[userId]]]

    $sendMessage[$channelID;$addHourOverContainer[$get[userId];$get[l]]]
  `
})
