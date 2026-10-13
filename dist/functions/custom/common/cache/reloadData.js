"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "reloadData",
    description: "Builds the animals data caches again from res/data/animals: the animals, the rares, the arena enemies and the tiers.",
    code: `
    $clearCache[animals]
    $clearCache[rares]
    $clearCache[arena]

    $cacheAllRares
    $cacheAnimalIndex
    $cacheArenaEnemies
    $cacheRaresContent
    $cacheTierAnimals
  `
});
//# sourceMappingURL=reloadData.js.map