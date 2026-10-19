"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edge_1 = require("@quoriel/edge");
exports.default = new edge_1.Command({
    name: "play_actions",
    type: "interactionCreate",
    allowed: ["stringSelect"],
    code: `
    $arrayLoad[IID;-;$customID]
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[playData;$getPlayData]
    $isPlaying[playData]

    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]

    $let[animalId;$jsonGet[playData;animal_id]]
    $let[animalBiome;$getAnimalInfo[$get[animalId];biome]]
    $let[currentBiome;$jsonGet[playData;biome]]
    $let[color;$getBiomeColor[playData]]

    $switch[$selectMenuValues;
      $case[downgrade;
        $c[The downgrade reason depends on the animal's biome and the current biome (see downgradeReasons)]
        $let[reason;$jsonGet[$getGlobalVar[downgradeReasons];$get[animalBiome];$get[currentBiome]]]
        $let[desc;$switch[$get[reason];
          $case[reasons;$arraySample[$tl[ui.play.downgrades.reasons.$get[l]]]]
          $case[blackDragon;$if[$jsonGet[playData;tier]<17;$tl[ui.play.downgrades.reasons.$get[l].0];$arraySample[$tl[ui.play.downgrades.blackDragon.$get[l]]]]]
          $case[default;$tl[ui.play.downgrades.$get[reason].$get[l]]]
        ]]

        $callMethod[playData;die]

        $addContainer[
          $addAuthorDisplay
          $addTextDisplay[$tl[ui.play.downgrades.downgradeBy.$get[l];$get[desc]]]
          $addActionsMenu[playData]
          $addSeparator
          $addExitButton[playData]
        ;$getGlobalVar[errorColor]]
      ]

      $case[farmXP;
        $jsonLoad[expBase;$readFile[res/data/expBase.json]]
        $jsonLoad[expData;$readFile[res/data/expData.json]]

        $c[Find chances are in percent, death chances are in per-mille (see play.json)]
        $jsonLoad[farmChances;$getGlobalVar[farmChances]]
        $jsonLoad[deathChances;$getGlobalVar[farmDeathChances]]

        $let[deathDesc;$arraySample[$tl[ui.play.kill.$get[l]]]]
        $let[deathRoll;$random[1;1000]]
        $let[preyRoll;$random[1;100]]
        $let[findSoccerRarity;$random[1;100]]
        $let[deathChance;$jsonGet[deathChances;base]]
        $let[findPreyChance;$jsonGet[farmChances;prey]]
        $let[findSoccerChance;$jsonGet[farmChances;soccer]]
        $let[xp;0]
        $let[tier;$jsonGet[playData;tier]]

        $if[$getAnimalInfo[$get[animalId];isRare];
          $letSub[deathChance;$jsonGet[deathChances;rareReduction]]
        ]
        $if[$getAnimalInfo[$get[animalId];canFly];
          $letSub[deathChance;$jsonGet[deathChances;flyerReduction]]
        ]

        $if[$get[animalBiome]!=$get[currentBiome];
          $letSum[deathChance;$jsonGet[deathChances;foreignBiomeBonus]]
          $if[$get[currentBiome]==5;$letSum[deathChance;$jsonGet[deathChances;lavaBonus]]]
          $if[$get[animalBiome]==2;
            $let[deathChance;$jsonGet[deathChances;oceanAnimalOnLand]]
            $let[deathDesc;$tl[ui.play.lackOfWater.$get[l]]]
          ]
        ]

        $c[Tier rules: dragonTier15 and tier17 replace the chance, tier16Reduction lowers it]
        $switch[$get[tier];
          $case[15;$if[$get[animalId]==dragon;$let[deathChance;$jsonGet[deathChances;dragonTier15]]]]
          $case[16;$letSub[deathChance;$jsonGet[deathChances;tier16Reduction]]]
          $case[17;$let[deathChance;$jsonGet[deathChances;tier17]] $let[deathDesc;$tl[ui.play.diedByTeamers.$get[l]]]]
        ]

        $let[event;$if[$get[findSoccerRarity]<=$get[findSoccerChance];soccer;food]]

        $c[Dev overrides: a forced event is used once and beats immortality]
        $let[forcedEvent;$jsonGet[playData;dev;forcedEvent]]
        $if[$get[forcedEvent]!=;
          $!jsonSet[playData;dev;forcedEvent;null]
          $let[deathChance;0]

          $switch[$get[forcedEvent];
            $case[death;$let[deathChance;1000]]
            $case[soccer;$let[event;soccer]]
            $case[food;$let[event;food] $let[preyRoll;101]]
            $case[prey;$let[event;food] $let[preyRoll;1]]
          ]
        ;$if[$jsonGet[playData;dev;immortal]==true;
          $let[deathChance;0]
        ]]

        $addContainer[
          $addAuthorDisplay

          $if[$get[deathChance]>=$get[deathRoll];
            $callMethod[playData;die]
            $callMethod[playData;removeAllApex]

            $addTextDisplay[$get[deathDesc]]
            $addActionsMenu[playData]
            $let[color;$getGlobalVar[errorColor]]
          ;
            $if[$get[event]==soccer;
              $jsonLoad[biomeSoccers;$jsonGet[$getGlobalVar[soccerInBiome];$get[currentBiome]]]
              $let[spottedSoccer;$arraySample[biomeSoccers]]

              $c[An item is picked by its chance in percent]
              $jsonLoad[soccerItem;$arrayWeightedRandom[$jsonGet[$readFile[res/data/playSoccers.json];$get[spottedSoccer]];chance]]

              $addFoundSoccer[playData;userWardrobe;$get[spottedSoccer];$jsonGet[soccerItem;ID]]
            ;

              $let[multiplier;$jsonGet[expData;$get[tier];m]]

              $jsonLoad[data;$jsonGet[expData;$get[tier];d;$get[currentBiome]]]
              $jsonLoad[foodIndexes;$jsonGet[data;f]]
              $jsonLoad[preyIndexes;$jsonGet[data;p]]

              $jsonLoad[foodBase;$jsonGet[expBase;f]]
              $jsonLoad[preyBase;$jsonGet[expBase;p]]

              $onlyIf[$jsonSize[foodIndexes]>0]

              $c[1 to 4 random foods, the same food can repeat]
              $arrayMap[$arrayRange[1;$random[1;4]];n;
                $jsonLoad[food;$jsonGet[foodBase;$arraySample[foodIndexes]]]
                $letSum[xp;$round[$math[$random[$jsonGet[food;XP;0];$jsonGet[food;XP;1]] * $get[multiplier]]]]
                $return[$jsonGet[food;name]]
              ;eaten]

              $let[content;$tl[ui.play.ate.$get[l];$arrayJoin[eaten;, ];$separate[$get[xp]]]]

              $if[$and[$get[preyRoll]<=$get[findPreyChance];$jsonSize[preyIndexes]>0];

                $let[preyID;$jsonGet[preyBase;$arraySample[preyIndexes];name]]
                $let[preyName;$getAnimalInfo[$get[preyID];name;0]]
                $let[preyEmoji;$getAnimalInfo[$get[preyID];emoji;0]]
                $let[preyTier;$getAnimalInfo[$get[preyID];tier]]

                $jsonLoad[xpArr;$jsonGet[$getGlobalVar[xpPerTier];$get[preyTier]]]
                $let[xp;$random[$jsonGet[xpArr;0];$jsonGet[xpArr;1]]]

                $let[content;$tl[ui.play.ate.$get[l];$get[preyName] $get[preyEmoji];$separate[$get[xp]]]]
                
              ]

              $callMethod[playData;addXp;$get[xp]]
              $addTextDisplay[$get[content]]
              $addSeparator[Large]

              $displayAnimalStats[playData;userWardrobe]
              $addActionsMenu[playData]
            ]
          ]

          $addSeparator
          $addExitButton[playData]
          $addCheats[playData]
        ;$get[color]]
      ]

      $case[arena;
        $c[All chances are in percent (see play.json)]
        $jsonLoad[arenaChances;$getGlobalVar[arenaChances]]
        $jsonLoad[rareOpponents;$getGlobalVar[arenaRareOpponents]]

        $if[$random[1;100]<=$jsonGet[arenaChances;accept];

          $c[Opponent tier: 17 and 16 have their own chances, the rest is 15]
          $let[tierR;$random[1;100]]
          $let[opponentTier;$if[$get[tierR]<=$jsonGet[arenaChances;tier17];17;$if[$get[tierR]<=$math[$jsonGet[arenaChances;tier17] + $jsonGet[arenaChances;tier16]];16;15]]]

          $jsonLoad[paths;$jsonGet[$getGlobalVar[arenaOpponents];$get[opponentTier];$get[currentBiome]]]
          $let[oppID;$arraySample[paths]]

          $c[Some opponents can be replaced with their rare animal]
          $if[$jsonGet[rareOpponents;$get[oppID]]!=;
            $if[$random[1;100]<=$jsonGet[rareOpponents;$get[oppID];chance];
              $let[oppID;$jsonGet[rareOpponents;$get[oppID];id]]
            ]
          ]

          $let[success;true]
          $let[color;$getGlobalVar[defaultColor]]

        ;
          $let[desc;$arraySample[$tl[ui.play.arena.reject.$get[l]]]]
          $let[success;false]
        ]

        $addContainer[
          $addAuthorDisplay

          $if[$get[success];
            $addArenaOpponent[playData;$get[oppID];$get[opponentTier]]
          ;
            $addTextDisplay[$get[desc]]
            $addSeparator[Large]
            $displayAnimalStats[playData;userWardrobe]
            $addActionsMenu[playData]
          ]
          $addSeparator
          $addExitButton[playData]
          $addCheats[playData]
        ;$get[color]]
      ]

      $case[upgrade;
        $callMethod[playData;updateTier]

        $addContainer[
          $addAuthorDisplay

          $addTextDisplay[$tl[ui.play.chooseUpgrade.$get[l]]]
          $addUpgradeMenu[playData;userWardrobe]
          $addSeparator[Large]

          $addExitButton[playData]
          $addCheats[playData]
        ;$get[color]]
      ]

      $case[kingDragonUpg;
        $let[animalId;king_dragon]
        $let[trig;play_upgradeAnimal-$get[animalId]-$authorID]
        $let[wrI;$nullish[$jsonGet[userWardrobe;$get[animalId]];0]]
        $let[name;$getAnimalInfo[$get[animalId];name;$get[wrI]]]
        $let[emoji;$getAnimalInfo[$get[animalId];emoji;$get[wrI]]]

        $addContainer[
          $addAuthorDisplay
          
          $addTextDisplay[$tl[ui.play.chooseUpgrade.$get[l]]]

          $addActionRow
          $addButton[$get[trig];$get[name];Secondary;$get[emoji]]
          $addSeparator[Large]

          $addExitButton[playData]
          $addCheats[playData]
        ;$get[color]]
      ]

      $case[showApex;
        $c[The message is sent again with its own components so the menu lets go of the choice. No attachments are sent, so the pictures stay: a Forge update always replaces them. The apexes come in a message only the player sees]
        $!djsEval[ctx.interaction.update({ components: ctx.interaction.message.components })]

        $jsonLoad[apexData;$getCurrentApexData[playData]]
        $addContainer[
          $addAuthorDisplay
          $addTextDisplay[$jsonGet[apexData;content]]
        ;$get[color]]
        $ephemeral
        $interactionFollowUp
        $stop
      ]

      $case[respawn;
        $addContainer[
          $addAuthorDisplay

          $addTextDisplay[$tl[ui.play.chooseAnimal.$get[l]]]

          $addUpgradeMenu[playData;userWardrobe]

          $addSeparator[Large]

          $addExitButton[playData]
          $addCheats[playData]
        ;$get[color]]
      ]
    ]

    $updatePlayData[playData]
    $interactionUpdate
  `,
});
//# sourceMappingURL=actions.js.map