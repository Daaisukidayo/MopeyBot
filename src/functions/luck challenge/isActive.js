export default {
  name: 'isActiveChallenge',
  code: `
    $jsonLoad[cp;$getProgress]
    $onlyIf[$and[$env[cp]!=;$env[cp;started]];
      $newError[$tl[ui.challenge.active]]
    ]
  `
}