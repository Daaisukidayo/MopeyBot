export default {
  name: 'changeLimitedRareAnimalQuantity',
  description: "Changes the specified amount if it exceeds the limit.",
  params: [
    {
      name: "_amount",
      description: "Amount of the rare animal.",
      type: "Number",
      required: true,
    },
    {
      name: "_rareAnimalId",
      description: "ID of the rare animal.",
      type: "String",
      required: true,
    },
    {
      name: "_difficulty",
      description: "Difficulty to include.",
      type: "Number",
      required: false,
    },
  ],
  output: "Number",
  code: `
    $jsonLoad[chartLimitsMap;$getGlobalVar[chartLimitsMap]]
    $jsonLoad[chartLimits;$dump[$getGlobalVar[chartLimits];$nullish[$env[_difficulty];$getGlobalVar[defaultDifficulty]]]]

    $let[category;$dump[$getRareFromCDB[$env[_rareAnimalId]];category]]
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
}