"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "shopEmbed",
    description: "the shop's bundles tab: packs the user can still buy",
    code: `
    $let[l;$jsonGet[userProfile;language]]
    $jsonLoad[userPacks;$jsonGet[userProfile;user_packs]]
    $jsonLoad[userSkins;$getUserVar[userSkins]]
    $c[no selling packs the user has or already got every skin of one by one]
    $arrayFilter[$getGlobalVar[shopItems];item;$and[$arrayIncludes[userPacks;$jsonGet[item;id]]==false;$hasAllPackSkins[userSkins;$jsonGet[item;id]]==false];forSale]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.shop.title.$get[l]]]
      $addShopViewMenu[packs]

      $c[nothing left = a line instead of the menu, like the skins tab]
      $if[$jsonSize[forSale]==0;
        $addTextDisplay[$tl[ui.shop.empty.$get[l]]]
      ;
        $addActionRow
        $addStringSelectMenu[purchasingSkinpacks-$authorID;$tl[ui.shop.selectMenuSkinsPacksPlaceholder.$get[l]]]
        $c[discounts go next to the name, owned skins make the pack cheaper and the menu says how many]
        $cacheAnimalsData
        $getCache[animals;packSkins;packSkins]
        $arrayForEach[forSale;item;
          $let[packId;$jsonGet[item;id]]
          $let[name;$tl[data.shopSkinPacks.$get[packId].$get[l]]]
          $let[discount;$default[$jsonGet[item;discount];0]]
          $let[price;$separate[$packPrice[$get[packId];userSkins]]]
          $jsonLoad[packIds;$default[$jsonGet[packSkins;$get[packId]];$arrayOf]]
          $let[owned;$arrayCount[packIds;skinId;$arrayIncludes[userSkins;$env[skinId]]]]
          $addOption[$if[$get[discount]>0;$tl[ui.shop.packDiscount.$get[l];$get[name];$get[discount]];$get[name]];$if[$get[owned]>0;$tl[ui.shop.packOwnedSkins.$get[l];$get[price];$get[owned];$jsonSize[packIds]];$get[price]];$get[packId];$getGlobalVar[mopecoin]]
        ]
      ]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.shop.available.$get[l];$separate[$jsonGet[userProfile;mope_coins]]]]
    ;$getGlobalVar[defaultColor]]
  `,
});
//# sourceMappingURL=shopEmbed.js.map