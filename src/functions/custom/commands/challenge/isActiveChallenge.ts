import { ForgeFunction } from "@tryforge/forgescript";

export default new ForgeFunction({
  name: 'isActiveChallenge',
  description: "Check if the user has an active 1 hour luck challenge, if no, throw an error and stops the command execution",
  code: `
    $jsonLoad[challengeProgress;$getProgress]
    $onlyIf[$and[$env[challengeProgress]!=;$env[challengeProgress;started]];
      $newError[$tl[ui.challenge.active.$env[userProfile;language]]]
    ]
  `
})