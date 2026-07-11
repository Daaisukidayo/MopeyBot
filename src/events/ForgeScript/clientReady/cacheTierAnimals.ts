import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  type: 'clientReady',
  code: `
    $jsonLoad[result;{}]

    $forOf[$getAnimalsData;animal;
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
    ]

    $setCache[animals;tierAnimals;$env[result]]
    $logger[Info;Cached «tierAnimals»]
  `
})