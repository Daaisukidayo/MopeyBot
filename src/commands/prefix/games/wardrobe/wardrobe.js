export default [{
  name: "wardrobe", 
  aliases: ["wr"], 
  type: "messageCreate", 
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown[10s]

    $let[arg;$toCamelCase[$message]]

    $onlyIf[$get[arg]!=;
      $newError[$tl[ui.errors.usage;$getGuildVar[prefix]$commandName {new|all|<$tl[ui.args.tier]>|<$tl[ui.args.fullAnimalName]>}]]
    ]

    $jsonLoad[animals;$getAnimalsData]
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
          $addTextDisplay[$tl[ui.$commandName.allTitle]]
          $addSeparator
          $addSkinpacksMenu[all_wardrobe]
        ;$getGlobalVar[defaultColor]]
      ;
        $if[$isNumber[$get[arg]];
          $addContainer[
            $addAuthorDisplay
            $addTextDisplay[$tl[ui.$commandName.tierTitle;$get[arg]]]
            $addSeparator
            $addSkinpacksMenu[$get[arg]_wardrobe]
          ;$getGlobalVar[defaultColor]]
        ;
          $onlyIf[$arrayIncludes[animalIDs;$get[arg]];
            $newError[$tl[ui.$commandName.invalidAnimal]]
          ]

          $let[animalID;$get[arg]]
          $animalsEmbed[animal_wardrobe]
        ]
      ]
    ]
    
    $newTimeout[wardrobe-$authorID;$getGlobalVar[wardrobeTT];$sendMessage[$channelID;;true]]
  `
}]