import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "generateLuck",
  description: "builds a luck object: for every group, a weighted pool of animals ready for arrayWeightedRandom",
  output: ArgType.Json,
  params: [
    {
      name: "groups",
      description: "array of animal groups",
      type: ArgType.Json,
      required: true,
    },
    {
      name: "luckConfig",
      description: "luck multiplier: 1 = game odds, 2 = roughly double for rares, 0.5 = half",
      type: ArgType.Number,
      required: false,
    },
  ],
  code: `
    $jsonLoad[result;$objectOf]
    $let[luckConfig;$nullish[$env[luckConfig];1]]

    $if[$jsonType[groups]!=array;$return[$objectOf]]

    $c[group = common animal (or null) followed by its rares. pool = all of them w/ weights, a null common means nothing drops]
    $arrayForEach[groups;group;
      $c[the anchor animal gives the total (rarity.1)]
      $let[anchor;$nullish[$jsonGet[group;0];$jsonGet[group;1]]]
      $let[total;$getAnimalInfo[$get[anchor];rarity.1]]

      $c[rares roll one by one from the rarest, first hit wins. each takes its share of what the rarer ones left, times luck. luck 1 = game odds, huge luck = the rarest every time. turned into weights so it's still one weighted pick. ties get shuffled so nobody's always first]
      $arrayMap[$arrayFilter[$arraySlice[group;;1];animalId;$getAnimalInfo[$env[animalId];isRare]==true];animalId;
        $return[$objectOf[id;$env[animalId];rarity;$getAnimalInfo[$env[animalId];rarity.0]]]
      ;rares]
      $let[left;$get[total]]
      $let[rest;$get[total]]
      $arrayLoad[pool]
      $arrayShuffle[rares]
      $arrayForEach[$arraySortBy[rares;asc;rarity];rare;
        $c[multiply before dividing, no float noise]
        $let[weight;$if[$get[left]<=0;$get[rest];$min[$get[rest];$math[$get[rest] * $get[luckConfig] * $jsonGet[rare;rarity] / $get[left]]]]]
        $arrayPushJSON[pool;$objectOf[id;$jsonGet[rare;id];weight;$get[weight]]]
        $letSub[rest;$get[weight]]
        $letSub[left;$jsonGet[rare;rarity]]
      ]
      $arrayPushJSON[pool;$objectOf[id;$default[$jsonGet[group;0];null];weight;$get[rest]]]

      $jsonSet[result;$get[anchor];$objectOf[pool;$env[pool];total;$get[total]]]
    ]

    $return[$env[result]]
  `,
})
