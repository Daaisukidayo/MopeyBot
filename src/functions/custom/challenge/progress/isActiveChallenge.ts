import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "isActiveChallenge",
  description: "Stops the command with an error if the challenge loaded in 'challengeProgress' is not going on",
  params: [
    {
      name: "progressVar",
      description: "The name of the variable that holds the challenge progress.",
      type: ArgType.String
    }
  ],
  code: `
    $ref[progress;$env[progressVar]]
    $onlyIf[$jsonGet[progress;started]==true;
      $newError[$tl[ui.challenge.active.$jsonGet[userProfile;language]]]
    ]
  `
})
