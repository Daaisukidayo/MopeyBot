"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edge_1 = require("@quoriel/edge");
exports.default = new edge_1.Command({
    name: "purchasingSkinpacks",
    type: "interactionCreate",
    allowed: ["stringSelect"],
    code: `
    $arrayLoad[IID;-;$customID]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $c[The price is taken from the shop, not from the menu]
    $jsonLoad[shopItems;$getGlobalVar[shopItems]]
    $jsonLoad[userPacks;$jsonGet[userProfile;userPacks]]
    $let[skinpack;$selectMenuValues]
    $let[cost;$jsonGet[$arrayFind[shopItems;item;$jsonGet[item;id]==$get[skinpack]];cost]]

    $onlyIf[$get[cost]!=;
      $newError[$tl[ui.shop.unknown.$get[l]]]
    ]
    $onlyIf[$arrayIncludes[userPacks;$get[skinpack]]==false;
      $newError[$tl[ui.shop.alreadyBought.$get[l]]]
    ]
    $onlyIf[$jsonGet[userProfile;MC]>=$get[cost];
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
  `,
});
//# sourceMappingURL=shop.js.map