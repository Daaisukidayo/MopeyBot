import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "sortHistory",
  description: "sorts history pages by the given sort type",
  output: ArgType.Json,
  params: [
    {
      name: "history",
      description: "array of history pages",
      type: ArgType.Json,
    },
    {
      name: "sortType",
      description: "one of sortingOptions",
      type: ArgType.String,
    },
    {
      name: "rareAnimalId",
      description: "the rare to sort by, for history_sort_rareanimal",
      type: ArgType.String,
      required: false,
    },
    {
      name: "order",
      description: "'asc' or 'desc' (default)",
      type: ArgType.String,
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
})
