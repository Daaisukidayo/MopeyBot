import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "finishChallenge",
  description:
    "ends the challenge in 'challengeProgress': stops the timer, then removes a solo challenge or marks a lobby player as done",
  params: [
    {
      name: "progressVar",
      description: "var w/ the challenge progress",
      type: ArgType.String,
    },
  ],
  code: `
    $ref[progress;$env[progressVar]]
    $stopChallengeTimer

    $c[solo runs can share a channel w/ a lobby, so go by the team, not the lobby]
    $if[$jsonGet[progress;teamID]==-1;
      $deleteChallengeProgress
    ;
      $setField[progress;started;false]
      $saveProgress[$env[progress]]
      $allPlayersFinished
    ]
  `,
})
