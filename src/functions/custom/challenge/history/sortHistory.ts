import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "sortHistory",
  description: "Sorts history pages based on the specified sort type.",
  output: ArgType.Json,
  params: [
    {
      name: "history",
      description: "Array of history pages.",
      type: ArgType.Json
    },
    {
      name: "sortType",
      description: "Type of sorting to apply.",
      type: ArgType.Number
    },
    {
      name: "rareAnimalId",
      description: "The rare to sort by, for the sort type 3.",
      type: ArgType.String,
      required: false
    },
    {
      name: "order",
      description: "'asc' or 'desc' (the default).",
      type: ArgType.String,
      required: false
    }
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
  `
})
