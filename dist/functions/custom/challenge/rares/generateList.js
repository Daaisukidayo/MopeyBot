"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "generateList",
    description: "Generates an object with keys: 'l' (list[] of rares, in the order of the animals), 'p' (points) and 'r' (rares).",
    output: forgescript_1.ArgType.Json,
    params: [
        {
            name: "raresList",
            description: "Object of caught rare animals.",
            type: forgescript_1.ArgType.Json,
        },
    ],
    code: `
    $jsonLoad[totals;$sumRaresList[$env[raresList]]]

    $arrayMap[$jsonEntries[$sortList[$env[raresList]]];entry;
      $return[$getAnimalInfo[$jsonGet[entry;0];emoji;0]\`$jsonGet[entry;1]\`]
    ;list]

    $if[$jsonSize[list]==0;
      $arrayPush[list;$tl[ui.challenge.none.$jsonGet[userProfile;language]]]
    ]

    $return[$objectOf[l;$env[list];p;$jsonGet[totals;points];r;$jsonGet[totals;rares]]]
  `,
});
//# sourceMappingURL=generateList.js.map