export default [{
  name: "shop",
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown[$getGlobalVar[shopTT]]

    $jsonLoad[userPacks;$env[userProfile;userPacks]]
    $jsonLoad[shopItems;$getGlobalVar[shopItems]]

    ${embed()}
    $newTimeout[SHOP-$authorID;$getGlobalVar[shopTT];$sendMessage[$channelID;;true]]
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu"],
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[values;-;$selectMenuValues]

    $onlyIf[$arrayIncludes[IID;purchasingSkinpacks]]
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[userPacks;$env[userProfile;userPacks]]
    $jsonLoad[shopItems;$getGlobalVar[shopItems]]

    $let[skinpack;$env[values;0]]
    $let[cost;$env[values;1]]
    $let[msgid;$messageID]
    $let[itemIndex;$arrayFindIndex[shopItems;item;$env[item;id]==$get[skinpack]]]

    $onlyIf[$get[itemIndex]!=-1;
      $newError[$tl[ui.shop.unknown]]
    ]

    $onlyIf[$arrayIncludes[userPacks;$get[skinpack]]==false;
      $newError[$tl[ui.shop.alreadyBought]]
    ]

    $onlyif[$env[userProfile;MC]>=$get[cost];
      $newError[$tl[ui.shop.lowCash]]
    ]

    $subCash[$get[cost]]
    $arrayPush[userPacks;$get[skinpack]]
    $!jsonSet[userProfile;userPacks;$env[userPacks]]
    $saveProfile

    ${embed()}
    $interactionUpdate
    $newTimeout[SHOP-$authorID;$getGlobalVar[shopTT]]

    $interactionFollowUp[
      $ephemeral
      $addEmbed[default]
      $description[$tl[ui.shop.purchaseSuccess;$tl[data.shopSkinPacks.$get[skinpack]]]]
    ]
  `
}]

function embed() {
  return `
    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.shop.title]]

      $addActionRow
      $if[$arrayLength[userPacks]==$arrayLength[shopItems];
        
        $addStringSelectMenu[.;$tl[ui.shop.empty];true]
        $addOption[.;;.]
      ;
        $addStringSelectMenu[purchasingSkinpacks-$authorID;$tl[ui.shop.selectMenuSkinsPacksPlaceholder]]

        $loop[$arrayLength[shopItems];
          $let[i;$math[$env[i] - 1]]
          $let[id;$env[shopItems;$get[i];id]]

          $if[$arrayIncludes[userPacks;$get[id]];$continue]

          $let[cost;$env[shopItems;$get[i];cost]]
          $let[optionName;$tl[data.shopSkinPacks.$get[id]]]
          $let[optionDesc;$separate[$get[cost]]]
          $let[optionValue;$get[id]-$get[cost]]

          $addOption[$get[optionName];$get[optionDesc];$get[optionValue];$getGlobalVar[emoji]]
        ;i;true]
      ]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.shop.available;$separate[$env[userProfile;MC]]]]
    ;$getGlobalVar[defaultColor]]
  `
}