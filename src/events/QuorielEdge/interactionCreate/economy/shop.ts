import { Command } from "@quoriel/edge"

export default new Command({
  name: "purchasingSkinpacks",
  type: "interactionCreate",
  allowed: ["button"],
  code: `
    $arrayLoad[IID;-;$customID]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $c[id: purchasingSkinpacks-pack-page-author. price = shop data with the discount and owned skins off, never trust the button]
    $jsonLoad[userPacks;$jsonGet[userProfile;user_packs]]
    $jsonLoad[userSkins;$getUserVar[userSkins]]
    $let[skinpack;$jsonGet[IID;1]]
    $let[cost;$packPrice[$get[skinpack];userSkins]]

    $onlyIf[$get[cost]!=;
      $newError[$tl[ui.shop.unknown.$get[l]]]
    ]
    $onlyIf[$arrayIncludes[userPacks;$get[skinpack]]==false;
      $newError[$tl[ui.shop.alreadyBought.$get[l]]]
    ]
    $onlyIf[$hasAllPackSkins[userSkins;$get[skinpack]]==false;
      $newError[$tl[ui.shop.allSkinsOwned.$get[l]]]
    ]
    $onlyIf[$jsonGet[userProfile;mope_coins]>=$get[cost];
      $newError[$tl[ui.shop.lowCash.$get[l]]]
    ]

    $addCooldown[shop;true]

    $callMethod[userProfile;takeCoins;$get[cost]]
    $arrayPush[userPacks;$get[skinpack]]
    $!jsonSet[userProfile;user_packs;$env[userPacks]]
    $callMethod[userProfile;save]

    $c[the follow-up card shows the pack as bought: the price paid, skins owned before]
    $jsonLoad[skinsBefore;$env[userSkins]]

    $c[the pack's skins are theirs right away, no waiting for the startup sync]
    $jsonLoad[boughtPacks;$arrayOf[$get[skinpack]]]
    $!grantPackSkins[userSkins;boughtPacks]
    $setUserVar[userSkins;$env[userSkins]]

    $c[back on the same page, it wraps if the bought pack was the last one there]
    $shopEmbed[$jsonGet[IID;2]]
    $interactionUpdate
    $newCommandTimeout[shop]

    $interactionFollowUp[
      $ephemeral
      $addContainer[
        $addAuthorDisplay
        $addTextDisplay[$tl[ui.shop.purchaseSuccess.$get[l];$tl[data.shopSkinPacks.$get[skinpack].$get[l]]]]
        $addMediaGallery[$addMediaItem[$shopPackCard[$get[skinpack];skinsBefore;0];$tl[data.shopSkinPacks.$get[skinpack].$get[l]]]]
      ;$getGlobalVar[defaultColor]]
    ]
  `,
})
