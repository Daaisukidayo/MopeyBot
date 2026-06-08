"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    type: 'clientReady',
    code: `
    $onlyIf[$getGlobalVar[allRareAbbreviations]!=;
      $logger[Error;Failed to Cached «allRares»: «allRareAbbreviations» variable is empty!]
    ]
    $jsonLoad[allRareAbbreviations;$advjsonEntries[$getGlobalVar[allRareAbbreviations]]]
    $jsonLoad[animals;$getAnimalsData]
    
    $arrayForEach[allRareAbbreviations;elem;
      $jsonLoad[rares;$env[elem;1]]
      $arrayConcat[allRaresFromSnora;allRaresFromSnora;rares]
    ]
    $setCache[allRares;$env[allRaresFromSnora]]
    $logger[Info;Cached «allRares»]
  `
};
//# sourceMappingURL=cacheAllRares.js.map