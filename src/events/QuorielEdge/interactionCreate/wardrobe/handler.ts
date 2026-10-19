import { Command } from "@quoriel/edge"

export default new Command({
  name: "wardrobe",
  type: "interactionCreate",
  allowed: ["stringSelect", "button"],
  code: `
    $arrayLoad[IID;-;$customID]
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $addCooldown[wardrobe;true]

    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]
    $c[Read by reference: never modify 'animals']
    $cacheAnimalsData
    $getCache[animals;animalsData;animals]

    $c[The option is a tier, 'all' or an animal. The value is a skin pack, or the id of the animal's skin]
    $let[option;$jsonGet[IID;2]]
    $let[value;$selectMenuValues]

    $switch[$jsonGet[IID;1];
      $case[menu;
        $c[The start menu: every animal one by one from the mouse, or what to choose next]
        $switch[$get[value];
          $case[new;$animalsEmbed[userWardrobe;mouse;true]]
          $case[animal;$wardrobeTierEmbed[animal]]
          $case[tier;$wardrobeTierEmbed[pack]]
          $case[all;$wardrobePacksEmbed[all]]
        ]
        $interactionUpdate
        $newCommandTimeout[wardrobe]
      ]

      $case[chooseTier;
        $c[The tier is chosen for a skin pack of the whole tier, or for one of its animals]
        $onlyIf[$inRange[$get[value];1;17];$deferUpdate]
        $if[$get[option]==animal;
          $wardrobeAnimalsEmbed[userWardrobe;$get[value]]
        ;
          $wardrobePacksEmbed[$get[value]]
        ]
        $interactionUpdate
        $newCommandTimeout[wardrobe]
      ]

      $case[back;
        $c[Back: to the start menu, a tier choice, or a tier's animals]
        $switch[$get[option];
          $case[menu;$wardrobeMenuEmbed]
          $case[pack;$wardrobeTierEmbed[pack]]
          $case[animal;$wardrobeTierEmbed[animal]]
          $case[default;
            $onlyIf[$inRange[$get[option];1;17];$deferUpdate]
            $wardrobeAnimalsEmbed[userWardrobe;$get[option]]
          ]
        ]
        $interactionUpdate
        $newCommandTimeout[wardrobe]
      ]

      $case[goto;
        $c[Previous and Next: keep one by one on or off]
        $getCache[animals;animalIndexes;animalIndexes]
        $onlyIf[$jsonGet[animalIndexes;$get[option]]!=;$deferUpdate]
        $animalsEmbed[userWardrobe;$get[option];$jsonGet[IID;4]]
        $interactionUpdate
        $newCommandTimeout[wardrobe]
      ]

      $case[chooseAnimal;
        $getCache[animals;animalIndexes;animalIndexes]
        $onlyIf[$jsonGet[animalIndexes;$get[value]]!=;$deferUpdate]
        $animalsEmbed[userWardrobe;$get[value];false]
        $interactionUpdate
        $newCommandTimeout[wardrobe]
      ]

      $case[tier;
        $c[Every animal of the tier, or of all tiers, gets its skin of the pack]
        $arrayLoad[equipped]
        $arrayForEach[animals;animal;
          $if[$or[$get[option]==all;$jsonGet[animal;tier]==$get[option]];
            $let[skinIndex;$arrayFindIndex[$jsonGet[animal;skins];skin;$jsonGet[skin;packId]==$get[value]]]
            $if[$get[skinIndex]!=-1;
              $!jsonSet[userWardrobe;$jsonGet[animal;ID];$jsonGet[animal;skins;$get[skinIndex];id]]
              $arrayPush[equipped;$jsonGet[animal;skins;$get[skinIndex];emoji]]
            ]
          ]
        ]
        $if[$jsonSize[equipped]>0;$setUserVar[userWardrobe;$env[userWardrobe]]]

        $wardrobePacksEmbed[$get[option]]
        $interactionUpdate

        $c[An ephemeral message tells what was equipped]
        $let[pack;$tl[data.shopSkinPacks.$get[value].$get[l]]]
        $if[$get[option]==all;
          $addContainer[
            $addTextDisplay[$tl[ui.wardrobe.equippedAll.$get[l];$get[pack]]]
          ;$getGlobalVar[defaultColor]]
        ;$if[$jsonSize[equipped]>0;
          $addContainer[
            $addTextDisplay[$tl[ui.wardrobe.equippedTier.$get[l];$get[option];$get[pack]]]
            $addSeparator[Large]
            $addTextDisplay[# $arrayJoin[equipped; ]]
          ;$getGlobalVar[defaultColor]]
        ;
          $addContainer[
            $addTextDisplay[$tl[ui.wardrobe.noSkinsInTier.$get[l];$get[option];$get[pack]]]
          ;Orange]
        ]]
        $ephemeral
        $interactionFollowUp

        $newCommandTimeout[wardrobe]
      ]

      $case[animal;
        $let[animalId;$get[option]]
        $getCache[animals;animalIndexes;animalIndexes]
        $onlyIf[$jsonGet[animalIndexes;$get[animalId]]!=;$deferUpdate]

        $!jsonSet[userWardrobe;$get[animalId];$get[value]]
        $setUserVar[userWardrobe;$env[userWardrobe]]

        $c[One by one: the next animal with more than one skin, none after the last]
        $if[$jsonGet[IID;4];
          $let[animalId;$jsonGet[$arrayFind[$arraySlice[animals;;$math[$jsonGet[animalIndexes;$get[animalId]] + 1]];animal;$jsonSize[animal;skins]>1];ID]]
          $onlyIf[$get[animalId]!=;
            $addContainer[
              $addAuthorDisplay
              $addTextDisplay[$tl[ui.wardrobe.everyEquipped.$get[l]]]
            ;$getGlobalVar[defaultColor]]
            $interactionUpdate
            $!stopCommandTimeout[wardrobe]
          ]
        ]

        $animalsEmbed[userWardrobe;$get[animalId];$jsonGet[IID;4]]
        $interactionUpdate
        $newCommandTimeout[wardrobe]
      ]
    ]
  `,
})
