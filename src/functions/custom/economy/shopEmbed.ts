import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "shopEmbed",
  description: "the shop's bundles tab: a page of packs the user can still buy, each a picture with its buy button",
  params: [
    {
      name: "page",
      description: "the page, wraps around when out of range. 1 by default",
      type: ArgType.Number,
      required: false,
    },
  ],
  code: `
    $let[l;$jsonGet[userProfile;language]]
    $jsonLoad[userPacks;$jsonGet[userProfile;user_packs]]
    $jsonLoad[userSkins;$getUserVar[userSkins]]
    $c[no selling packs the user has or already got every skin of one by one]
    $arrayFilter[$getGlobalVar[shopItems];item;$and[$arrayIncludes[userPacks;$jsonGet[item;id]]==false;$hasAllPackSkins[userSkins;$jsonGet[item;id]]==false];forSale]

    $c[pages wrap around]
    $let[pageSize;$getGlobalVar[shopPacksPageSize]]
    $let[pages;$max[1;$arrayPageCount[forSale;$get[pageSize]]]]
    $let[page;$nullish[$env[page];1]]
    $let[page;$if[$get[page]<1;$get[pages];$if[$get[page]>$get[pages];1;$get[page]]]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.shop.title.$get[l]]]
      $addShopViewMenu[packs]

      $c[nothing left = a line instead of the packs, like the skins tab]
      $if[$jsonSize[forSale]==0;
        $addTextDisplay[$tl[ui.shop.empty.$get[l]]]
      ]
      $c[a picture per pack, its buy button right under it. the price is the discounted one with owned skins taken off, greyed out while the user can't afford it]
      $arrayForEach[$arrayPage[forSale;$get[page];$get[pageSize]];item;
        $let[packId;$jsonGet[item;id]]
        $let[cost;$packPrice[$get[packId];userSkins]]
        $addMediaGallery[$addMediaItem[$shopPackCard[$get[packId];userSkins;$env[i]];$tl[data.shopSkinPacks.$get[packId].$get[l]]]]
        $addActionRow
        $addButton[purchasingSkinpacks-$get[packId]-$get[page]-$authorID;$separate[$get[cost]];Success;$getGlobalVar[mopecoin];$checkCondition[$jsonGet[userProfile;mope_coins]<$get[cost]]]
      ;i]

      $if[$get[pages]>1;
        $addSeparator[Large]
        $addActionRow
        $addButton[shopSkins-packsPage-$math[$get[page] - 1]-$authorID;;Primary;⬅️]
        $addButton[shopSkins-packsPageModal-$authorID;$tl[ui.shop.pageButton.$get[l];$get[page];$get[pages]];Primary;🔎]
        $addButton[shopSkins-packsPage-$math[$get[page] + 1]-$authorID;;Primary;➡️]
      ]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.shop.available.$get[l];$separate[$jsonGet[userProfile;mope_coins]]]]
    ;$getGlobalVar[defaultColor]]
  `,
})
