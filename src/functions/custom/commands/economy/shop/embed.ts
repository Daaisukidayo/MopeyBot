import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: 'shopEmbed',
  code: `
    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.shop.title.$get[l]]]

      $addActionRow
      $if[$arrayLength[userPacks]==$arrayLength[shopItems];
        $addStringSelectMenu[.;$tl[ui.shop.empty.$get[l]];true]
        $addOption[.;;.]
      ;
        $addStringSelectMenu[purchasingSkinpacks-$authorID;$tl[ui.shop.selectMenuSkinsPacksPlaceholder.$get[l]]]

        $forOf[shopItems;item;
          $let[id;$env[item;id]]

          $if[$arrayIncludes[userPacks;$get[id]];$continue]

          $let[cost;$env[item;cost]]
          $let[optionName;$tl[data.shopSkinPacks.$get[id].$get[l]]]
          $let[optionDesc;$separate[$get[cost]]]
          $let[optionValue;$get[id]-$get[cost]]

          $addOption[$get[optionName];$get[optionDesc];$get[optionValue];$getGlobalVar[mopecoin]]
        ;i]
      ]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.shop.available.$get[l];$separate[$env[userProfile;MC]]]]
    ;$getGlobalVar[defaultColor]]
  `
})