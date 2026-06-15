export default {
  name: "play_moveToBiome",
  type: "interactionCreate",
  allowed: ['stringSelect'],
  code: `
    $arrayLoad[IID;-;$customID]
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $let[value;$selectMenuValues]

    $jsonLoad[playData;$getUserVar[userPlayData]]
    $isPlaying
    
    $jsonLoad[biomeColors;$getGlobalVar[biomeColors]]
    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]

    $let[biome;$get[value]]

    $!jsonSet[playData;currentBiome;$get[biome]]
    $updatePlayData

    $let[animalId;$env[playData;currentAnimal]]
    $let[color;$env[biomeColors;$get[biome]]]
    $let[thumbnail;$getAnimalVariantInfo[$get[animalId];img;$env[userWardrobe;$get[animalId]]]]

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
}