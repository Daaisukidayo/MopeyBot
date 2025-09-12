import playSnippets from '#snippets/playSnippets.js'

export default {
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu'],
  description: 'move to biome',
  code: `
    $arrayLoad[IID;-;$customID]
    $let[value;$selectMenuValues]
    $arrayLoad[passKeys;,;moveTo,play]

    $onlyIf[$arrayEvery[passKeys;key;$arrayIncludes[IID;$env[key]]]]
    ${playSnippets.loadJSON()}
    $onlyIf[$arrayIncludes[IID;$authorID];$callFunction[notYourBTN]]

    ${playSnippets.hasStarted()}

    $let[biome;$get[value]]
    $let[color;$env[biomeColors;$get[biome]]]

    $!jsonSet[playData;currentBiome;$get[biome]]
    $!jsonSet[playData;color;$get[color]]

    $description[## Successfully moved to __$get[biome]__!\n${playSnippets.animalStats()}]
    $getGlobalVar[author]
    $color[$env[playData;color]]
    ${playSnippets.actionMenu()}
    ${playSnippets.exitButton()}
    $interactionUpdate
    
    $setUserVar[userPlayData;$env[playData]]
  `
}