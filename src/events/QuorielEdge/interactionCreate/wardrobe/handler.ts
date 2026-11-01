import { Command } from "@quoriel/edge"

export default new Command({
  name: "wardrobe",
  type: "interactionCreate",
  allowed: ["stringSelect", "button", "modal"],
  code: `
    $arrayLoad[IID;-;$customID]
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $addCooldown[wardrobe;true]

    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]
    $c[shared ref, don't mutate 'animals']
    $cacheAnimalsData
    $getCache[animals;animalsData;animals]

    $c[option = tier, 'all', an animal or a page. value = the select menu pick]
    $let[option;$jsonGet[IID;2]]
    $let[value;$selectMenuValues]

    $switch[$jsonGet[IID;1];
      $case[menu;
        $c[start menu. every animal page by page, or one pack for a tier or for all]
        $switch[$get[value];
          $case[new;$wardrobeAnimalsEmbed[userWardrobe;1]]
          $case[tier;$wardrobeTierEmbed[pack]]
          $case[all;$wardrobePacksEmbed[all]]
        ]
        $interactionUpdate
        $newCommandTimeout[wardrobe]
      ]

      $case[chooseTier;
        $onlyIf[$inRange[$get[value];1;17];$deferUpdate]
        $wardrobePacksEmbed[$get[value]]
        $interactionUpdate
        $newCommandTimeout[wardrobe]
      ]

      $case[back;
        $c[back goes to the tier pick or the start]
        $switch[$get[option];
          $case[pack;$wardrobeTierEmbed[pack]]
          $case[default;$wardrobeMenuEmbed]
        ]
        $interactionUpdate
        $newCommandTimeout[wardrobe]
      ]

      $case[page;
        $wardrobeAnimalsEmbed[userWardrobe;$get[option]]
        $interactionUpdate
        $newCommandTimeout[wardrobe]
      ]

      $case[pick;
        $c[wear the picked skin and stay on the page]
        $getCache[animals;animalIndexes;animalIndexes]
        $onlyIf[$jsonGet[animalIndexes;$get[option]]!=;$deferUpdate]
        $!jsonSet[userWardrobe;$get[option];$get[value]]
        $setUserVar[userWardrobe;$env[userWardrobe]]
        $wardrobeAnimalsEmbed[userWardrobe;$jsonGet[IID;3]]
        $interactionUpdate
        $newCommandTimeout[wardrobe]
      ]

      $case[pageModal;
        $modal[wardrobe-pageInput-$get[option]-$authorID;$tl[ui.wardrobe.goToTitle.$get[l]]]
        $addTextInput[page;$tl[ui.wardrobe.goToPage.$get[l]];Short;false;;;;5]
        $addTextInput[tier;$tl[ui.wardrobe.goToTier.$get[l]];Short;false;;;;2]
        $addTextInput[animal;$tl[ui.wardrobe.goToAnimal.$get[l]];Short;false;;;;40]
        $showModal
        $stop
      ]

      $case[pageInput;
        $c[the first filled field wins: a page, a tier or an animal. none = the same page]
        $let[page;$get[option]]
        $if[$input[page]!=;
          $onlyIf[$isNumber[$input[page]];$newError[$tl[ui.errors.notNumber.$get[l]]]]
          $let[page;$floor[$input[page]]]
        ;$if[$input[tier]!=;
          $onlyIf[$isNumber[$input[tier]];$newError[$tl[ui.wardrobe.invalidTier.$get[l]]]]
          $onlyIf[$inRange[$input[tier];1;17];$newError[$tl[ui.wardrobe.invalidTier.$get[l]]]]
          $let[page;$default[$wardrobePageOf[tier;$input[tier]];$get[page]]]
        ;$if[$input[animal]!=;
          $let[animalId;$findAnimalId[$input[animal]]]
          $onlyIf[$get[animalId]!=;$newError[$tl[ui.wardrobe.invalidAnimal.$get[l]]]]
          $let[page;$wardrobePageOf[animal;$get[animalId]]]
          $onlyIf[$get[page]!=;$newError[$tl[ui.wardrobe.notListed.$get[l];$getAnimalInfo[$get[animalId];fullName]]]]
        ]]]
        $wardrobeAnimalsEmbed[userWardrobe;$get[page]]
        $interactionUpdate
        $newCommandTimeout[wardrobe]
      ]

      $case[packsPage;
        $wardrobePacksEmbed[$get[option];$jsonGet[IID;4]]
        $interactionUpdate
        $newCommandTimeout[wardrobe]
      ]

      $case[tier;
        $c[every animal in the tier (or in all tiers) gets its first owned skin from the pack]
        $let[pack;$jsonGet[IID;4]]
        $jsonLoad[userSkins;$getUserVar[userSkins]]
        $jsonLoad[freePacks;$getGlobalVar[freeSkinPacks]]
        $let[free;$arrayIncludes[freePacks;$get[pack]]]
        $arrayLoad[equipped]
        $arrayForEach[animals;animal;
          $if[$or[$get[option]==all;$jsonGet[animal;tier]==$get[option]];
            $let[skinIndex;$arrayFindIndex[$jsonGet[animal;skins];skin;$and[$jsonGet[skin;packId]==$get[pack];$or[$get[free];$arrayIncludes[userSkins;$jsonGet[skin;id]]]]]]
            $if[$get[skinIndex]!=-1;
              $!jsonSet[userWardrobe;$jsonGet[animal;ID];$jsonGet[animal;skins;$get[skinIndex];id]]
              $arrayPush[equipped;$jsonGet[animal;skins;$get[skinIndex];emoji]]
            ]
          ]
        ]
        $if[$jsonSize[equipped]>0;$setUserVar[userWardrobe;$env[userWardrobe]]]

        $wardrobePacksEmbed[$get[option];$jsonGet[IID;5]]
        $interactionUpdate

        $let[packName;$tl[data.shopSkinPacks.$get[pack].$get[l]]]
        $if[$get[option]==all;
          $addContainer[
            $addTextDisplay[$tl[ui.wardrobe.equippedAll.$get[l];$get[packName]]]
          ;$getGlobalVar[defaultColor]]
        ;$if[$jsonSize[equipped]>0;
          $addContainer[
            $addTextDisplay[$tl[ui.wardrobe.equippedTier.$get[l];$get[option];$get[packName]]]
            $addSeparator[Large]
            $addTextDisplay[# $arrayJoin[equipped; ]]
          ;$getGlobalVar[defaultColor]]
        ;
          $addContainer[
            $addTextDisplay[$tl[ui.wardrobe.noSkinsInTier.$get[l];$get[option];$get[packName]]]
          ;Orange]
        ]]
        $ephemeral
        $interactionFollowUp

        $newCommandTimeout[wardrobe]
      ]
    ]
  `,
})
