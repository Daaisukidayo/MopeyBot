import playSnippets from '#snippets/playSnippets.js'

export default {
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu'],
  description: 'downgrading',
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;actions,play]
    $onlyIf[$arrayEvery[passKeys;key;$arrayIncludes[IID;$env[key]]]]
    $onlyIf[$selectMenuValues==downgrade]
    ${playSnippets.loadJSON()}
    $onlyIf[$arrayIncludes[IID;$authorID];$callFunction[notYourBTN]]

    ${playSnippets.hasStarted()}

    $let[currentBiome;$env[playData;currentBiome]]
    $let[animalBiome;$env[playData;animalBiome]]


    $if[$and[$includes[$get[animalBiome];Land;Desert;Arctic;Forest;Ocean];$includes[$get[currentBiome];Volcano;Desert]];
      
      $let[desc;## You chose to downgrade by diving into lava!]

    ;$if[$and[$includes[$get[animalBiome];Land;Desert;Arctic;Forest;Volcano];$includes[$get[currentBiome];Ocean]];
      
      $let[desc;## You chose to downgrade by surrendering to the deep ocean predators!]

    ;$if[$and[$includes[$get[animalBiome];Ocean];$includes[$get[currentBiome];Land;Volcano;Ocean;Forest;Arctic;Desert]];
      
      $let[desc;## You chose to downgrade by suffocating on land!]

    ;$if[$and[$includes[$get[animalBiome];Volcano];$includes[$get[currentBiome];Land;Ocean;Forest;Arctic;Desert]];
      
      $let[desc;## You chose to downgrade by running out of lava!]

    ;$if[$and[$includes[$get[animalBiome];Volcano];$includes[$get[currentBiome];Volcano]];
      
      $let[desc;## You chose to downgrade by $if[$env[playData;tier]<17;giving yourself to predator;giving everyone bites]!]

    ;$if[$and[$includes[$get[animalBiome];Land;Arctic;Forest];$includes[$get[currentBiome];Land;Arctic;Forest]];
      $let[desc;## You chose to downgrade by $randomText[giving yourself to predator;running out of water]!]
    ; 
      $let[desc;## ???]
    ]]]]]]

    $!jsonSet[playData;isDead;true]
    ${playSnippets.hasAllApex()}
    ${playSnippets.setNewXPOnDeath()}
    ${playSnippets.setNewTier()}

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]
      $addTextDisplay[$get[desc]]
      ${playSnippets.respawnButton()}
      $addSeparator
      ${playSnippets.exitButton(false)}
    ;$getGlobalVar[errorColor]]
    $interactionUpdate
    $setUserVar[userPlayData;$env[playData]]
  `
}