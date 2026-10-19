"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "getAnimalInfo",
    description: "Extracts an animal's base or skin information from the specified key.",
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
            name: "skin",
            description: "Optional: the skin's index in 'animal.skins', or the skin's id (e.g. lion_s2_0). If omitted, gets base info.",
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
    $let[skin;$env[skin]]

    $if[$get[animalIndex]==;
      $return[undefined]
    ]

    $if[$isOneOf[$get[skin];null;];
      $return[$default[$jsonGet[animals;$get[animalIndex];$spread[$env[key];.]];undefined]]
    ]

    $c[The skin is its index in 'skins', or its id]
    $if[$isNumber[$get[skin]]==false;
      $let[skin;$arrayFindIndex[$jsonGet[animals;$get[animalIndex];skins];item;$jsonGet[item;id]==$get[skin]]]
    ]
    $if[$get[skin]<0;
      $return[undefined]
    ]

    $return[$default[$jsonGet[animals;$get[animalIndex];skins;$get[skin];$env[key]];undefined]]
  `,
});
//# sourceMappingURL=getAnimalInfo.js.map