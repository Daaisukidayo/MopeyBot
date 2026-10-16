"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "cacheArenaEnemies",
    description: "Caches the animals that can be met in the arena: tier 15 or higher, still in the game, not rare.",
    code: `
    $c[Read by reference: never modify 'animals']
    $cacheAnimalsData
    $getCache[animals;animalsData;animals]
    $arrayFilter[animals;obj;$and[$jsonGet[obj;tier]>=15;$jsonGet[obj;deleted]!=true;$includes[$toLowerCase[$jsonGet[obj;fullName]];rare]==false];enemies]
    $setCache[arena;arenaEnemies;$arrayPluck[enemies;ID]]
    $logger[Info;Cached «arenaEnemies»]
  `,
});
//# sourceMappingURL=cacheArenaEnemies.js.map