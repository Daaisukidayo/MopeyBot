export default {
  type: 'clientReady',
  code: `
    $jsonLoad[animalIndexes;{}]
    $jsonLoad[animals;$getAnimalsData]
    $loop[$arrayLength[animals];
      $let[i;$math[$env[i] - 1]]
      $let[animalID;$env[animals;$get[i];ID]]
      $!jsonSet[animalIndexes;$get[animalID];$get[i]]
    ;i;true]
    $setGlobalVar[animalIndexes;$env[animalIndexes]]
    $logger[Info;Cached «animalIndexes»]



    $jsonLoad[hlKey;$getGlobalVar[hlSimKey]]
    $jsonLoad[data;{}]
    $jsonLoad[funcCache;{}]

    $arrayForEach[hlKey;animalsIds;
      $loop[$arrayLength[animalsIds];
        $let[animalId;$env[animalsIds;$math[$env[i] - 1]]]

        $let[cached;$env[data;$get[animalId]]]

        $if[$get[cached]==;
          $if[$get[animalId]==null;
            $!jsonSet[data;$get[animalId];false]
            $continue
          ]
          $if[$getAnimalInfo[$get[animalId];isRare];;
            $!jsonSet[data;$get[animalId];false]
            $continue
          ]
          $if[$includes[$get[animalId];shop];
            $!jsonSet[data;$get[animalId];false]
            $continue
          ]
          $!jsonSet[data;$get[animalId];true]
        ]
      ;i;true]
    ]

    $setGlobalVar[hlSimCachedData;$env[data]]
    $logger[Info;Cached «hlSimCachedData»]
  `
}