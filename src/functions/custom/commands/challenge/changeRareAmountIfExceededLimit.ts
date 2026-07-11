import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: 'changeLimitedRareAnimalQuantity',
  description: "Changes the specified amount of a rare animal if it exceeds the limit.",
  output: ArgType.Number,
  params: [
    {
      name: "_amount",
      description: "Amount of the rare animal.",
      type: ArgType.Number,
    },
    {
      name: "_rareAnimalId",
      description: "ID of the rare animal.",
      type: ArgType.String,
    },
    {
      name: "_difficulty",
      description: "Difficulty to include.",
      type: ArgType.Number,
      required: false,
    },
  ],
  code: `
    $jsonLoad[chartLimitsMap;$getGlobalVar[chartLimitsMap]]
    $jsonLoad[chartLimits;$env[$getGlobalVar[chartLimits];$nullish[$env[_difficulty];$getGlobalVar[defaultDifficulty]]]]

    $let[category;$env[$getRareFromCDB[$env[_rareAnimalId]];category]]
    $let[id;$arrayFind[chartLimits;id;$env[chartLimitsMap;$env[id];category]==$get[category]]]

    $if[$get[id]==;
      $return[$env[_amount]]
    ]
    $let[limit;$env[chartLimitsMap;$get[id];limit]]

    $if[$env[_amount]>$get[limit];
      $jsonSet[_amount;$get[limit]]
    ]
    $return[$env[_amount]]
  `
})