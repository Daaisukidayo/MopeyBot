"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    type: "interactionCreate",
    allowedInteractionTypes: ["selectMenu"],
    description: "if user providing animal as an argument",
    code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[values;-;$selectMenuValues]
    $onlyIf[$arrayIncludes[IID;animal_wardrobe]]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]
    $jsonLoad[animals;$getAnimalsData]
    
    
    $arrayMap[animals;animal;$return[$env[animal;ID]];animalIDs]

    $let[animalID;$env[values;0]]
    $let[variant;$env[values;1]]

    $onlyIf[$arrayIncludes[animalIDs;$get[animalID]];
      $newError[$tl[$get[l];ui;wardrobe.invalidAnimal]]
    ]

    $addCooldown[wardrobe;true]

    $!jsonSet[userWardrobe;$get[animalID];$get[variant]]
    $setUserVar[userWardrobe;$env[userWardrobe]]

    $animalsEmbed[animal_wardrobe]
    $interactionUpdate
    $newCommandTimeout[wardrobe]
  `
};
//# sourceMappingURL=animal.js.map