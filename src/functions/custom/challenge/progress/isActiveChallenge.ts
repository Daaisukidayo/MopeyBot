import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "isActiveChallenge",
  description: "stops the command w/ an error if the challenge in 'challengeProgress' isn't going on",
  params: [
    {
      name: "progressVar",
      description: "var w/ the challenge progress",
      type: ArgType.String,
    },
  ],
  code: `
    $ref[progress;$env[progressVar]]
    $onlyIf[$jsonGet[progress;started]==true;
      $newError[$tl[ui.challenge.active.$jsonGet[userProfile;language]]]
    ]
  `,
})
