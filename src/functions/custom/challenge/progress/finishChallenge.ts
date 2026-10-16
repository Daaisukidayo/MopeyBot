import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "finishChallenge",
  description:
    "Ends the challenge loaded in 'challengeProgress': stops its timer, then removes a solo challenge or marks a lobby player as finished.",
  params: [
    {
      name: "progressVar",
      description: "The name of the variable that holds the challenge progress.",
      type: ArgType.String,
    },
  ],
  code: `
    $ref[progress;$env[progressVar]]
    $stopChallengeTimer

    $c[A solo challenge can run in a channel that also has a lobby, so the team decides, not the lobby]
    $if[$jsonGet[progress;teamID]==-1;
      $deleteChallengeProgress
    ;
      $!jsonSet[progress;started;false]
      $saveProgress[$env[progress]]
      $allPlayersFinished
    ]
  `,
})
