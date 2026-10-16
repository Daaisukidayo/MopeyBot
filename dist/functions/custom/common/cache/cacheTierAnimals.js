"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "cacheTierAnimals",
    description: "Caches the animals of every tier: all of them, the common ones and the rares.",
    code: `
    $c[Read by reference: never modify 'animals']
    $cacheAnimalsData
    $getCache[animals;animalsData;animals]

    $jsonLoad[result;$objectOf]

    $arrayFilter[animals;animal;$jsonGet[animal;deleted]!=true;liveAnimals]
    $arrayForEach[liveAnimals;animal;
      $let[tier;$jsonGet[animal;tier]]

      $objectDefaults[result;$get[tier];$objectOf[allAnimals;$arrayOf;commonAnimals;$arrayOf;rareAnimals;$arrayOf]]
      $arrayPushAt[result;$get[tier];allAnimals;$jsonGet[animal;ID]]
      $arrayPushAt[result;$get[tier];$if[$jsonGet[animal;isRare];rareAnimals;commonAnimals];$jsonGet[animal;ID]]
    ]

    $setCache[animals;tierAnimals;$env[result]]
    $logger[Info;Cached «tierAnimals»]
  `,
});
//# sourceMappingURL=cacheTierAnimals.js.map