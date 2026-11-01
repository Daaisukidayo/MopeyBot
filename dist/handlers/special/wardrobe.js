"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "handleWardrobe",
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $checkProfile

    $c[optional for slash and prefix, no arg opens the menu]
    $let[arg;$toCamelCase[$default[$option[option];$message]]]

    $addCooldown

    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]

    $c[no option: the menu. new: every animal page by page. all or a tier: one pack for many. an animal: the page w/ it]
    $if[$get[arg]==;
      $wardrobeMenuEmbed
    ;$if[$get[arg]==new;
      $wardrobeAnimalsEmbed[userWardrobe;1]
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
      $let[page;$wardrobePageOf[animal;$get[animalId]]]
      $onlyIf[$get[page]!=;
        $newError[$tl[ui.wardrobe.notListed.$get[l];$getAnimalInfo[$get[animalId];fullName]]]
      ]

      $wardrobeAnimalsEmbed[userWardrobe;$get[page]]
    ]]]

    $newCommandTimeout
  `,
});
//# sourceMappingURL=wardrobe.js.map