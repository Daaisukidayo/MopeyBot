"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "getAnimalVariantInfo",
    description: "Extracts animal's skin information from the specified key.",
    params: [
        {
            name: "_animalId",
            description: "Animal identifier from 'animals.json'.",
            type: "String",
            required: true,
        },
        {
            name: "_key",
            description: "What information to get.",
            type: "String",
            required: true,
        },
        {
            name: "_variant",
            description: "Variant ID from 'animal.variants' (default: 0).",
            type: "Number",
            required: false,
        }
    ],
    code: `
    $jsonLoad[animals;$getAnimalsData]
    $getCache[animalIndexes;animalIndexes]

    $let[i;$nullish[$env[_variant];0]]
    $let[animalId;$env[animalIndexes;$env[_animalId]]]

    $if[$or[$get[animalId]==;$isNumber[$get[i]]==false;$get[i]<0];
      $return[undefined]
    ]

    $let[foundKey;$env[animals;$get[animalId];variants;$get[i];$env[_key]]]

    $return[$default[$get[foundKey];undefined]]
  `
};
//# sourceMappingURL=getAnimalVariantInfo.js.map