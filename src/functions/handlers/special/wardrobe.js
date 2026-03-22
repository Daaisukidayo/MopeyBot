export default {
  name: 'handleWardrobe',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile

    $let[arg;$toCamelCase[$default[$option[choice];$message]]]

    $onlyIf[$get[arg]!=;
      $newError[$tl[ui.errors.usage;$getGuildVar[prefix]wardrobe {new|all|<$tl[ui.args.tier]>|<$tl[ui.args.fullAnimalName]>}]]
    ]

    $addCooldown

    $jsonLoad[animals;$getAnimalsData]
    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]
    $!jsonSet[funcCache;animals;$env[animals]]
    $!jsonSet[funcCache;animalIndexes;$getGlobalVar[animalIndexes]]
    $arrayMap[animals;animal;$return[$env[animal;ID]];animalIDs]

    $if[$get[arg]==new;
      $let[animalID;mouse]
      $animalsEmbed[new_wardrobe]
    ;
      $if[$get[arg]==all;
        $addContainer[
          $addAuthorDisplay
          $addTextDisplay[$tl[ui.wardrobe.allTitle]]
          $addSeparator
          $addSkinpacksMenu[all_wardrobe]
        ;$getGlobalVar[defaultColor]]
      ;
        $if[$isNumber[$get[arg]];
          $addContainer[
            $addAuthorDisplay
            $addTextDisplay[$tl[ui.wardrobe.tierTitle;$get[arg]]]
            $addSeparator
            $addSkinpacksMenu[$get[arg]_wardrobe]
          ;$getGlobalVar[defaultColor]]
        ;
          $onlyIf[$arrayIncludes[animalIDs;$get[arg]];
            $newError[$tl[ui.wardrobe.invalidAnimal]]
          ]

          $let[animalID;$get[arg]]
          $animalsEmbed[animal_wardrobe]
        ]
      ]
    ]
    
    $newCommandTimeout
  `
}