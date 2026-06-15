export default {
  name: "play_actions",
  type: "interactionCreate",
  allowed: ['stringSelect'],
  code: `
    $arrayLoad[IID;-;$customID]
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[playData;$getUserVar[userPlayData]]
    $isPlaying

    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]
    $jsonLoad[biomeColors;$getGlobalVar[biomeColors]]
    $jsonLoad[xpPerTier;$getGlobalVar[xpPerTier]]
    
    $let[animalId;$env[playData;currentAnimal]]
    $let[animalBiome;$getAnimalInfo[$get[animalId];biome]]
    $let[currentBiome;$env[playData;currentBiome]]
    $let[color;$nullish[$env[biomeColors;$env[playData;currentBiome]];$getGlobalVar[defaultColor]]]

    $switch[$selectMenuValues;
      $case[downgrade;
        $jsonLoad[deathDesc;{
          "0": {
            "0": "$arrayRandomValue[$tl[$get[l];ui;play.downgrades.reasons]]",
            "1": "$tl[$get[l];ui;play.downgrades.intoLava]",
            "2": "$tl[$get[l];ui;play.downgrades.oceanPredators]",
            "3": "$arrayRandomValue[$tl[$get[l];ui;play.downgrades.reasons]]",
            "4": "$arrayRandomValue[$tl[$get[l];ui;play.downgrades.reasons]]",
            "5": "$tl[$get[l];ui;play.downgrades.intoLava]"
          },
          "1": {
            "0": "$arrayRandomValue[$tl[$get[l];ui;play.downgrades.reasons]]",
            "1": "$tl[$get[l];ui;play.downgrades.intoLava]",
            "2": "$tl[$get[l];ui;play.downgrades.oceanPredators]",
            "3": "$arrayRandomValue[$tl[$get[l];ui;play.downgrades.reasons]]",
            "4": "$arrayRandomValue[$tl[$get[l];ui;play.downgrades.reasons]]",
            "5": "$tl[$get[l];ui;play.downgrades.intoLava]"
          },
          "2": {
            "0": "$tl[$get[l];ui;play.downgrades.onLand]",
            "1": "$tl[$get[l];ui;play.downgrades.intoLava]",
            "2": "$tl[$get[l];ui;play.downgrades.onLand]",
            "3": "$tl[$get[l];ui;play.downgrades.onLand]",
            "4": "$tl[$get[l];ui;play.downgrades.onLand]",
            "5": "$tl[$get[l];ui;play.downgrades.intoLava]"
          },
          "3": {
            "0": "$arrayRandomValue[$tl[$get[l];ui;play.downgrades.reasons]]",
            "1": "$tl[$get[l];ui;play.downgrades.intoLava]",
            "2": "$tl[$get[l];ui;play.downgrades.oceanPredators]",
            "3": "$arrayRandomValue[$tl[$get[l];ui;play.downgrades.reasons]]",
            "4": "$arrayRandomValue[$tl[$get[l];ui;play.downgrades.reasons]]",
            "5": "$tl[$get[l];ui;play.downgrades.intoLava]"
          },
          "4": {
            "0": "$arrayRandomValue[$tl[$get[l];ui;play.downgrades.reasons]]",
            "1": "$tl[$get[l];ui;play.downgrades.intoLava]",
            "2": "$tl[$get[l];ui;play.downgrades.oceanPredators]",
            "3": "$arrayRandomValue[$tl[$get[l];ui;play.downgrades.reasons]]",
            "4": "$arrayRandomValue[$tl[$get[l];ui;play.downgrades.reasons]]",
            "5": "$tl[$get[l];ui;play.downgrades.intoLava]"
          },
          "5": {
            "0": "$tl[$get[l];ui;play.downgrades.outOfLava]",
            "1": "$tl[$get[l];ui;play.downgrades.outOfLava]",
            "2": "$tl[$get[l];ui;play.downgrades.oceanPredators]",
            "3": "$tl[$get[l];ui;play.downgrades.outOfLava]",
            "4": "$tl[$get[l];ui;play.downgrades.outOfLava]",
            "5": "$if[$env[playData;tier]<17;$tl[$get[l];ui;play.downgrades.reasons.0];$arrayRandomValue[$tl[$get[l];ui;play.downgrades.blackDragon]]]"
          }
        }]
        $c[
          $let[desc;$function[
            $if[$and[$includes[$get[animalBiome];0;1;2;3;4];$includes[$get[currentBiome];1;5]];
              
              $return[$tl[$get[l];ui;play.downgrades.intoLava]]

            ;$if[$and[$includes[$get[animalBiome];0;1;3;4;5];$includes[$get[currentBiome];2]];
              
              $return[$tl[$get[l];ui;play.downgrades.oceanPredators]]

            ;$if[$includes[$get[animalBiome];2];
              
              $return[$tl[$get[l];ui;play.downgrades.onLand]]

            ;$if[$and[$includes[$get[animalBiome];5];$includes[$get[currentBiome];0;1;2;3;4]];
              
              $return[$tl[$get[l];ui;play.downgrades.outOfLava]]

            ;$if[$and[$includes[$get[animalBiome];5];$includes[$get[currentBiome];5]];
              
              $return[$if[$env[playData;tier]<17;$tl[$get[l];ui;play.downgrades.reasons.0];$arrayRandomValue[$tl[$get[l];ui;play.downgrades.blackDragon]]]!]

            ;$if[$and[$includes[$get[animalBiome];0;3;4];$includes[$get[currentBiome];0;3;4]];

              $return[$arrayRandomValue[$tl[$get[l];ui;play.downgrades.reasons]]]

            ]]]]]]
          ]]
        ]

        $let[desc;$env[deathDesc;$get[animalBiome];$get[currentBiome]]]

        $!jsonSet[playData;isDead;true]
        $updateXpOnDeath
        $setNewTier

        $addContainer[
          $addAuthorDisplay
          $addTextDisplay[$tl[$get[l];ui;play.downgrades.downgradeBy;$get[desc]]]
          $addActionsMenu
          $addSeparator
          $addExitButton
        ;$getGlobalVar[errorColor]]
      ]

      $case[farmXP;
        $jsonLoad[expBase;$readFile[res/data/expBase.json]]
        $jsonLoad[expData;$readFile[res/data/expData.json]]
        $jsonLoad[pumpkins;$readFile[res/data/pumpkins.json]]
        $jsonLoad[beachballs;$readFile[res/data/beachballs.json]]
        $jsonLoad[umbrellas;$readFile[res/data/umbrellas.json]]

        $let[deathDesc;$arrayRandomValue[$tl[$get[l];ui;play.kill]]]
        $let[deathRoll;$random[1;1000]]
        $let[findPrayRarity;$random[1;100]]
        $let[findSoccerRarity;$random[1;100]]
        $let[deathChance;15]
        $let[findPrayChance;12]
        $let[findSoccerChance;10]
        $let[xp;0]
        $let[tier;$env[playData;tier]]

        $if[$getAnimalInfo[$get[animalId];isRare];
          $letSub[deathChance;4]
        ]
        $if[$getAnimalInfo[$get[animalId];canFly];
          $letSub[deathChance;4]
        ]

        $if[$get[animalBiome]!=$get[currentBiome];
          $letSum[deathChance;80]
          $if[$get[currentBiome]==5;$letSum[deathChance;700]]
          $if[$get[animalBiome]==2;
            $let[deathChance;1000]
            $let[deathDesc;$tl[$get[l];ui;play.lackOfWater]]
          ]
        ]

        $switch[$get[tier];
          $case[15;$if[$get[animalId]==dragon;$let[deathChance;7]]]
          $case[16;$letSub[deathChance;10]]
          $case[17;$let[deathChance;1] $let[deathDesc;$tl[$get[l];ui;play.diedByTeamers]]]
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
            $!jsonSet[playData;isDead;true]
            $updateXpOnDeath
            $setNewTier
            $removeAllApex

            $addTextDisplay[$get[deathDesc]]
            $addActionsMenu
            $let[color;$getGlobalVar[errorColor]]
          ;
            $if[$get[event]==soccer;

              $arrayLoad[data;_;pumpkin_$env[pumpkins;10;ID]]
              $let[soccer;$tl[$get[l];data;pumpkins.$env[data;1]] $env[pumpkins;10;emoji]]
              $let[content;$tl[$get[l];ui;play.found;$get[soccer]]]
              $addTextDisplay[$get[content]]
              $addSeparator[Large]

              $displayAnimalStats
              $addSoccerActionsMenu

            ;

              $let[multiplier;$env[expData;$get[tier];m]]

              $jsonLoad[data;$env[expData;$get[tier];d;$get[currentBiome]]]
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

              $let[content;$tl[$get[l];ui;play.ate;$arrayJoin[eaten;, ];$separate[$get[xp]]]]

              $if[$and[$random[1;100]<=10;$arrayLength[preyIndexes]>0];

                $let[preyID;$env[preyBase;$arrayRandomValue[preyIndexes];name]]
                $let[preyName;$getAnimalVariantInfo[$get[preyID];name]]
                $let[preyEmoji;$getAnimalVariantInfo[$get[preyID];emoji]]
                $let[preyTier;$getAnimalInfo[$get[preyID];tier]]

                $jsonLoad[xpArr;$env[xpPerTier;$get[preyTier]]]
                $let[xp;$random[$env[xpArr;0];$env[xpArr;1]]]

                $let[content;$tl[$get[l];ui;play.ate;$get[preyName] $get[preyEmoji];$separate[$get[xp]]]]
                
              ]

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
      ]

      $case[arena;
        $let[arenaR;$random[1;100]]
        $let[arenaApexAcceptR;$random[1;100]]
        $let[KDacceptR;$random[1;100]]
        $let[KDacceptC;25]
        $let[aquaAcceptR;$random[1;100]]
        $let[aquaAcceptC;10]
        $let[tier17C;15]
        $let[tier16C;25]
        $let[acceptArenaC;50]

        $let[currentBiome;$env[playData;currentBiome]]

        $if[$get[arenaR]<=$get[acceptArenaC];

          $if[$get[arenaApexAcceptR]<=$get[tier17C];

            $let[paths;$if[$get[KDacceptR]<=$get[KDacceptC];kingDragon;blackDragon]]
            $let[opponentTier;17]

          ;$if[$get[arenaApexAcceptR]<=$get[tier16C];

            $let[paths;$function[
              $return[$switch[$get[currentBiome];
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
              $return[$switch[$get[currentBiome];
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

          $arrayMap[paths;animalId;
            $arrayLoad[oppArr;--;$arrayRandomIndex[$getAnimalInfo[$env[animalId];variants]]--$env[animalId]]
            $return[$env[oppArr]]
          ;oppData]

          $jsonLoad[oppArr;$arrayRandomValue[oppData]]
          $let[oppWrI;$env[oppArr;0]]
          $let[oppID;$env[oppArr;1]]
          $let[oppDisplay;$getAnimalVariantInfo[$get[oppID];name;$get[oppWrI]]]
          $let[desc;$tl[$get[l];ui;play.arena.wentInArena;$get[oppDisplay]]]
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
          $let[desc;$arrayRandomValue[$tl[$get[l];ui;play.arena.reject]]]
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
      ]

      $case[upgrade;
        $setNewTier
        $c[
          $if[$env[playData;tier]>17;
            $!jsonSet[playData;tier;1]
          ]
        ]

        $addContainer[
          $addAuthorDisplay

          $addTextDisplay[$tl[$get[l];ui;play.chooseUpgrade]]
          $addUpgradeMenu
          $addSeparator[Large]

          $addExitButton
          $addCheats
        ;$get[color]]
      ]

      $case[respawn;
        $addContainer[
          $addAuthorDisplay

          $addTextDisplay[$tl[$get[l];ui;play.chooseAnimal]]

          $addUpgradeMenu

          $addSeparator[Large]

          $addExitButton
          $addCheats
        ;$get[color]]
      ]
    ]

    $interactionUpdate
    $updatePlayData
  `
}