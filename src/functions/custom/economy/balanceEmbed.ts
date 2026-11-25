import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "balanceEmbed",
  description: "the balance message: coins + the bought packs, or a sorted page of the user's skins",
  params: [
    {
      name: "view",
      description: "'packs' or 'skins'",
      type: ArgType.String,
    },
    {
      name: "sort",
      description: "the skins' sort, one of shopSortingOptions. shop_sort_collection by default",
      type: ArgType.String,
      required: false,
    },
    {
      name: "order",
      description: "asc (default) or desc",
      type: ArgType.String,
      required: false,
    },
    {
      name: "page",
      description: "the skins page, wraps around when out of range. 1 by default",
      type: ArgType.Number,
      required: false,
    },
  ],
  code: `
    $let[l;$jsonGet[userProfile;language]]
    $c[the card counts skins on both tabs]
    $let[sort;$nullish[$env[sort];shop_sort_collection]]
    $let[order;$nullish[$env[order];asc]]
    $jsonLoad[userSkins;$getUserVar[userSkins]]
    $c[no Classic or Gold-trim, see balanceHiddenPacks]
    $jsonLoad[skins;$ownedSkins[userSkins;$getGlobalVar[balanceHiddenPacks];$get[sort];$get[order]]]
    $if[$env[view]==skins;
      $c[pages wrap around]
      $let[pageSize;$getGlobalVar[balanceSkinsPageSize]]
      $let[pages;$max[1;$arrayPageCount[skins;$get[pageSize]]]]
      $let[page;$nullish[$env[page];1]]
      $let[page;$if[$get[page]<1;$get[pages];$if[$get[page]>$get[pages];1;$get[page]]]]
      $jsonLoad[pageSkins;$arrayPage[skins;$get[page];$get[pageSize]]]
    ]

    $addContainer[
      $addAuthorDisplay
      $c[the bundle list or the page's skins are on the card]
      $c[the card's text for screen readers, the count of what's listed goes right before the list]
      $let[skinCount;$tl[ui.balance.cardSkins.$get[l];$jsonSize[skins]]]
      $let[packCount;$tl[ui.balance.cardPacks.$get[l];$jsonSize[userProfile;user_packs]]]
      $let[alt;$tl[data.leaderboardTypes.mc.$get[l]]: $jsonGet[userProfile;mope_coins] · $if[$env[view]==packs;$get[skinCount] · $get[packCount];$get[packCount] · $get[skinCount]]]
      $let[list;$if[$env[view]==packs;$arrayJoin[$arrayMap[$jsonGet[userProfile;user_packs];pack;$return[$tl[data.shopSkinPacks.$env[pack].$get[l]]]];, ];$arrayJoin[$arrayMap[pageSkins;skin;$return[$jsonGet[skin;name]]];, ]]]
      $if[$get[list]!=;$let[alt;$get[alt]: $get[list]]]
      $c[discord takes up to 1024 characters, all the bundles' Russian names together are close to that already]
      $addMediaGallery[$addMediaItem[$balanceCard[$jsonSize[skins];$env[view];pageSkins];$cropText[$get[alt];0;1000;...]]]
      $addSeparator[Large]
      $addShopViewMenu[$env[view];balance]

      $if[$env[view]==skins;
        $c[menus under the tab buttons, then the pages. nothing to sort = no menus]
        $if[$jsonSize[skins]>0;
          $addSeparator[Large]
          $addSkinSortMenus[balance;$get[sort];$get[order]]
        ]
        $if[$get[pages]>1;
          $addSeparator[Large]
          $addActionRow
          $addButton[balance-page-$get[sort]-$get[order]-$math[$get[page] - 1]-$authorID;;Primary;⬅️]
          $addButton[balance-pageModal-$get[sort]-$get[order]-$authorID;$tl[ui.shop.pageButton.$get[l];$get[page];$get[pages]];Primary;🔎]
          $addButton[balance-page-$get[sort]-$get[order]-$math[$get[page] + 1]-$authorID;;Primary;➡️]
        ]
      ]
    ;$getGlobalVar[defaultColor]]
  `,
})
