export default {
  name: "purchasingSkinpacks",
  type: "interactionCreate",
  allowed: ["stringSelect"],
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[values;-;$selectMenuValues]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[userPacks;$env[userProfile;userPacks]]
    $jsonLoad[shopItems;$getGlobalVar[shopItems]]

    $let[skinpack;$env[values;0]]
    $let[cost;$env[values;1]]
    $let[msgid;$messageID]
    $let[itemIndex;$arrayFindIndex[shopItems;item;$env[item;id]==$get[skinpack]]]

    $onlyIf[$get[itemIndex]!=-1;
      $newError[$tl[ui.shop.unknown.$get[l]]]
    ]

    $onlyIf[$arrayIncludes[userPacks;$get[skinpack]]==false;
      $newError[$tl[ui.shop.alreadyBought.$get[l]]]
    ]

    $onlyif[$env[userProfile;MC]>=$get[cost];
      $newError[$tl[ui.shop.lowCash.$get[l]]]
    ]

    $addCooldown[shop;true]

    $subCash[$get[cost]]
    $arrayPush[userPacks;$get[skinpack]]
    $!jsonSet[userProfile;userPacks;$env[userPacks]]
    $saveProfile[$env[userProfile]]

    $shopEmbed
    $interactionUpdate
    $newCommandTimeout[shop]

    $interactionFollowUp[
      $ephemeral
      $addContainer[
        $addAuthorDisplay
        $addTextDisplay[$tl[ui.shop.purchaseSuccess.$get[l];$tl[data.shopSkinPacks.$get[skinpack].$get[l]]]]
      ;$getGlobalVar[defaultColor]]
    ]
  `
}