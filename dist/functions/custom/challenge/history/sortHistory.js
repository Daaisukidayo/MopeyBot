"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "sortHistory",
    description: "Sorts history pages based on the specified sort type.",
    output: forgescript_1.ArgType.Json,
    params: [
        {
            name: "history",
            description: "Array of history pages.",
            type: forgescript_1.ArgType.Json,
        },
        {
            name: "sortType",
            description: "Type of sorting to apply.",
            type: forgescript_1.ArgType.Number,
        },
        {
            name: "rareAnimalId",
            description: "The rare to sort by, for the sort type 3.",
            type: forgescript_1.ArgType.String,
            required: false,
        },
        {
            name: "order",
            description: "'asc' or 'desc' (the default).",
            type: forgescript_1.ArgType.String,
            required: false,
        },
    ],
    code: `
    $let[order;$if[$env[order]==asc;asc;desc]]

    $c[Sorting puts a missing value last in both orders, so by a rare the ascending order is the reversed descending one]
    $if[$and[$env[sortType]==3;$isOneOf[$env[rareAnimalId];null;]==false];
      $jsonLoad[byRare;$arraySortBy[history;desc;raresList;$env[rareAnimalId]]]
      $return[$if[$get[order]==asc;$arrayReverse[byRare];$env[byRare]]]
    ]

    $return[$switch[$env[sortType];
      $case[-1;$arraySortBy[history;asc;endDate]]
      $case[0;$arraySortBy[history;$get[order];endDate]]
      $case[1;$arraySortBy[history;$get[order];points]]
      $case[2;$arraySortBy[history;$get[order];rares]]
      $case[3;$env[history]]
      $case[default;$env[history]]
    ]]
  `,
});
//# sourceMappingURL=sortHistory.js.map