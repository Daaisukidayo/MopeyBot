"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "reloadData",
    description: "rebuilds the animal caches from res/data/animals: animals, rares, arena enemies and tiers",
    code: `
    $clearCache[animals]
    $clearCache[rares]
    $clearCache[arena]

    $cacheAllRares
    $cacheAnimalIndex
    $cacheArenaEnemies
    $cacheRaresContent
    $cacheTierAnimals
  `,
});
//# sourceMappingURL=reloadData.js.map