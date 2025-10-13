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
    $let[tier;$env[playData;tier]]

    $!jsonSet[playData;currentBiome;$get[biome]]
    $!jsonSet[playData;color;$get[color]]
    $setUserVar[userPlayData;$env[playData]]

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]
      $addSection[
        $addTextDisplay[## Successfully moved to __$get[biome]__!]
        $addThumbnail[$env[playData;currentAnimalImg]]
      ]
      $addTextDisplay[${playSnippets.animalStats()}]
      $if[$get[tier]==17;
        ${playSnippets.hasAllApex()}
      ]
      ${playSnippets.actionMenu()}
      $addSeparator
      ${playSnippets.exitButton()}
    ;$env[playData;color]]
    $interactionUpdate
  `
}