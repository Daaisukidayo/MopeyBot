export default {
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu"],
  description: "if user choses skinpack providing number as an argument",
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[IIDkey;_;$env[IID;0]]
    $let[tier;$env[IIDkey;0]]
    
    $onlyIf[$isNumber[$get[tier]]]
    $onlyIf[$arrayIncludes[IIDkey;wardrobe]]
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]
    
    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]
    $jsonLoad[animals;$getAnimalsData]
    $!jsonSet[funcCache;animals;$env[animals]]
    $!jsonSet[funcCache;animalIndexes;$getGlobalVar[animalIndexes]]
    $arrayMap[animals;animal;$return[$env[animal;ID]];animalIDs]
    
    $arrayLoad[content]

    $let[value;$selectMenuValues]
    
    $loop[$arrayLength[animalIDs];
      $let[i;$math[$env[i] - 1]]
      $let[animalID;$arrayAt[animalIDs;$get[i]]]
      $let[animalTier;$getAnimalInfo[$get[animalID];tier]]

      $if[$get[animalTier]>$get[tier];$break]
      $if[$get[animalTier]!=$get[tier];$continue]

      $jsonLoad[variants;$getAnimalInfo[$get[animalID];variants]]

      $loop[$arrayLength[variants];
        $let[j;$math[$env[j] - 1]]
        $let[emoji;$env[variants;$get[j];emoji]]
        $let[packId;$env[variants;$get[j];packId]]

        $if[$get[packId]==$get[value];;$continue]

        $!jsonSet[userWardrobe;$get[animalID];$get[j]]
        $arrayPush[content;$get[emoji]]

        $break
      ;j;true]
    ;i;true]


    $if[$arrayLength[content]>0;
      $setUserVar[userWardrobe;$env[userWardrobe]]

      $addContainer[
        $addAuthorDisplay
        $addTextDisplay[$tl[ui.wardrobe.equippedTier;$get[tier];$tl[data.shopSkinPacks.$get[value]]]]
        $addSeparator[Large]
        $addTextDisplay[# $arrayJoin[content; ]]
      ;$getGlobalVar[defaultColor]]
    ;
      $addContainer[
        $addAuthorDisplay
        $addTextDisplay[$tl[ui.wardrobe.noSkinsInTier;$get[tier];$tl[data.shopSkinPacks.$get[value]]]]
      ;Orange]
    ]

    $interactionUpdate
    $!stopTimeout[wardrobe-$authorID]
  `
}