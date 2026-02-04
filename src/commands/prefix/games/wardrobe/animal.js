export default {
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu"],
  description: "if user providing animal as an argument",
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[values;-;$selectMenuValues]

    $onlyIf[$arrayIncludes[IID;animal_wardrobe]]
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]
    $jsonLoad[animals;$getAnimalsData]
    $!jsonSet[funcCache;animals;$env[animals]]
    $!jsonSet[funcCache;animalIndexes;$getGlobalVar[animalIndexes]]
    $arrayMap[animals;animal;$return[$env[animal;ID]];animalIDs]

    $let[animalID;$env[values;0]]
    $let[variant;$env[values;1]]

    $onlyIf[$arrayIncludes[animalIDs;$get[animalID]];
      $newError[$tl[ui.wardrobe.invalidAnimal]]
    ]

    $!jsonSet[userWardrobe;$get[animalID];$get[variant]]
    $setUserVar[userWardrobe;$env[userWardrobe]]

    $animalsEmbed[animal_wardrobe]
    $interactionUpdate
    $newTimeout[wardrobe-$authorID;$getGlobalVar[wardrobeTT]]
  `
}