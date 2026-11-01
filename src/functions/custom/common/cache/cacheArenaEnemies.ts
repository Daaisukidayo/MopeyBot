import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "cacheArenaEnemies",
  description: "caches the arena enemies: tier 15+, still in the game, not rare",
  code: `
    $c[shared ref, don't mutate 'animals']
    $cacheAnimalsData
    $getCache[animals;animalsData;animals]
    $arrayFilter[animals;obj;$and[$jsonGet[obj;tier]>=15;$jsonGet[obj;deleted]!=true;$includes[$toLowerCase[$jsonGet[obj;fullName]];rare]==false];enemies]
    $setCache[arena;arenaEnemies;$arrayPluck[enemies;ID]]
    $logger[Info;Cached «arenaEnemies»]
  `,
})
