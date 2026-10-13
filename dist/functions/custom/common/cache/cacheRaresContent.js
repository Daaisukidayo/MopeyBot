"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "cacheRaresContent",
    description: "Caches the lines of the rares still in the game, with their rarity, for the rares list.",
    code: `
    $c[Read by reference: never modify 'animals']
    $cacheAnimalsData
    $getCache[animals;animalsData;animals]

    $arrayMap[animals;animal;
      $if[$and[$jsonGet[animal;isRare];$jsonHas[animal;deleted]==false];
        $return[$jsonGet[animal;variants;0;name] $jsonGet[animal;variants;0;emoji] \`[$jsonGet[animal;rarity;0]/$jsonGet[animal;rarity;1]\\]\` \`($round[$math[$jsonGet[animal;rarity;0]/$jsonGet[animal;rarity;1]*100];2]%)\`]
      ]
    ;raresContent]

    $setCache[rares;raresContent;$env[raresContent]]
    $logger[Info;Cached «raresContent»]
  `
});
//# sourceMappingURL=cacheRaresContent.js.map