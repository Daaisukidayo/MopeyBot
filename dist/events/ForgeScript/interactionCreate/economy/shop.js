"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    type: "interactionCreate",
    allowedInteractionTypes: ["selectMenu"],
    code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[values;-;$selectMenuValues]

    $onlyIf[$arrayIncludes[IID;purchasingSkinpacks]]

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
      $newError[$tl[$get[l];ui;shop.unknown]]
    ]

    $onlyIf[$arrayIncludes[userPacks;$get[skinpack]]==false;
      $newError[$tl[$get[l];ui;shop.alreadyBought]]
    ]

    $onlyif[$env[userProfile;MC]>=$get[cost];
      $newError[$tl[$get[l];ui;shop.lowCash]]
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
        $addTextDisplay[$tl[$get[l];ui;shop.purchaseSuccess;$tl[$get[l];data;shopSkinPacks.$get[skinpack]]]]
      ;$getGlobalVar[defaultColor]]
    ]
  `
};
//# sourceMappingURL=shop.js.map