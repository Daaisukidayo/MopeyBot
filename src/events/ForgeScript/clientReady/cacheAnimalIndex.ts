export default {
  type: 'clientReady',
  code: `
    $jsonLoad[animalIndexes;{}]
    $jsonLoad[animals;$getAnimalsData]
    $loop[$arrayLength[animals];
      $let[i;$math[$env[i] - 1]]
      $let[animalID;$env[animals;$get[i];ID]]
      $jsonSet[animalIndexes;$get[animalID];$get[i]]
    ;i;true]
    $setCache[animalIndexes;$env[animalIndexes]]
    $logger[Info;Cached «animalIndexes»]


    $onlyIf[$getGlobalVar[hlSimKey]!=;
      $logger[Error;Failed to Cached «hlSimData»: «hlSimKey» variable is empty!]
    ]
    $jsonLoad[hlKey;$getGlobalVar[hlSimKey]]
    $jsonLoad[data;{}]

    $arrayForEach[hlKey;animalsIds;
      $loop[$arrayLength[animalsIds];
        $let[animalId;$env[animalsIds;$sub[$env[i];1]]]

        $if[$env[data;$get[animalId]]==;
          $jsonSet[data;$get[animalId];$not[$or[$get[animalId]==null;$getAnimalInfo[$get[animalId];isRare]==false;$includes[$get[animalId];shop]==true]]]
        ]
      ;i;true]
    ]

    $setCache[hlSimData;$env[data]]
    $logger[Info;Cached «hlSimData»]
  `
}