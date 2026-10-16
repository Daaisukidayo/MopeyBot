"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "getAnimalInfo",
    description: "Extracts animal's main or variant information from the specified key.",
    output: forgescript_1.ArgType.Unknown,
    params: [
        {
            name: "animalId",
            description: "Animal or rare identifier from res/data/animals.",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "key",
            description: "Information to get from the JSON structure.",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "variant",
            description: "Optional: the skin's index in 'animal.variants', or the skin's id (e.g. lion_s2_0). If omitted, gets base info.",
            type: forgescript_1.ArgType.String,
            required: false,
        },
    ],
    code: `
    $c[Read by reference: never modify 'animals']
    $if[$hasCache[animals;animalsData]==false;$cacheAnimalsData]
    $getCache[animals;animalsData;animals]
    $getCache[animals;animalIndexes;animalIndexes]

    $let[animalIndex;$jsonGet[animalIndexes;$env[animalId]]]
    $let[variant;$env[variant]]

    $if[$get[animalIndex]==;
      $return[undefined]
    ]

    $if[$isOneOf[$get[variant];null;];
      $return[$default[$jsonGet[animals;$get[animalIndex];$spread[$env[key];.]];undefined]]
    ]

    $c[The variant is the skin's index in 'variants', or the skin's id]
    $if[$isNumber[$get[variant]]==false;
      $let[variant;$arrayFindIndex[$jsonGet[animals;$get[animalIndex];variants];skin;$jsonGet[skin;id]==$get[variant]]]
    ]
    $if[$get[variant]<0;
      $return[undefined]
    ]

    $return[$default[$jsonGet[animals;$get[animalIndex];variants;$get[variant];$env[key]];undefined]]
  `,
});
//# sourceMappingURL=getAnimalInfo.js.map