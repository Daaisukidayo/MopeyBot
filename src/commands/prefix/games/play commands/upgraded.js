export default {
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  description: "upgraded",
  code: `
    $arrayLoad[IID;-;$customID]
    $onlyIf[$arrayIncludes[IID;upgrade_animal_play]]
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[playData;$getUserVar[userPlayData]]
    $isPlaying
    
    $removeAllApex

    $jsonLoad[rewardPerRare;$getGlobalVar[playRewardPerRare]]
    $jsonLoad[biomeColors;$getGlobalVar[biomeColors]]
    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]

    $let[animalID;$env[IID;0]]

    $let[bonusPerUpgrade;10]
    $let[bonusPerRare;$default[$env[rewardPerRare;$get[animalID]];0]]
    $let[wrI;$default[$env[userWardrobe;$get[animalID]];0]]
    
    $let[biome;$getAnimalInfo[$get[animalID];biome]]
    $let[color;$nullish[$env[biomeColors;$get[biome]];$getGlobalVar[defaultColor]]]
    $let[animalName;$getAnimalVariantInfo[$get[animalID];name;$get[wrI]]]

    $sumPlayCash[$math[$get[bonusPerUpgrade] + $get[bonusPerRare]]]
    $!jsonSet[playData;currentAnimal;$get[animalID]]
    $!jsonSet[playData;currentBiome;$get[biome]]
    $!jsonSet[playData;isDead;false]
    
    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.play.upgraded;$get[animalName]]]
      $addSeparator[Large]
      $displayAnimalStats
      $addActionsMenu
      $addSeparator[Large]
      $addExitButton
      $addCheats
    ;$get[color]]

    $updatePlayData
    $interactionUpdate
  `
}