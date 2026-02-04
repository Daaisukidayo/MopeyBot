export default {
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu"],
  description: "search XP",
  code: `
    $arrayLoad[IID;-;$customID]
    $onlyIf[$arrayIncludes[IID;play_actions]]
    $onlyIf[$selectMenuValues==farmXP]
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[playData;$getUserVar[userPlayData]]
    $isPlaying

    $let[deathDesc;$advArrayRandomValue[$tl[ui.play.kill]]]
    
    $let[deathRoll;$random[1;1000]]
    $let[findPrayRarity;$random[1;100]]
    $let[findSoccerRarity;$random[1;100]]
    
    $let[deathChance;15]
    $let[findPrayChance;12]
    $let[findSoccerChance;10]

    $let[xp;0]

    $jsonLoad[expBase;$readFile[src/json/expBase.json]]
    $jsonLoad[expData;$readFile[src/json/expData.json]]
    $jsonLoad[pumpkins;$readFile[src/json/pumpkins.json]]
    $jsonLoad[beachballs;$readFile[src/json/beachballs.json]]
    $jsonLoad[umbrellas;$readFile[src/json/umbrellas.json]]

    $jsonLoad[xpPerTier;$getGlobalVar[xpPerTier]]
    $jsonLoad[biomeColors;$getGlobalVar[biomeColors]]
    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]
    $let[biome;$env[playData;currentBiome]]
    $let[animalID;$env[playData;currentAnimal]]
    $let[tier;$env[playData;tier]]
    $let[color;$env[biomeColors;$get[biome]]]

    $let[animalBiome;$getAnimalInfo[$get[animalID];biome]]

    $if[$getAnimalInfo[$get[animalID];isRare];
      $letSub[deathChance;4]
    ]
    $if[$getAnimalInfo[$get[animalID];canFly];
      $letSub[deathChance;4]
    ]

    $if[$get[animalBiome]!=$get[biome];
      $letSum[deathChance;80]
      $if[$get[biome]==5;$letSum[deathChance;700]]
      $if[$get[animalBiome]==2;
        $let[deathChance;1000]
        $let[deathDesc;$tl[ui.play.lackOfWater]]
      ]
    ]

    $switch[$get[tier];
      $case[15;$if[$get[animalID]==dragon;$let[deathChance;7]]]
      $case[16;$letSub[deathChance;10]]
      $case[17;$let[deathChance;1] $let[deathDesc;$tl[ui.play.diedByTeamers]]]
    ]

    $let[event;$function[
      $if[$get[findSoccerRarity]<=$get[findSoccerChance];
        $return[soccer]
      ]
      $return[food]
    ]]

    $addContainer[
      $addAuthorDisplay

      $if[$get[deathChance]>=$get[deathRoll];
        $updateXpOnDeath
        $setNewTier
        $removeAllApex

        $addTextDisplay[$get[deathDesc]]
        $addRespawnButton
        $let[color;$getGlobalVar[errorColor]]
      ;
        $if[$get[event]==soccer;
          $arrayLoad[data;_;pumpkin_$env[pumpkins;10;ID]]
          $let[soccer;$tl[data.pumpkins.$env[data;1]] $env[pumpkins;10;emoji]]
          $let[content;$tl[ui.play.found;$get[soccer]]]
          $addTextDisplay[$get[content]]
          $addSeparator[Large]

          $displayAnimalStats
          $addSoccerActionsMenu
        ;
          ${farmFood()}
          $!jsonSet[playData;XP;$math[$env[playData;XP] + $get[xp]]]
          $addTextDisplay[$get[content]]
          $addSeparator[Large]

          $displayAnimalStats
          $addActionsMenu
        ]
      ]

      $addSeparator
      $addExitButton
      $addCheats
    ;$get[color]]

    $interactionUpdate
    $updatePlayData
  `
}

function farmFood() {
  return `
    $let[multiplier;$env[expData;$get[tier];m]]

    $jsonLoad[data;$env[expData;$get[tier];d;$get[biome]]]
    $jsonLoad[foodIndexes;$env[data;f]]
    $jsonLoad[preyIndexes;$env[data;p]]

    $jsonLoad[foodBase;$env[expBase;f]]
    $jsonLoad[preyBase;$env[expBase;p]]

    $onlyIf[$arrayLength[foodIndexes]>0]

    $let[eatCount;$random[1;4]]

    $arrayCreate[eaten]

    $loop[$get[eatCount];
      $let[foodIndex;$arrayRandomValue[foodIndexes]]
      $jsonLoad[food;$env[foodBase;$get[foodIndex]]]

      $jsonLoad[xpRange;$env[food;XP]]
      $let[tmpXP;$random[$env[xpRange;0];$env[xpRange;1]]]
      $let[tmpXP;$round[$math[$get[tmpXP] * $get[multiplier]]]]

      $letSum[xp;$get[tmpXP]]

      $let[foodName;$env[food;name]]
      $arrayPush[eaten;$get[foodName]]
    ]

    $let[content;$tl[ui.play.ate;$arrayJoin[eaten;, ];$separate[$get[xp]]]]

    $if[$and[$random[1;100]<=10;$arrayLength[preyIndexes]>0];

      $let[preyID;$env[preyBase;$arrayRandomValue[preyIndexes];name]]
      $let[preyName;$getAnimalVariantInfo[$get[preyID];name]]
      $let[preyEmoji;$getAnimalVariantInfo[$get[preyID];emoji]]
      $let[preyTier;$getAnimalInfo[$get[preyID];tier]]

      $jsonLoad[xpArr;$env[xpPerTier;$get[preyTier]]]
      $let[xp;$random[$env[xpArr;0];$env[xpArr;1]]]

      $let[content;$tl[ui.play.ate;$get[preyName] $get[preyEmoji];$separate[$get[xp]]]]
      
    ]
  `
}

