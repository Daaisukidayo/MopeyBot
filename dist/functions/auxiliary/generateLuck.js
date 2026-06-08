"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "generateLuck",
    description: "Generates a structured luck object with weighted pools and automatic common detection.",
    params: [
        {
            name: "_groups",
            description: "Array of animal groups.",
            type: "Json",
            required: true,
        },
        {
            name: "_luckConfig",
            description: "Luck multiplier (e.g., 1.0 is default, 2.0 is double rare chance, 0.5 is half).",
            type: "Number",
            required: false,
        }
    ],
    output: "Json",
    code: `
    $jsonLoad[result;{}]
    $let[luckConfig;$nullish[$env[_luckConfig];1]]

    $if[$isArray[$env[_groups]]==false; 
      $return[{}]
    ]

    $arrayForEach[_groups;group;
      $c[Finds the "anchor" animal to get the total value (rarity.1)]
      $let[anchor;$nullish[$env[group;0];$env[group;1]]]
      $let[total;$getAnimalInfo[$get[anchor];rarity.1]]
      $let[currentStack;0]
      
      $arrayCreate[pool]
      $let[commonID;$env[group;0]]

      $c[Iterates through all elements of the group]
      $loop[$arrayLength[group];
        $let[animalId;$arrayAt[group;$math[$env[i] - 1]]]

        $c[Skip if ID is empty or null]
        $if[$isOneOf[$get[animalId];null;]; 
          $continue
        ]

        $let[isRare;$getAnimalInfo[$get[animalId];isRare]]
        $let[rarity;$getAnimalInfo[$get[animalId];rarity.0]]

        $if[$get[isRare];;$continue]
        
        $let[modifiedRarity;$floor[$math[$get[rarity] * $get[luckConfig]]]]
        $if[$and[$get[rarity]>0;$get[modifiedRarity]<=0];
          $let[modifiedRarity;1]
        ]

        $letSum[currentStack;$get[modifiedRarity]]

        $c[Adding an entry to the pool]
        $jsonLoad[entry;{}]
        $jsonSet[entry;id;$get[animalId]]
        $jsonSet[entry;rarity;$min[$get[total];$get[currentStack]]]
        $arrayPushJSON[pool;$env[entry]]
      ;i]

      $c[Forming the final group object]
      $jsonLoad[groupData;{}]
      $jsonSet[groupData;pool;$env[pool]]
      $jsonSet[groupData;common;$get[commonID]]
      $jsonSet[groupData;total;$get[total]]

      $c[Save the result under the key of the anchor animal]
      $jsonSet[result;$get[anchor];$env[groupData]]
    ]

    $return[$env[result]]
  `
};
//# sourceMappingURL=generateLuck.js.map