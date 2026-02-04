export default {
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu'],
  description: 'move to biome',
  code: `
    $arrayLoad[IID;-;$customID]
    $let[value;$selectMenuValues]

    $onlyIf[$arrayIncludes[IID;moveToBiome_play]]
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
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
      $addTextDisplay[$tl[ui.play.movedTo;$tl[data.biomes.$get[biome]]]]
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