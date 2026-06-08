"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    type: "interactionCreate",
    allowedInteractionTypes: ["selectMenu"],
    description: "if user choses skinpack providing all as an argument",
    code: `
    $arrayLoad[IID;-;$customID]
    $onlyIf[$arrayIncludes[IID;all_wardrobe]]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $addCooldown[wardrobe;true]

    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]
    $jsonLoad[animals;$getAnimalsData]
    
    
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
      $addTextDisplay[$tl[$get[l];ui;wardrobe.allTitle]]
      $addSeparator
      $addSkinpacksMenu[all_wardrobe]
    ;$getGlobalVar[defaultColor]]
    $interactionUpdate

    $addContainer[
      $addTextDisplay[$tl[$get[l];ui;wardrobe.equippedAll;$tl[$get[l];data;shopSkinPacks.$get[value]]]]
    ;$getGlobalVar[defaultColor]]
    $ephemeral
    $interactionFollowUp

    $newCommandTimeout[wardrobe]
  `
};
//# sourceMappingURL=all.js.map