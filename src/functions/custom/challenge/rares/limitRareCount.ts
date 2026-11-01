import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "limitRareCount",
  description: "the rare's count, clamped to its category cap in the difficulty",
  output: ArgType.Number,
  params: [
    {
      name: "amount",
      description: "how many of the rare",
      type: ArgType.Number,
    },
    {
      name: "rareAnimalId",
      description: "the rare's ID",
      type: ArgType.String,
    },
    {
      name: "difficulty",
      description: "the difficulty whose caps apply",
      type: ArgType.Number,
    },
  ],
  code: `
    $c[caps per difficulty from cacheAllRares, uncapped categories have none]
    $getCache[rares;categoryLimits;categoryLimits]
    $let[limit;$jsonGet[categoryLimits;$env[difficulty];$jsonGet[$getChallengeRare[$env[rareAnimalId]];category]]]
    $return[$if[$get[limit]==;$env[amount];$min[$env[amount];$get[limit]]]]
  `,
})
