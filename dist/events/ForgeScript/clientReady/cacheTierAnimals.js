"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    type: 'clientReady',
    code: `
    $jsonLoad[animals;$getAnimalsData]
    $jsonLoad[result;{}]

    $loop[$arrayLength[animals];
      $jsonLoad[animal;$arrayAt[animals;$math[$env[i]-1]]]

      $if[$env[animal;deleted];$continue]

      $let[animalId;$env[animal;ID]]
      $let[tier;$env[animal;tier]]
      $let[isRare;$env[animal;isRare]]

      $if[$env[result;$get[tier]]==;
        $jsonSet[result;$get[tier];{"allAnimals": [\\], "commonAnimals": [\\], "rareAnimals": [\\]}]
      ]
      $jsonLoad[tierData;$env[result;$get[tier]]]

      $jsonLoad[allAnimals;$env[tierData;allAnimals]]
      $jsonLoad[commonAnimals;$env[tierData;commonAnimals]]
      $jsonLoad[rareAnimals;$env[tierData;rareAnimals]]
      
      $arrayPush[allAnimals;$get[animalId]]
      $if[$get[isRare];
        $arrayPush[rareAnimals;$get[animalId]]
      ;
        $arrayPush[commonAnimals;$get[animalId]]
      ]

      $jsonSet[tierData;allAnimals;$env[allAnimals]]
      $jsonSet[tierData;commonAnimals;$env[commonAnimals]]
      $jsonSet[tierData;rareAnimals;$env[rareAnimals]]

      $jsonSet[result;$get[tier];$env[tierData]]
    ;i;true]

    $setCache[tierAnimals;$env[result]]
    $logger[Info;Cached «tierAnimals»]
  `
};
//# sourceMappingURL=cacheTierAnimals.js.map