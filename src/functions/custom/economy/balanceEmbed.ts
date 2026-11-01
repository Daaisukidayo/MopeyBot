import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "balanceEmbed",
  description: "the balance msg: coins + the bought packs, or a sorted page of the user's skins",
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
    $if[$env[view]==skins;
      $let[sort;$nullish[$env[sort];shop_sort_collection]]
      $let[order;$nullish[$env[order];asc]]
      $jsonLoad[userSkins;$getUserVar[userSkins]]
      $c[no Classic or Gold-trim, see balanceHiddenPacks]
      $jsonLoad[skins;$ownedSkins[userSkins;$getGlobalVar[balanceHiddenPacks];$get[sort];$get[order]]]
      $c[pages wrap around]
      $let[pageSize;$getGlobalVar[balanceSkinsPageSize]]
      $let[pages;$max[1;$arrayPageCount[skins;$get[pageSize]]]]
      $let[page;$nullish[$env[page];1]]
      $let[page;$if[$get[page]<1;$get[pages];$if[$get[page]>$get[pages];1;$get[page]]]]
    ]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.balance.title.$get[l]]]
      $addTextDisplay[$tl[ui.balance.mc.$get[l];$separate[$jsonGet[userProfile;mope_coins]]]]
      $addSeparator[Large]
      $addShopViewMenu[$env[view];balance]

      $if[$env[view]==packs;
        $let[packs;$arrayJoin[$arrayMap[$jsonGet[userProfile;user_packs];pack;$return[$tl[data.shopSkinPacks.$env[pack].$get[l]]]];\n]]
        $addTextDisplay[$tl[ui.balance.purchased.$get[l]]]
        $addTextDisplay[$codeBlock[$default[$get[packs];$tl[ui.balance.none.$get[l]]]]]
      ;
        $addTextDisplay[$tl[ui.balance.skins.$get[l];$jsonSize[skins]]]
        $if[$jsonSize[skins]==0;
          $addTextDisplay[$codeBlock[$tl[ui.balance.none.$get[l]]]]
        ;
          $c[lines like the shop's]
          $addTextDisplay[$arrayJoin[$arrayMap[$arrayPage[skins;$get[page];$get[pageSize]];skin;
            $return[$tl[ui.shop.skinLine.$get[l];$getAnimalInfo[$jsonGet[skin;animal];emoji;$jsonGet[skin;id]];$jsonGet[skin;name];$getAnimalInfo[$jsonGet[skin;animal];fullName]]]
          ];\n]]
        ]
        $c[menus under the skins, then the pages. nothing to sort = no menus]
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
