import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "sortSkins",
  description: "sorts skins (catalog-like objects) by the shop's sort + order, ties keep the list's order",
  output: ArgType.Json,
  params: [
    {
      name: "listVar",
      description: "var w/ the skins, in collection order",
      type: ArgType.String,
    },
    {
      name: "sort",
      description: "one of shopSortingOptions, shop_sort_collection by default",
      type: ArgType.String,
      required: false,
    },
    {
      name: "order",
      description: "asc (default) or desc",
      type: ArgType.String,
      required: false,
    },
  ],
  code: `
    $ref[skins;$env[listVar]]
    $let[order;$nullish[$env[order];asc]]
    $c[sorts are stable, so ties stay in collection order. the collection sort just flips for desc]
    $switch[$nullish[$env[sort];shop_sort_collection];
      $case[shop_sort_price;$return[$arraySortBy[skins;$get[order];cost]]]
      $case[shop_sort_tier;$return[$arraySortBy[skins;$get[order];animalIndex]]]
      $case[shop_sort_name;$return[$arraySortBy[skins;$get[order];name]]]
    ]
    $if[$get[order]==desc;$return[$arrayReverse[skins]]]
    $return[$env[skins]]
  `,
})
