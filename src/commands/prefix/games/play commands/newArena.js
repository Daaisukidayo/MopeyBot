export default {
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu'],
  description: 'first time arena',
  code: `
    $arrayLoad[IID;-;$customID]
    $onlyIf[$arrayIncludes[IID;play_actions]]
    $onlyIf[$selectMenuValues==arena]
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[playData;$getUserVar[userPlayData]]
    $isPlaying

    $jsonLoad[biomeColors;$getGlobalVar[biomeColors]]
    $jsonLoad[xpPerTier;$getGlobalVar[xpPerTier]]

    $let[arenaR;$random[1;100]]
    $let[arenaApexAcceptR;$random[1;100]]
    $let[KDacceptR;$random[1;100]]
    $let[KDacceptC;25]
    $let[aquaAcceptR;$random[1;100]]
    $let[aquaAcceptC;10]
    $let[tier17C;15]
    $let[tier16C;25]
    $let[acceptArenaC;50]

    $let[biome;$env[playData;currentBiome]]
    $let[color;$env[biomeColors;$get[biome]]]

    $if[$get[arenaR]<=$get[acceptArenaC];

      $if[$get[arenaApexAcceptR]<=$get[tier17C];

        $let[paths;$if[$get[KDacceptR]<=$get[KDacceptC];kingDragon;blackDragon]]
        $let[opponentTier;17]

      ;$if[$get[arenaApexAcceptR]<=$get[tier16C];

        $let[paths;$function[
          $return[$switch[$get[biome];
            $case[0;dinoMonster]
            $case[1;giantScorpion]
            $case[2;seaMonster]
            $case[3;iceMonster]
            $case[4;dinoMonster]
            $case[5;landMonster]
          ]]
        ]]
        $let[opponentTier;16]

      ;

        $let[paths;$function[
          $return[$switch[$get[biome];
            $case[0;dragon,trex]
            $case[1;pterodactyl]
            $case[2;kraken,kingCrab]
            $case[3;$if[$get[aquaAcceptR]<=$get[aquaAcceptC];aquaYeti;yeti]]
            $case[4;dragon,trex]
            $case[5;phoenix]
          ]]
        ]]
        $let[opponentTier;15]

      ]]

      $arrayLoad[paths;,;$get[paths]]

      $arrayMap[paths;animalID;
        $jsonLoad[vars;$getAnimalInfo[$env[animalID];variants]]

        $arrayLoad[oppArr;--;$arrayRandomIndex[vars]--$env[animalID]]
        $return[$env[oppArr]]
      ;oppData]

      $jsonLoad[oppArr;$arrayRandomValue[oppData]]
      $let[oppWrI;$env[oppArr;0]]
      $let[oppID;$env[oppArr;1]]
      $let[oppDisplay;$getAnimalVariantInfo[$get[oppID];name;$get[oppWrI]]]
      $let[desc;$tl[ui.play.arena.wentInArena;$get[oppDisplay]]]
      $let[thumbnail;$getAnimalVariantInfo[$get[oppID];img;$get[oppWrI]]]

      $let[min;$env[xpPerTier;$get[opponentTier];0]]
      $let[max;$env[xpPerTier;$get[opponentTier];1]]
      $let[opponentXP;$random[$get[min];$get[max]]]

      $!jsonSet[playData;arena;opponentAnimal;$get[oppID]]
      $!jsonSet[playData;arena;opponentWardrobe;$get[oppWrI]]
      $!jsonSet[playData;arena;opponentTier;$get[opponentTier]]
      $!jsonSet[playData;arena;opponentXP;$get[opponentXP]]

      $let[success;true]
      $let[color;$getGlobalVar[defaultColor]]

    ;
      $let[desc;$advArrayRandomValue[$tl[ui.play.arena.reject]]]
      $let[success;false]
    ]

    $addContainer[
      $addAuthorDisplay

      $if[$get[success];
        $addSection[
          $addThumbnail[$get[thumbnail]]
          $addTextDisplay[$get[desc]]
        ]

        $addArenaActionButtons
      ;
        $addTextDisplay[$get[desc]]
        $addSeparator[Large]
        $displayAnimalStats
        $addActionsMenu
      ]
      $addSeparator
      $addExitButton
      $addCheats
    ;$get[color]]

    $interactionUpdate
    $updatePlayData
  `
}