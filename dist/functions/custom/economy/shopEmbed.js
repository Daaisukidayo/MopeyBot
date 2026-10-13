"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "shopEmbed",
    description: "Displays the shop of skin packs: the packs the user does not have yet.",
    code: `
    $let[l;$jsonGet[userProfile;language]]
    $jsonLoad[userPacks;$jsonGet[userProfile;userPacks]]
    $arrayFilter[$getGlobalVar[shopItems];item;$arrayIncludes[userPacks;$jsonGet[item;id]]==false;forSale]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.shop.title.$get[l]]]

      $addActionRow
      $if[$jsonSize[forSale]==0;
        $addStringSelectMenu[.;$tl[ui.shop.empty.$get[l]];true]
        $addOption[.;;.]
      ;
        $addStringSelectMenu[purchasingSkinpacks-$authorID;$tl[ui.shop.selectMenuSkinsPacksPlaceholder.$get[l]]]
        $arrayForEach[forSale;item;
          $addOption[$tl[data.shopSkinPacks.$jsonGet[item;id].$get[l]];$separate[$jsonGet[item;cost]];$jsonGet[item;id];$getGlobalVar[mopecoin]]
        ]
      ]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.shop.available.$get[l];$separate[$jsonGet[userProfile;MC]]]]
    ;$getGlobalVar[defaultColor]]
  `
});
//# sourceMappingURL=shopEmbed.js.map