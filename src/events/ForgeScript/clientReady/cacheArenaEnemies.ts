import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  type: "clientReady",
  code: `
    $c[Read by reference: never modify 'animals']
    $cacheAnimalsData
    $getCache[animals;animalsData;animals]
    $arrayFilter[animals;obj;$and[$jsonGet[obj;tier]>=15;$jsonGet[obj;deleted]!=true;$includes[$toLowerCase[$jsonGet[obj;fullName]];rare]==false];enemies]
    $setCache[arena;arenaEnemies;$arrayPluck[enemies;ID]]
    $logger[Info;Cached «arenaEnemies»]
  `
})
