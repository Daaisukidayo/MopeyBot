export default {
  name: 'changeRareAmountIfExceededLimit',
  description: "Changes the specified amount if it exceeds the limit.",
  params: [
    {
      name: "amount",
      description: "Amount of the rare animal.",
      type: "Number",
      required: true,
    },
    {
      name: "id",
      description: "Id of the rare animal.",
      type: "String",
      required: true,
    },
    {
      name: "difficulty",
      description: "Difficulty to include.",
      type: "Number",
      required: false,
    },
  ],
  code: `
    $jsonLoad[cl;$dump[$getGlobalVar[chartLimits];$nullish[$env[difficulty];$getGlobalVar[defaultDifficulty]]]]
    $let[category;$dump[$getRareFromCDB[$env[id]];category]]
    $let[index;$arrayFindIndex[cl;obj;$env[obj;category]==$get[category]]]
        
    $if[$get[index]==-1;$return[$env[amount]]]
    $let[limit;$env[cl;$get[index];limit]]

    $if[$env[amount]>$get[limit];
      $jsonSet[amount;$get[limit]]
    ]
    $return[$env[amount]]
  `
}