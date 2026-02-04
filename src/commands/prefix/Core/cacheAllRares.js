export default {
  type: 'clientReady',
  code: `
    $jsonLoad[allRaresData;$advjsonEntries[$getGlobalVar[allRaresData]]]
    $jsonLoad[animals;$getAnimalsData]
    
    $arrayForEach[allRaresData;elem;
      $jsonLoad[rares;$env[elem;1]]
      $arrayConcat[allRaresFromSnora;allRaresFromSnora;rares]
    ]
    $setGlobalVar[allRares;$env[allRaresFromSnora]]
    $logger[Info;Cached «allRares»]
  `
}