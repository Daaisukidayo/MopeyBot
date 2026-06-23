export default [{
  name: 'handleShop',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer

    $jsonLoad[userPacks;$env[userProfile;userPacks]]
    $jsonLoad[shopItems;$getGlobalVar[shopItems]]

    $shopEmbed
    $newCommandTimeout
  `
},{
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

        $loop[$arrayLength[shopItems];
          $let[i;$math[$env[i] - 1]]
          $let[id;$env[shopItems;$get[i];id]]

          $if[$arrayIncludes[userPacks;$get[id]];$continue]

          $let[cost;$env[shopItems;$get[i];cost]]
          $let[optionName;$tl[data.shopSkinPacks.$get[id].$get[l]]]
          $let[optionDesc;$separate[$get[cost]]]
          $let[optionValue;$get[id]-$get[cost]]

          $addOption[$get[optionName];$get[optionDesc];$get[optionValue];$getGlobalVar[mopecoin]]
        ;i;true]
      ]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.shop.available.$get[l];$separate[$env[userProfile;MC]]]]
    ;$getGlobalVar[defaultColor]]
  `
}]