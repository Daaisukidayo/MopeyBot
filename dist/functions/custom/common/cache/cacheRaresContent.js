"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "cacheRaresContent",
    description: "caches the lines of the live rares w/ their rarity, for the rares list",
    code: `
    $c[shared ref, don't mutate 'animals']
    $cacheAnimalsData
    $getCache[animals;animalsData;animals]

    $arrayMap[animals;animal;
      $if[$and[$jsonGet[animal;isRare];$jsonHas[animal;deleted]==false];
        $return[$jsonGet[animal;skins;0;name] $jsonGet[animal;skins;0;emoji] \`[$jsonGet[animal;rarity;0]/$jsonGet[animal;rarity;1]\\]\` \`($round[$math[$jsonGet[animal;rarity;0]/$jsonGet[animal;rarity;1]*100];2]%)\`]
      ]
    ;raresContent]

    $setCache[rares;raresContent;$env[raresContent]]
    $logger[Info;Cached «raresContent»]
  `,
});
//# sourceMappingURL=cacheRaresContent.js.map