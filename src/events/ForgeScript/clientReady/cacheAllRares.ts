export default {
  type: 'clientReady',
  code: `
    $onlyIf[$getGlobalVar[allRareAbbreviations]!=;
      $logger[Error;Failed to Cache «allRares»: «allRareAbbreviations» variable is empty!]
    ]
    $jsonLoad[animals;$getAnimalsData]
    
    $arrayForEach[$jsonEntries[$getGlobalVar[allRareAbbreviations]];elem;
      $jsonLoad[rares;$env[elem;1]]
      $arrayConcat[allRaresFromSnora;allRaresFromSnora;rares]
    ]
    $setCache[rares;allRares;$env[allRaresFromSnora]]
    $logger[Info;Cached «allRares»]
  `
}