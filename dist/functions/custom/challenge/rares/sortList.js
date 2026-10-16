"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "sortList",
    description: "Sorts list based on their positions in animals.json.",
    output: forgescript_1.ArgType.Json,
    params: [
        {
            name: "raresList",
            description: "Object with caught rares",
            type: forgescript_1.ArgType.Json,
        },
    ],
    code: `
    $getCache[animals;animalIndexes;animalIndexes]

    $if[$jsonSize[raresList]==0;
      $return[$objectOf]
    ]

    $c[Rares follow the animals' order, one missing from the animals goes last]
    $jsonLoad[keys;$arrayPluck[$arraySortBy[$arrayMap[$jsonKeys[raresList];id;$return[$objectOf[id;$env[id];index;$jsonGet[animalIndexes;$env[id]]]]];asc;index];id]]
    $return[$objectPick[raresList;$spread[$arrayJoin[keys;,];,]]]
  `,
});
//# sourceMappingURL=sortList.js.map