export default {
  type: "interactionCreate", 
  allowedInteractionTypes: ["selectMenu"],
  description: "if user's argument is new",
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[values;-;$selectMenuValues]
    
    $onlyIf[$arrayIncludes[IID;new_wardrobe]]

    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]
    
    $let[animalID;$env[values;0]]
    $let[variant;$env[values;1]]

    $onlyIf[$getAnimalInfo[$get[animalID];ID]!=;$deferUpdate]

    $addCooldown[wardrobe;true]

    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]
    $jsonLoad[animals;$getAnimalsData]
    $jsonLoad[animalIndexes;$getGlobalVar[animalIndexes]]

    $!jsonSet[funcCache;animals;$env[animals]]
    $!jsonSet[funcCache;animalIndexes;$env[animalIndexes]]
    $jsonLoad[animalIDs;$jsonKeys[animalIndexes]]

    $!jsonSet[userWardrobe;$get[animalID];$get[variant]]
    $setUserVar[userWardrobe;$env[userWardrobe]]        

    $let[i;$arrayIndexOf[animalIDs;$get[animalID]]]

    $loop[-1;
      $letSum[i;1]
      $let[animalID;$arrayAt[animalIDs;$get[i]]]
      $if[$getAnimalVariantInfo[$get[animalID];name;1]==undefined;;$break]
    ]

    $onlyIf[$get[animalID]!=;
      $addContainer[
        $addAuthorDisplay
        $addTextDisplay[$tl[ui.wardrobe.everyEquipped]]
      ;$getGlobalVar[defaultColor]]
      $interactionUpdate
      $!stopCommandTimeout[wardrobe]
    ]

    $animalsEmbed[new_wardrobe]
    $interactionUpdate
    $newCommandTimeout[wardrobe]
  `
}