export default {
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
    
    
    $arrayMap[animals;animal;$return[$env[animal;ID]];animalIds]

    $if[$get[arg]==new;
      $animalsEmbed[mouse;true]
    ;
      $if[$get[arg]==all;
        $addContainer[
          $addAuthorDisplay
          $addTextDisplay[$tl[$get[l];ui;wardrobe.allTitle]]
          $addSeparator
          $addSkinpacksMenu[all]
        ;$getGlobalVar[defaultColor]]
      ;
        $if[$isNumber[$get[arg]];
          $onlyIf[$and[$get[arg]>=1;$get[arg]<=17];
            $newError[$tl[$get[l];ui;wardrobe.invalidTier]]
          ]

          $addContainer[
            $addAuthorDisplay
            $addTextDisplay[$tl[$get[l];ui;wardrobe.tierTitle;$get[arg]]]
            $addSeparator
            $addSkinpacksMenu[$get[arg]]
          ;$getGlobalVar[defaultColor]]
        ;
          $onlyIf[$arrayIncludes[animalIds;$get[arg]];
            $newError[$tl[$get[l];ui;wardrobe.invalidAnimal]]
          ]

          $animalsEmbed[$get[arg];false]
        ]
      ]
    ]

    $newCommandTimeout
  `
}