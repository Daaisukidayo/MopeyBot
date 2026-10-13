"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "generateLuck",
    description: "Generates a luck object: for every group, a pool of animals with their weights, ready for $arrayWeightedRandom.",
    output: forgescript_1.ArgType.Json,
    params: [
        {
            name: "groups",
            description: "Array of animal groups.",
            type: forgescript_1.ArgType.Json,
            required: true
        },
        {
            name: "luckConfig",
            description: "Luck multiplier (e.g., 1.0 is default, 2.0 is double rare chance, 0.5 is half).",
            type: forgescript_1.ArgType.Number,
            required: false
        }
    ],
    code: `
    $jsonLoad[result;$objectOf]
    $let[luckConfig;$nullish[$env[luckConfig];1]]

    $if[$jsonType[groups]!=array;$return[$objectOf]]

    $c[A group is [common animal or null, rares...\\]. Its pool holds every rare with its rarity as the weight, and the common animal with the rest of the total: null there means nothing is dropped]
    $arrayForEach[groups;group;
      $c[Finds the "anchor" animal to get the total value (rarity.1)]
      $let[anchor;$nullish[$jsonGet[group;0];$jsonGet[group;1]]]
      $let[total;$getAnimalInfo[$get[anchor];rarity.1]]
      $let[left;$get[total]]

      $arrayLoad[pool]
      $arrayForEach[$arrayFilter[$arraySlice[group;;1];animalId;$getAnimalInfo[$env[animalId];isRare]==true];animalId;
        $let[rarity;$getAnimalInfo[$env[animalId];rarity.0]]
        $let[weight;$floor[$math[$get[rarity] * $get[luckConfig]]]]
        $if[$and[$get[rarity]>0;$get[weight]<=0];
          $let[weight;1]
        ]

        $letSub[left;$get[weight]]
        $arrayPushJSON[pool;$objectOf[id;$env[animalId];weight;$get[weight]]]
      ]
      $arrayPushJSON[pool;$objectOf[id;$default[$jsonGet[group;0];null];weight;$max[$get[left];0]]]

      $jsonSet[result;$get[anchor];$objectOf[pool;$env[pool];total;$get[total]]]
    ]

    $return[$env[result]]
  `
});
//# sourceMappingURL=generateLuck.js.map