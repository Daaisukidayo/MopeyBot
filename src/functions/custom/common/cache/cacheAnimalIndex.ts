import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "cacheAnimalIndex",
  description: "Caches the index of every animal in the animals list, and the luck groups of the hour simulator.",
  code: `
    $c[Read by reference: never modify 'animals']
    $cacheAnimalsData
    $getCache[animals;animalsData;animals]

    $jsonLoad[animalIndexes;$objectOf]
    $arrayForEach[animals;obj;
      $jsonSet[animalIndexes;$jsonGet[obj;ID];$env[i]]
    ;i]
    $setCache[animals;animalIndexes;$env[animalIndexes]]
    $logger[Info;Cached «animalIndexes»]


    $jsonLoad[hlKey;$getGlobalVar[hlSimKey]]
    $onlyIf[$env[hlKey]!=;
      $logger[Error;Failed to cache «hlSimData»: «hlSimKey» variable is empty!]
    ]
    $jsonLoad[data;$objectOf]

    $c[Every animal of the groups once: true for the rares that count]
    $arrayForEach[$arrayUnique[$arrayFlat[hlKey]];animalId;
      $jsonSet[data;$env[animalId];$not[$or[$env[animalId]==null;$getAnimalInfo[$env[animalId];isRare]==false;$includes[$env[animalId];shop]]]]
    ]

    $setCache[rares;hlSimData;$env[data]]
    $logger[Info;Cached «hlSimData»]
  `
})
