"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "sortList",
    description: "sorts the list by the animals order in animals.json",
    output: forgescript_1.ArgType.Json,
    params: [
        {
            name: "raresList",
            description: "caught rares",
            type: forgescript_1.ArgType.Json,
        },
    ],
    code: `
    $getCache[animals;animalIndexes;animalIndexes]

    $if[$jsonSize[raresList]==0;
      $return[$objectOf]
    ]

    $c[follow the animals order, unknown ones go last]
    $jsonLoad[keys;$arrayPluck[$arraySortBy[$arrayMap[$jsonKeys[raresList];id;$return[$objectOf[id;$env[id];index;$jsonGet[animalIndexes;$env[id]]]]];asc;index];id]]
    $return[$objectPick[raresList;$spread[$arrayJoin[keys;,];,]]]
  `,
});
//# sourceMappingURL=sortList.js.map