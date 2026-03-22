export default [{
  name: "kingdragon",
  aliases: ["kd"],
  type: "messageCreate",
  code: `
    $handleKingdragon
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  description: "showing king dragon upgrade menu",
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;blackDragon,kingdragon]
    $onlyIf[$arrayEvery[passKeys;key;$arrayIncludes[IID;$env[key]]]]

    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $addCooldown[kingdragon;true]

    $let[wrIndex;$env[IID;0]]
    $let[MC;750]
    $let[successRarity;$random[1;100]]
    $let[successChance;60]

    $addContainer[
      $addAuthorDisplay
      
      $if[$get[successChance]>=$get[successRarity];
        $addTextDisplay[$tl[ui.kingdragon.chooseUpgrade]]
        $addUpgradeMenuAnimalChoices[kingDragon]
        $let[color;$getGlobalVar[defaultColor]]
        $newCommandTimeout[kingdragon]
      ; 
        $sumCash[$get[MC]]
        $saveProfile

        $let[BD;$getAnimalVariantInfo[blackDragon;emoji;$get[wrIndex]]]
        $let[reason;$advArrayRandomValue[$tl[ui.kingdragon.reasons;$random[0;12]]]]
        $let[content;$tl[ui.kingdragon.attempt;$get[BD];$get[reason];$separate[$get[MC]]]]

        $addTextDisplay[$get[content]]
        $let[color;$getGlobalVar[errorColor]]

        $!stopCommandTimeout[kingdragon]
      ]
    ;$get[color]]

    $interactionUpdate
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  description: "showing kingdragon final message",
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;kingDragon,kingdragon]
    $onlyIf[$arrayEvery[passKeys;key;$arrayIncludes[IID;$env[key]]]]

    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
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
        $addTextDisplay[$tl[ui.kingdragon.upgrade;$get[animalDisplay];$separate[$get[MC]]]]
        $addThumbnail[$get[thumbnail]]
      ]
    ;$get[color]]

    $interactionUpdate
    $!stopCommandTimeout[kingdragon]
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  description: "showing kingdragon by luck final message",
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;rareKingDragon,kingdragon]
    $onlyIf[$arrayEvery[passKeys;key;$arrayIncludes[IID;$env[key]]]]

    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
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
        $addTextDisplay[$tl[ui.kingdragon.byLuckUpgrade;$get[animalDisplay];$separate[$get[MC]]]]
        $addThumbnail[$get[thumbnail]]
      ]
      $addTextDisplay[$tl[ui.kingdragon.rarity;$env[rareKingDragonRarity;0];$env[rareKingDragonRarity;1]]]
    ;$get[color]]

    $interactionUpdate
    $!stopCommandTimeout[kingdragon]
  `
}]