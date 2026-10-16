import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "limitRareCount",
  description: "Returns the amount of a rare animal, lowered to the limit of its category in the difficulty.",
  output: ArgType.Number,
  params: [
    {
      name: "amount",
      description: "Amount of the rare animal.",
      type: ArgType.Number,
    },
    {
      name: "rareAnimalId",
      description: "ID of the rare animal.",
      type: ArgType.String,
    },
    {
      name: "difficulty",
      description: "The difficulty whose limits apply.",
      type: ArgType.Number,
    },
  ],
  code: `
    $c[Limits per difficulty come from cacheAllRares, an unlimited category has none]
    $getCache[rares;categoryLimits;categoryLimits]
    $let[limit;$jsonGet[categoryLimits;$env[difficulty];$jsonGet[$getChallengeRare[$env[rareAnimalId]];category]]]
    $return[$if[$get[limit]==;$env[amount];$min[$env[amount];$get[limit]]]]
  `,
})
