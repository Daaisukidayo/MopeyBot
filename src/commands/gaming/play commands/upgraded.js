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

    $let[animalID;$env[IID;0]]
    $onlyIf[$env[animalsIndexes;$get[animalID]]!=]

    $jsonLoad[rareReward;${playSnippets.rareReward()}]
    $let[bonusPerUpgrade;50]

    $let[bonusPerRare;$default[$env[rareReward;$get[animalID]];0]]

    $let[wardrobeIndex;$env[userWardrobe;$get[animalID]]]
    $let[color;$env[biomeColors;$env[animals;$env[animalsIndexes;$get[animalID]];biome]]]
    $let[thumbnail;$env[animals;$env[animalsIndexes;$get[animalID]];variants;$get[wardrobeIndex];img]]
    $let[emoji;$env[animals;$env[animalsIndexes;$get[animalID]];variants;$get[wardrobeIndex];emoji]]
    $let[animalName;$env[animals;$env[animalsIndexes;$get[animalID]];variants;$get[wardrobeIndex];name]]
    $let[biome;$env[animals;$env[animalsIndexes;$get[animalID]];biome]]

    $!jsonSet[playData;MC;$math[$get[bonusPerUpgrade] + $env[playData;MC] + $get[bonusPerRare]]]
    $!jsonSet[playData;currentAnimal;$get[animalID]]
    $!jsonSet[playData;color;$get[color]]
    $!jsonSet[playData;currentBiome;$get[biome]]
    $!jsonSet[playData;animalBiome;$get[biome]]

    $thumbnail[$get[thumbnail]]
    $color[$get[color]]
    $description[## You upgraded to __$get[emoji] $get[animalName]__!\n${playSnippets.animalStats()}]
    $getGlobalVar[author]

    ${playSnippets.actionMenu()}
    ${playSnippets.exitButton()}
    $setUserVar[userPlayData;$env[playData]]
    $interactionUpdate
  `
}