import playSnippets from '#snippets/playSnippets.js'

export default {
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  description: "upgraded",
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;upgrade,play,animal]
    $onlyIf[$arrayEvery[passKeys;key;$arrayIncludes[IID;$env[key]]]]
    ${playSnippets.loadJSON()}
    $onlyIf[$arrayIncludes[IID;$authorID];$callFunction[notYourBTN]]

    ${playSnippets.hasStarted()}
    ${playSnippets.removeAllApex()}

    $let[animalID;$env[IID;0]]
    $let[animalIndex;$env[animalsIndexes;$get[animalID]]]

    $jsonLoad[rareReward;${playSnippets.rareReward()}]
    $let[bonusPerUpgrade;50]
    $let[bonusPerRare;$default[$env[rareReward;$get[animalID]];0]]
    $let[wardrobeIndex;$default[$env[userWardrobe;$get[animalID]];0]]
    
    $let[color;$default[$env[biomeColors;$env[animals;$get[animalIndex];biome]];000000]]
    $let[thumbnail;$env[animals;$get[animalIndex];variants;$get[wardrobeIndex];img]]
    $let[emoji;$default[$env[animals;$get[animalIndex];variants;$get[wardrobeIndex];emoji];<:undefined:1427991209246199848>]]
    $let[animalName;$default[$env[animals;$get[animalIndex];variants;$get[wardrobeIndex];name];undefined]]
    $let[biome;$default[$env[animals;$get[animalIndex];biome];Land]]

    $!jsonSet[playData;MC;$math[$get[bonusPerUpgrade] + $env[playData;MC] + $get[bonusPerRare]]]
    $!jsonSet[playData;currentAnimal;$get[animalID]]
    $!jsonSet[playData;currentAnimalImg;$get[thumbnail]]
    $!jsonSet[playData;color;$get[color]]
    $!jsonSet[playData;currentBiome;$get[biome]]
    $!jsonSet[playData;animalBiome;$get[biome]]
    
    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]
      $addSection[
        $addThumbnail[$get[thumbnail]]
        $addTextDisplay[## You upgraded to __$get[emoji] $get[animalName]__!]
      ]
      $addSeparator[Small;false]
      ${playSnippets.actionMenu()}
      ${playSnippets.animalStats()}
      $addSeparator[Large]
      ${playSnippets.exitButton()}
    ;$get[color]]

    $setUserVar[userPlayData;$env[playData]]
    $interactionUpdate
  `
}