import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "addSkinSortMenus",
  description: "adds the sort type + order menus of a skins list (shop + balance), like the history's",
  params: [
    {
      name: "prefix",
      description: "whose menus, the custom id's first part",
      type: ArgType.String,
    },
    {
      name: "sort",
      description: "the picked one of shopSortingOptions",
      type: ArgType.String,
    },
    {
      name: "order",
      description: "the picked order, asc or desc",
      type: ArgType.String,
    },
  ],
  code: `
    $let[l;$jsonGet[userProfile;language]]
    $c[an emoji per sort type, each menu's id keeps the other's pick]
    $jsonLoad[sortEmojis;$objectOf[shop_sort_collection;🗂️;shop_sort_price;$getGlobalVar[mopecoin];shop_sort_tier;🔢;shop_sort_name;🔤]]
    $jsonLoad[sortingOrders;$getGlobalVar[sortingOrders]]

    $addActionRow
    $addStringSelectMenu[$env[prefix]-sort-$env[order]-$authorID]
    $arrayForEach[$getGlobalVar[shopSortingOptions];option;
      $addOption[$tl[ui.shop.optionNameSort.$get[l];$tl[data.shopSortingOptions.$env[option].$get[l]]];;$env[option];$jsonGet[sortEmojis;$env[option]];$checkCondition[$env[sort]==$env[option]]]
    ]
    $addActionRow
    $addStringSelectMenu[$env[prefix]-order-$env[sort]-$authorID]
    $arrayForEach[$jsonKeys[sortingOrders];option;
      $addOption[$tl[ui.shop.optionNameOrder.$get[l];$tl[data.sortingOrders.$env[option].$get[l]]];;$env[option];$jsonGet[sortingOrders;$env[option]];$checkCondition[$env[order]==$env[option]]]
    ]
  `,
})
