"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [{
        type: "interactionCreate",
        allowedInteractionTypes: ["button"],
        description: "showing king dragon upgrade menu",
        code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;blackDragon,kingdragon]
    $onlyIf[$arrayEvery[passKeys;key;$arrayIncludes[IID;$env[key]]]]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $addCooldown[kingdragon;true]

    $let[wrIndex;$env[IID;0]]
    $let[MC;750]
    $let[successRarity;$random[1;100]]
    $let[successChance;60]

    $addContainer[
      $addAuthorDisplay
      
      $if[$get[successChance]>=$get[successRarity];
        $addTextDisplay[$tl[$get[l];ui;kingdragon.chooseUpgrade]]
        $addUpgradeMenuAnimalChoices[kingDragon]
        $let[color;$getGlobalVar[defaultColor]]
        $newCommandTimeout[kingdragon]
      ; 
        $sumCash[$get[MC]]
        $saveProfile

        $let[BD;$getAnimalVariantInfo[blackDragon;emoji;$get[wrIndex]]]
        $let[reason;$advArrayRandomValue[$tl[$get[l];ui;kingdragon.reasons;$random[0;12]]]]
        $let[content;$tl[$get[l];ui;kingdragon.attempt;$get[BD];$get[reason];$separate[$get[MC]]]]

        $addTextDisplay[$get[content]]
        $let[color;$getGlobalVar[errorColor]]

        $!stopCommandTimeout[kingdragon]
      ]
    ;$get[color]]

    $interactionUpdate
  `
    }, {
        type: "interactionCreate",
        allowedInteractionTypes: ["button"],
        description: "showing kingdragon final message",
        code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;kingDragon,kingdragon]
    $onlyIf[$arrayEvery[passKeys;key;$arrayIncludes[IID;$env[key]]]]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $addCooldown[kingdragon;true]

    $jsonLoad[colors;$getGlobalVar[kingDragonColors]]
    $let[wrIndex;$env[IID;0]]
    $let[animalDisplay;$getAnimalVariantInfo[kingDragon;name;$get[wrIndex]]]
    $let[thumbnail;$getAnimalVariantInfo[kingDragon;img;$get[wrIndex]]]
    $let[color;$env[colors;$get[wrIndex]]]

    $let[MC;2500]
    $sumCash[$get[MC]]
    $saveProfile

    $addContainer[
      $addAuthorDisplay
      $addSection[
        $addTextDisplay[$tl[$get[l];ui;kingdragon.upgrade;$get[animalDisplay];$separate[$get[MC]]]]
        $addThumbnail[$get[thumbnail]]
      ]
    ;$get[color]]

    $interactionUpdate
    $!stopCommandTimeout[kingdragon]
  `
    }, {
        type: "interactionCreate",
        allowedInteractionTypes: ["button"],
        description: "showing kingdragon by luck final message",
        code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;rareKingDragon,kingdragon]
    $onlyIf[$arrayEvery[passKeys;key;$arrayIncludes[IID;$env[key]]]]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $addCooldown[kingdragon;true]

    $let[wrIndex;$env[IID;0]]
    $let[animalDisplay;$getAnimalVariantInfo[rareKingDragon;name;$get[wrIndex]]]
    $let[thumbnail;$getAnimalVariantInfo[rareKingDragon;img;$get[wrIndex]]]
    $let[color;$getGlobalVar[rareKingDragonColor]]
    $let[MC;250000]

    $sumCash[$get[MC]]
    $saveProfile

    $addContainer[
      $addAuthorDisplay
      $addSection[
        $addTextDisplay[$tl[$get[l];ui;kingdragon.byLuckUpgrade;$get[animalDisplay];$separate[$get[MC]]]]
        $addThumbnail[$get[thumbnail]]
      ]
      $addTextDisplay[$tl[$get[l];ui;kingdragon.rarity;$env[rareKingDragonRarity;0];$env[rareKingDragonRarity;1]]]
    ;$get[color]]

    $interactionUpdate
    $!stopCommandTimeout[kingdragon]
  `
    }];
//# sourceMappingURL=kingDragon.js.map