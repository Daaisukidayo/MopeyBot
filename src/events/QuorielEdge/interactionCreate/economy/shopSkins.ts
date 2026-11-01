import { Command } from "@quoriel/edge"

export default new Command({
  name: "shopSkins",
  type: "interactionCreate",
  allowed: ["stringSelect", "button", "modal"],
  code: `
    $arrayLoad[IID;-;$customID]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $addCooldown[shop;true]

    $c[view = the tab buttons, sort/order = the menus (back to page 1), page = the arrows, pageModal + pageInput = jump to a typed page like in history. buying's below]
    $switch[$jsonGet[IID;1];
      $case[view;$if[$jsonGet[IID;2]==packs;$shopEmbed;$shopSkinsEmbed[shop_sort_collection;asc;1]]]
      $case[sort;$shopSkinsEmbed[$selectMenuValues;$jsonGet[IID;2];1]]
      $case[order;$shopSkinsEmbed[$jsonGet[IID;2];$selectMenuValues;1]]
      $case[page;$shopSkinsEmbed[$jsonGet[IID;2];$jsonGet[IID;3];$jsonGet[IID;4]]]
      $case[pageModal;
        $modal[shopSkins-pageInput-$jsonGet[IID;2]-$jsonGet[IID;3]-$authorID;$tl[ui.shop.modalTitlePage.$get[l]]]
        $addTextInput[pageInput;$tl[ui.shop.modalDescriptionPage.$get[l]];Short;true;;;1;5]
        $showModal
        $stop
      ]
      $case[pageInput;
        $onlyIf[$isNumber[$input[pageInput]];
          $newError[$tl[ui.errors.notNumber.$get[l]]]
        ]
        $shopSkinsEmbed[$jsonGet[IID;2];$jsonGet[IID;3];$floor[$input[pageInput]]]
      ]
    ]
    $if[$jsonGet[IID;1]!=buy;
      $interactionUpdate
      $newCommandTimeout[shop]
      $stop
    ]

    $c[the price comes from the catalog, never trust the button]
    $let[skinId;$jsonGet[IID;2]]
    $arrayLoad[idParts;.;$get[skinId]]
    $let[animalId;$jsonGet[idParts;0]]
    $jsonLoad[userSkins;$getUserVar[userSkins]]
    $jsonLoad[userPacks;$jsonGet[userProfile;user_packs]]

    $onlyIf[$and[$arrayIncludes[userSkins;$get[skinId]]==false;$arrayIncludes[userPacks;$jsonGet[idParts;1]]==false];
      $newError[$tl[ui.shop.skinOwned.$get[l]]]
    ]
    $jsonLoad[forSale;$skinsForSale[userSkins]]
    $let[cost;$jsonGet[$arrayFind[forSale;skin;$jsonGet[skin;id]==$get[skinId]];cost]]
    $onlyIf[$get[cost]!=;
      $newError[$tl[ui.shop.skinNotForSale.$get[l]]]
    ]
    $onlyIf[$jsonGet[userProfile;mope_coins]>=$get[cost];
      $newError[$tl[ui.shop.lowCash.$get[l]]]
    ]

    $callMethod[userProfile;takeCoins;$get[cost]]
    $callMethod[userProfile;save]
    $arrayPush[userSkins;$get[skinId]]
    $setUserVar[userSkins;$env[userSkins]]

    $c[redraw so the bought skin drops off the page]
    $shopSkinsEmbed[$jsonGet[IID;3];$jsonGet[IID;4];$jsonGet[IID;5]]
    $interactionUpdate
    $newCommandTimeout[shop]

    $interactionFollowUp[
      $ephemeral
      $addContainer[
        $addAuthorDisplay
        $addTextDisplay[$tl[ui.shop.purchaseSuccess.$get[l];$getAnimalInfo[$get[animalId];name;$get[skinId]]]]
      ;$getGlobalVar[defaultColor]]
    ]
  `,
})
