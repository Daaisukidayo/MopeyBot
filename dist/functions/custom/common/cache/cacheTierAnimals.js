"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "cacheTierAnimals",
    description: "caches the animals of every tier: all, commons and rares",
    code: `
    $c[shared ref, don't mutate 'animals']
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