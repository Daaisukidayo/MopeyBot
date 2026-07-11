import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  type: 'clientReady',
  code: `
    $jsonLoad[animalIndexes;{}]
    $forOf[$getAnimalsData;obj;
      $jsonSet[animalIndexes;$env[obj;ID];$env[i]]
    ;i]
    $setCache[animals;animalIndexes;$env[animalIndexes]]
    $logger[Info;Cached «animalIndexes»]


    $jsonLoad[hlKey;$getGlobalVar[hlSimKey]]
    $onlyIf[$env[hlKey]!=;
      $logger[Error;Failed to cache «hlSimData»: «hlSimKey» variable is empty!]
    ]
    $jsonLoad[data;{}]

    $arrayForEach[hlKey;animalsIds;
      $forOf[animalsIds;animalId;
        $if[$jsonHas[data;$env[animalId]];$continue]
        $jsonSet[data;$env[animalId];$not[$or[$env[animalId]==null;$getAnimalInfo[$env[animalId];isRare]==false;$includes[$env[animalId];shop]]]]
      ;i]
    ]

    $setCache[rares;hlSimData;$env[data]]
    $logger[Info;Cached «hlSimData»]
  `
})