export default {
  name: 'handleWardrobe',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile

    $let[arg;$toCamelCase[$default[$option[option];$message]]]

    $onlyIf[$get[arg]!=;
      $newError[$tl[ui.errors.usage.$get[l];$if[$guildID==;$getGlobalVar[prefix];$getGuildVar[prefix]]wardrobe {new|all|<$tl[ui.args.tier.$get[l]]>|<$tl[ui.args.fullAnimalName.$get[l]]>}]]
    ]

    $addCooldown

    $jsonLoad[animals;$getAnimalsData]
    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]
    
    
    $arrayMap[animals;animal;$return[$env[animal;ID]];animalIds]

    $if[$get[arg]==new;
      $animalsEmbed[mouse;true]
    ;
      $if[$get[arg]==all;
        $addContainer[
          $addAuthorDisplay
          $addTextDisplay[$tl[ui.wardrobe.allTitle.$get[l]]]
          $addSeparator
          $addSkinpacksMenu[all]
        ;$getGlobalVar[defaultColor]]
      ;
        $if[$isNumber[$get[arg]];
          $onlyIf[$and[$get[arg]>=1;$get[arg]<=17];
            $newError[$tl[ui.wardrobe.invalidTier.$get[l]]]
          ]

          $addContainer[
            $addAuthorDisplay
            $addTextDisplay[$tl[ui.wardrobe.tierTitle.$get[l];$get[arg]]]
            $addSeparator
            $addSkinpacksMenu[$get[arg]]
          ;$getGlobalVar[defaultColor]]
        ;
          $onlyIf[$arrayIncludes[animalIds;$get[arg]];
            $newError[$tl[ui.wardrobe.invalidAnimal.$get[l]]]
          ]

          $animalsEmbed[$get[arg];false]
        ]
      ]
    ]

    $newCommandTimeout
  `
}