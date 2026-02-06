export default {
  name: 'isActiveChallenge',
  description: "Check if the user has an active 1 hour luck challenge, if no, then throw an error and stops the command execution",
  code: `
    $jsonLoad[cp;$getProgress]
    $onlyIf[$and[$env[cp]!=;$env[cp;started]];
      $newError[$tl[ui.challenge.active]]
    ]
  `
}