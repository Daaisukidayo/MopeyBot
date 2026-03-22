export default [{
  name: "shop",
  type: "messageCreate",
  code: `
    $handleShop
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

    $addCooldown[shop;true]

    $subCash[$get[cost]]
    $arrayPush[userPacks;$get[skinpack]]
    $!jsonSet[userProfile;userPacks;$env[userPacks]]
    $saveProfile

    $shopEmbed
    $interactionUpdate
    $newCommandTimeout[shop]

    $interactionFollowUp[
      $ephemeral
      $addContainer[
        $addAuthorDisplay
        $addTextDisplay[$tl[ui.shop.purchaseSuccess;$tl[data.shopSkinPacks.$get[skinpack]]]]
      ;$getGlobalVar[defaultColor]]
    ]
  `
}]