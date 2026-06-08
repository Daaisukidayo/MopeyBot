"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    type: 'interactionCreate',
    allowedInteractionTypes: ['selectMenu'],
    code: `
    $arrayLoad[IID;-;$customID]
    $let[value;$selectMenuValues]

    $onlyIf[$arrayIncludes[IID;moveToBiome_play]]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[playData;$getUserVar[userPlayData]]
    $isPlaying
    
    $jsonLoad[biomeColors;$getGlobalVar[biomeColors]]
    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]

    $let[biome;$get[value]]

    $!jsonSet[playData;currentBiome;$get[biome]]
    $updatePlayData

    $let[animalID;$env[playData;currentAnimal]]
    $let[color;$env[biomeColors;$get[biome]]]
    $let[thumbnail;$getAnimalVariantInfo[$get[animalID];img;$env[userWardrobe;$get[animalID]]]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[$get[l];ui;play.movedTo;$tl[$get[l];data;biomes.$get[biome]]]]
      $addSeparator[Large]
      $displayAnimalStats
      $addActionsMenu
      $addSeparator
      $addExitButton
      $addCheats
    ;$get[color]]
    $interactionUpdate
  `
};
//# sourceMappingURL=moveToBiome.js.map