import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "shopSkinsEmbed",
  description: "the shop's single skins tab: a sorted page of skins for sale, each price on its button",
  params: [
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
    {
      name: "page",
      description: "the page, wraps around when out of range. 1 by default",
      type: ArgType.Number,
      required: false,
    },
  ],
  code: `
    $let[l;$jsonGet[userProfile;language]]
    $let[sort;$nullish[$env[sort];shop_sort_collection]]
    $let[order;$nullish[$env[order];asc]]
    $jsonLoad[userSkins;$getUserVar[userSkins]]
    $jsonLoad[skins;$skinsForSale[userSkins;$get[sort];$get[order]]]

    $c[pages wrap around]
    $let[pageSize;$getGlobalVar[shopSkinsPageSize]]
    $let[pages;$max[1;$arrayPageCount[skins;$get[pageSize]]]]
    $let[page;$nullish[$env[page];1]]
    $let[page;$if[$get[page]<1;$get[pages];$if[$get[page]>$get[pages];1;$get[page]]]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.shop.title.$get[l]]]
      $addShopViewMenu[skins]
      $if[$jsonSize[skins]==0;$addTextDisplay[$tl[ui.shop.skinsEmpty.$get[l]]]]
      $c[price goes on the button, greyed out while the user's broke. 6 skins bc the separators around the menus eat into the 40 components max]
      $arrayForEach[$arrayPage[skins;$get[page];$get[pageSize]];skin;
        $let[skinId;$jsonGet[skin;id]]
        $let[animalId;$jsonGet[skin;animal]]
        $let[cost;$jsonGet[skin;cost]]
        $let[buyId;shopSkins-buy-$get[skinId]-$get[sort]-$get[order]-$get[page]-$authorID]
        $addSection[
          $addTextDisplay[$tl[ui.shop.skinLine.$get[l];$getAnimalInfo[$get[animalId];emoji;$get[skinId]];$jsonGet[skin;name];$getAnimalInfo[$get[animalId];fullName]]]
          $if[$get[cost]==0;
            $addButton[$get[buyId];$tl[ui.shop.free.$get[l]];Success]
          ;
            $addButton[$get[buyId];$separate[$get[cost]];Success;$getGlobalVar[mopecoin];$checkCondition[$jsonGet[userProfile;mope_coins]<$get[cost]]]
          ]
        ]
      ]

      $c[menus under the skins, then the pages. nothing to sort = no menus]
      $if[$jsonSize[skins]>0;
        $addSeparator[Large]
        $addSkinSortMenus[shopSkins;$get[sort];$get[order]]
      ]
      $if[$get[pages]>1;
        $addSeparator[Large]
        $addActionRow
        $addButton[shopSkins-page-$get[sort]-$get[order]-$math[$get[page] - 1]-$authorID;;Primary;⬅️]
        $addButton[shopSkins-pageModal-$get[sort]-$get[order]-$authorID;$tl[ui.shop.pageButton.$get[l];$get[page];$get[pages]];Primary;🔎]
        $addButton[shopSkins-page-$get[sort]-$get[order]-$math[$get[page] + 1]-$authorID;;Primary;➡️]
      ]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.shop.available.$get[l];$separate[$jsonGet[userProfile;mope_coins]]]]
    ;$getGlobalVar[defaultColor]]
  `,
})
