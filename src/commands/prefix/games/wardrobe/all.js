export default {
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu"],
  description: "if user choses skinpack providing all as an argument",
  code: `
    $arrayLoad[IID;-;$customID]

    $onlyIf[$arrayIncludes[IID;all_wardrobe]]
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]
    $jsonLoad[animals;$getAnimalsData]
    $!jsonSet[funcCache;animals;$env[animals]]
    $!jsonSet[funcCache;animalIndexes;$getGlobalVar[animalIndexes]]
    $arrayMap[animals;animal;$return[$env[animal;ID]];animalIDs]
    
    $let[value;$selectMenuValues]

    $arrayForEach[animalIDs;animalID;
      $jsonLoad[variants;$getAnimalInfo[$env[animalID];variants]]

      $loop[$arrayLength[variants];
        $let[i;$math[$env[i] - 1]]
        $let[packId;$env[variants;$get[i];packId]]

        $if[$get[packId]==$get[value];;$continue]

        $!jsonSet[userWardrobe;$env[animalID];$get[i]]

        $break
      ;i;true]
    ]
    $setUserVar[userWardrobe;$env[userWardrobe]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.wardrobe.equippedAll;$tl[data.shopSkinPacks.$get[value]]]]
    ;$getGlobalVar[defaultColor]]
    $interactionUpdate
    $!stopTimeout[wardrobe-$authorID]
  `
}