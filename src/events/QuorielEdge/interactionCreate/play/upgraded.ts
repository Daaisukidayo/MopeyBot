export default {
  name: "play_upgradeAnimal",
  type: "interactionCreate",
  allowed: ["button"],
  code: `
    $arrayLoad[IID;-;$customID]
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[playData;$getUserVar[userPlayData]]
    $isPlaying
    
    $removeAllApex

    $jsonLoad[rewardPerRare;$getGlobalVar[playRewardPerRare]]
    $jsonLoad[biomeColors;$getGlobalVar[biomeColors]]
    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]

    $let[animalId;$env[IID;1]]

    $let[bonusPerUpgrade;10]
    $let[bonusPerRare;$default[$env[rewardPerRare;$get[animalId]];0]]
    $let[wrI;$default[$env[userWardrobe;$get[animalId]];0]]
    
    $let[biome;$getAnimalInfo[$get[animalId];biome]]
    $let[color;$default[$env[biomeColors;$get[biome]];$getGlobalVar[defaultColor]]]
    $let[animalName;$getAnimalVariantInfo[$get[animalId];name;$get[wrI]]]

    $sumPlayCash[$math[$get[bonusPerUpgrade] + $get[bonusPerRare]]]

    $!jsonSet[playData;currentAnimal;$get[animalId]]
    $!jsonSet[playData;currentBiome;$get[biome]]
    $!jsonSet[playData;isDead;false]
    
    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.play.upgraded.$get[l];$get[animalName]]]

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