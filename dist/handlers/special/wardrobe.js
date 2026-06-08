"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'handleWardrobe',
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile

    $let[arg;$toCamelCase[$default[$option[option];$message]]]

    $onlyIf[$get[arg]!=;
      $newError[$tl[$get[l];ui;errors.usage;$if[$guildID==;$getGlobalVar[prefix];$getGuildVar[prefix]]wardrobe {new|all|<$tl[$get[l];ui;args.tier]>|<$tl[$get[l];ui;args.fullAnimalName]>}]]
    ]

    $addCooldown

    $jsonLoad[animals;$getAnimalsData]
    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]
    
    
    $arrayMap[animals;animal;$return[$env[animal;ID]];animalIDs]

    $if[$get[arg]==new;
      $let[animalID;mouse]
      $animalsEmbed[new_wardrobe]
    ;
      $if[$get[arg]==all;
        $addContainer[
          $addAuthorDisplay
          $addTextDisplay[$tl[$get[l];ui;wardrobe.allTitle]]
          $addSeparator
          $addSkinpacksMenu[all_wardrobe]
        ;$getGlobalVar[defaultColor]]
      ;
        $if[$isNumber[$get[arg]];
          $addContainer[
            $addAuthorDisplay
            $addTextDisplay[$tl[$get[l];ui;wardrobe.tierTitle;$get[arg]]]
            $addSeparator
            $addSkinpacksMenu[$get[arg]_wardrobe]
          ;$getGlobalVar[defaultColor]]
        ;
          $onlyIf[$arrayIncludes[animalIDs;$get[arg]];
            $newError[$tl[$get[l];ui;wardrobe.invalidAnimal]]
          ]

          $let[animalID;$get[arg]]
          $animalsEmbed[animal_wardrobe]
        ]
      ]
    ]
    
    $newCommandTimeout
  `
};
//# sourceMappingURL=wardrobe.js.map