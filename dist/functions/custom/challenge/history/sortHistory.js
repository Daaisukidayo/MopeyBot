"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "sortHistory",
    description: "sorts history pages by the given sort type",
    output: forgescript_1.ArgType.Json,
    params: [
        {
            name: "history",
            description: "array of history pages",
            type: forgescript_1.ArgType.Json,
        },
        {
            name: "sortType",
            description: "one of sortingOptions",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "rareAnimalId",
            description: "the rare to sort by, for history_sort_rareanimal",
            type: forgescript_1.ArgType.String,
            required: false,
        },
        {
            name: "order",
            description: "'asc' or 'desc' (default)",
            type: forgescript_1.ArgType.String,
            required: false,
        },
    ],
    code: `
    $let[order;$if[$env[order]==asc;asc;desc]]

    $c[missing values sort last either way, so for a rare sort asc is just desc reversed]
    $if[$and[$env[sortType]==history_sort_rareanimal;$isOneOf[$env[rareAnimalId];null;]==false];
      $jsonLoad[byRare;$arraySortBy[history;desc;raresList;$env[rareAnimalId]]]
      $return[$if[$get[order]==asc;$arrayReverse[byRare];$env[byRare]]]
    ]

    $return[$switch[$env[sortType];
      $case[history_sort_endingdate;$arraySortBy[history;$get[order];endDate]]
      $case[history_sort_totalpoints;$arraySortBy[history;$get[order];points]]
      $case[history_sort_totalrares;$arraySortBy[history;$get[order];rares]]
      $case[default;$env[history]]
    ]]
  `,
});
//# sourceMappingURL=sortHistory.js.map