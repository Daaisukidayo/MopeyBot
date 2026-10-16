import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "handleWardrobe",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $checkProfile

    $c[Optional for both slash and prefix: without it the menu opens]
    $let[arg;$toCamelCase[$default[$option[option];$message]]]

    $addCooldown

    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]

    $c[No option: the menu. new: every animal one by one, all or a tier: one skin pack for many animals, an animal: its skins]
    $if[$get[arg]==;
      $wardrobeMenuEmbed
    ;$if[$get[arg]==new;
      $animalsEmbed[userWardrobe;mouse;true]
    ;$if[$or[$get[arg]==all;$isNumber[$get[arg]]];
      $if[$get[arg]!=all;
        $onlyIf[$inRange[$get[arg];1;17];
          $newError[$tl[ui.wardrobe.invalidTier.$get[l]]]
        ]
      ]

      $wardrobePacksEmbed[$get[arg]]
    ;
      $let[animalId;$findAnimalId[$get[arg]]]
      $onlyIf[$get[animalId]!=;
        $newError[$tl[ui.wardrobe.invalidAnimal.$get[l]]]
      ]

      $animalsEmbed[userWardrobe;$get[animalId];false]
    ]]]

    $newCommandTimeout
  `,
})
