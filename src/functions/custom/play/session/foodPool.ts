import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "foodPool",
  description: "the foods a tier can find in a biome as [{ID, weight}], ready for arrayWeightedRandom",
  output: ArgType.Json,
  params: [
    {
      name: "tier",
      description: "the animal's tier",
      type: ArgType.Number,
    },
    {
      name: "biome",
      description: "the biome ID",
      type: ArgType.Number,
    },
  ],
  code: `
    $cacheFoods
    $getCache[animals;foods;foods]
    $jsonLoad[weights;$getGlobalVar[playFoodWeight]]
    $arrayFilter[$jsonEntries[foods];food;$and[$inRange[$env[tier];$jsonGet[food;1;tiers;0];$jsonGet[food;1;tiers;1]];$arrayIncludes[$jsonGet[food;1;biomes];$env[biome]]];found]

    $c[age counts from the newest food here, not from the tier, so tier 17 still gets a spread. fixed ones (meat) don't count]
    $let[newest;0]
    $arrayForEach[found;food;
      $if[$and[$jsonGet[weights;fixed;$jsonGet[food;0]]==;$jsonGet[food;1;tiers;0]>$get[newest]];$let[newest;$jsonGet[food;1;tiers;0]]]
    ]

    $arrayMap[found;food;
      $let[fixed;$jsonGet[weights;fixed;$jsonGet[food;0]]]
      $return[$objectOf[ID;$jsonGet[food;0];weight;$if[$get[fixed]!=;$get[fixed];$max[$jsonGet[weights;min];$math[$jsonGet[weights;new] - $jsonGet[weights;perTier] * ($get[newest] - $jsonGet[food;1;tiers;0])]]]]]
    ;pool]
    $return[$env[pool]]
  `,
})
