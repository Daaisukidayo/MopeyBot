export default {
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu'],
  description: 'downgrading',
  code: `
    $arrayLoad[IID;-;$customID]
    $onlyIf[$arrayIncludes[IID;play_actions]]
    $onlyIf[$selectMenuValues==downgrade]

    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[playData;$getUserVar[userPlayData]]
    $isPlaying

    $jsonLoad[biomeColors;$getGlobalVar[biomeColors]]

    $let[currentBiome;$env[playData;currentBiome]]
    $let[animalBiome;$getAnimalInfo[$env[playData;currentAnimal];biome]]

    $let[desc;$function[
      $if[$and[$includes[$get[animalBiome];0;1;2;3;4];$includes[$get[currentBiome];1;5]];
        
        $return[$tl[ui.play.downgrades.intoLava]]

      ;$if[$and[$includes[$get[animalBiome];0;1;3;4;5];$includes[$get[currentBiome];2]];
        
        $return[$tl[ui.play.downgrades.oceanPredators]]

      ;$if[$includes[$get[animalBiome];2];
        
        $return[$tl[ui.play.downgrades.onLand]]

      ;$if[$and[$includes[$get[animalBiome];5];$includes[$get[currentBiome];0;1;2;3;4]];
        
        $return[$tl[ui.play.downgrades.outOfLava]]

      ;$if[$and[$includes[$get[animalBiome];5];$includes[$get[currentBiome];5]];
        
        $return[$if[$env[playData;tier]<17;$tl[ui.play.downgrades.reasons.0];$advArrayRandomValue[$tl[ui.play.downgrades.blackDragon]]]!]

      ;$if[$and[$includes[$get[animalBiome];0;3;4];$includes[$get[currentBiome];0;3;4]];

        $return[$advArrayRandomValue[$tl[ui.play.downgrades.reasons]]]

      ]]]]]]
    ]]

    $!jsonSet[playData;isDead;true]
    $updateXpOnDeath
    $setNewTier

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.play.downgrades.downgradeBy;$get[desc]]]
      $addRespawnButton
      $addSeparator
      $addExitButton
    ;$getGlobalVar[errorColor]]
    $interactionUpdate
    $updatePlayData
  `
}