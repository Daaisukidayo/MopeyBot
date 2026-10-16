import { Command } from "@quoriel/edge"

export default new Command({
  name: "play_devActions",
  type: "interactionCreate",
  allowed: ["stringSelect", "modal"],
  code: `
    $arrayLoad[IID;-;$customID]
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[playData;$getUserVar[userPlayData]]
    $isPlaying[playData]

    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]
    $jsonLoad[xpPerTier;$getGlobalVar[xpPerTier]]

    $getCache[animals;tierAnimals;tierAnimals]

    $c[Main menu: play_devActions-authorID | Sub menus: play_devActions-step-authorID or play_devActions-step-arg-authorID]
    $let[step;$if[$jsonSize[IID]==2;main;$jsonGet[IID;1]]]
    $let[arg;$if[$jsonSize[IID]==4;$jsonGet[IID;2]]]
    $let[value;$selectMenuValues]
    $if[$get[value]==back;$let[step;back]]

    $c[view: 'stats' shows desc + animal stats + actions menu, 'custom' shows desc + whatever the local function 'extra' adds]
    $let[view;stats]

    $switch[$get[step];
      $case[main;
        $switch[$get[value];
          $case[spawnSoccer;
            $let[view;custom]
            $let[desc;Choose a soccer type]
            $fn[extra;
              $addActionRow
              $addStringSelectMenu[play_devActions-soccerType-$authorID;Soccer type]
              $arrayForEach[$getGlobalVar[soccerTypes];soccerType;
                $addOption[$tl[data.playSoccers.$env[soccerType].0.$get[l]];;$env[soccerType];$jsonGet[$getPlaySoccer[$env[soccerType];0];emoji]]
              ]
              $addOption[Back;;back;⬅️]
            ]
          ]

          $case[forceSoccer;
            $let[view;custom]
            $let[desc;Force the next Hold/Goal outcome (current: $default[$jsonGet[playData;devForcedSoccer];none])]
            $fn[extra;
              $addActionRow
              $addStringSelectMenu[play_devActions-forceSoccer-$authorID;Soccer outcome]
              $addOption[Stolen;Hold and Goal;stolen;🥷]
              $addOption[Vanished;Hold only;vanished;💨]
              $addOption[Goal failed;Goal only;failed;❌]
              $addOption[Success;Hold and Goal;success;✅]
              $addOption[Clear;;clear;🧹]
              $addOption[Back;;back;⬅️]
            ]
          ]

          $case[forceEvent;
            $let[view;custom]
            $let[desc;Force the next farm event (current: $default[$jsonGet[playData;devForcedEvent];none])]
            $fn[extra;
              $addActionRow
              $addStringSelectMenu[play_devActions-forceEvent-$authorID;Farm event]
              $addOption[Food;;food;🍖]
              $addOption[Prey;Falls back to food if there is no prey;prey;🐾]
              $addOption[Soccer;;soccer;⚽]
              $addOption[Death;;death;💀]
              $addOption[Clear;;clear;🧹]
              $addOption[Back;;back;⬅️]
            ]
          ]

          $case[toggleImmortal;
            $jsonToggle[playData;devImmortal]
            $let[desc;Immortality: $if[$jsonGet[playData;devImmortal];on;off]]
          ]

          $case[fillXP;
            $!jsonSet[playData;XP;$jsonGet[xpPerTier;$jsonGet[playData;tier];1]]
            $let[desc;XP filled up to the tier maximum]
          ]

          $case[giveMC;
            $let[view;custom]
            $let[desc;Choose the amount of coins]
            $fn[extra;
              $addActionRow
              $addStringSelectMenu[play_devActions-giveMC-$authorID;Coins]
              $arrayForEach[$arrayOf[10000;100000;1000000];amount;
                $addOption[$separate[$env[amount]];;$env[amount];$getGlobalVar[mopecoin]]
              ]
              $addOption[Back;;back;⬅️]
            ]
          ]

          $case[teleport;
            $let[view;custom]
            $let[desc;Choose a biome]
            $fn[extra;
              $jsonLoad[biomeEmojis;$arrayOf[⛰️;🏜️;🌊;❄️;🌲;🌋]]
              $addActionRow
              $addStringSelectMenu[play_devActions-teleport-$authorID;Biome]
              $arrayForEach[$getGlobalVar[biomes];biome;
                $addOption[$tl[data.biomes.$env[biome].$get[l]];;$env[biome];$jsonGet[biomeEmojis;$env[biome]]]
              ]
              $addOption[Back;;back;⬅️]
            ]
          ]

          $case[summonAnimal;
            $c[The animal and skin are typed in a modal (comes back as the summonAnimal step)]
            $modal[play_devActions-summonAnimal-$authorID;Summon animal]
            $addTextInput[animal;Animal or rare: its name or ID;Short;true;White Lion]
            $addTextInput[skin;Skin ID (optional);Short;false;white_lion.s2.0]
            $showModal
            $stop
          ]

          $case[arena;
            $let[view;custom]
            $let[desc;Choose the opponent's tier]
            $fn[extra;
              $addActionRow
              $addStringSelectMenu[play_devActions-arenaTier-$authorID;Opponent tier]
              $arrayForEach[$jsonKeys[tierAnimals];tier;
                $addOption[Tier $env[tier];;$env[tier]]
              ]
              $addOption[Back;;back;⬅️]
            ]
          ]

          $case[getAllApex;
            $!jsonSet[playData;apex;$getGlobalVar[allApex]]
            $let[desc;All apexes added]
          ]

          $case[removeAllApex;
            $removeAllApex[playData]
            $let[desc;All apexes removed]
          ]

          $case[showPlayData;
            $let[sendPlayData;true]
            $let[desc;Play data sent as an ephemeral file]
          ]
        ]
      ]

      $case[soccerType;
        $let[view;custom]
        $let[desc;Choose a soccer]
        $fn[extra;
          $addActionRow
          $addStringSelectMenu[play_devActions-spawnSoccer-$get[value]-$authorID;Soccer]
          $arrayForEach[$jsonGet[$readFile[res/data/playSoccers.json];$get[value]];item;
            $addOption[$tl[data.playSoccers.$get[value].$jsonGet[item;ID].$get[l]];ID $jsonGet[item;ID] • $jsonGet[item;chance]%;$jsonGet[item;ID];$jsonGet[item;emoji]]
          ]
          $addOption[Back;;back;⬅️]
        ]
      ]

      $case[spawnSoccer;
        $let[view;custom]
        $fn[extra;
          $addFoundSoccer[playData;userWardrobe;$get[arg];$get[value]]
        ]
      ]

      $case[forceSoccer;
        $if[$get[value]==clear;
          $!jsonDelete[playData;devForcedSoccer]
          $let[desc;Forced soccer outcome cleared]
        ;
          $!jsonSet[playData;devForcedSoccer;$get[value]]
          $let[desc;Next Hold/Goal outcome: $get[value]]
        ]
      ]

      $case[forceEvent;
        $if[$get[value]==clear;
          $!jsonDelete[playData;devForcedEvent]
          $let[desc;Forced farm event cleared]
        ;
          $!jsonSet[playData;devForcedEvent;$get[value]]
          $let[desc;Next farm event: $get[value]]
        ]
      ]

      $case[giveMC;
        $sumPlayCash[playData;$get[value]]
        $let[desc;Added $separate[$get[value]] coins]
      ]

      $case[teleport;
        $!jsonSet[playData;currentBiome;$get[value]]
        $let[desc;Teleported to $tl[data.biomes.$get[value].$get[l]]]
      ]

      $case[summonAnimal;
        $let[animalId;$findAnimalId[$input[animal]]]
        $onlyIf[$get[animalId]!=;$newError[Animal not found: $input[animal]]]

        $c[A given skin must belong to the animal, and gets equipped]
        $let[skin;$input[skin]]
        $if[$get[skin]!=;
          $onlyIf[$getAnimalInfo[$get[animalId];id;$get[skin]]==$get[skin];$newError[$getAnimalInfo[$get[animalId];fullName] has no skin $get[skin]]]
          $!jsonSet[userWardrobe;$get[animalId];$get[skin]]
          $setUserVar[userWardrobe;$env[userWardrobe]]
        ]

        $c[Become the animal: its biome, and the tier's lowest XP if the tier changes]
        $let[tier;$getAnimalInfo[$get[animalId];tier]]
        $if[$get[tier]!=$jsonGet[playData;tier];
          $!jsonSet[playData;tier;$get[tier]]
          $!jsonSet[playData;XP;$jsonGet[xpPerTier;$get[tier];0]]
          $resetArenaData[playData]
        ]
        $!jsonDelete[playData;heldSoccer]
        $objectMerge[playData;$objectOf[currentAnimal;$get[animalId];currentBiome;$getAnimalInfo[$get[animalId];biome];isDead;false]]
        $let[desc;Summoned $getAnimalInfo[$get[animalId];name;$default[$jsonGet[userWardrobe;$get[animalId]];0]]]
      ]

      $case[arenaTier;
        $let[view;custom]
        $let[desc;Choose a tier $get[value] opponent]
        $fn[extra;
          $addActionRow
          $addStringSelectMenu[play_devActions-arena-$get[value]-$authorID;Opponent]
          $arrayForEach[$jsonGet[tierAnimals;$get[value];allAnimals];oppId;
            $addOption[$getAnimalInfo[$env[oppId];name;0];;$env[oppId];$getAnimalInfo[$env[oppId];emoji;0]]
          ]
          $addOption[Back;;back;⬅️]
        ]
      ]

      $case[arenaBites;
        $!jsonSet[playData;arena;bites;$get[value]]
        $let[desc;My bites set to $get[value]]
        $let[view;custom]
        $fn[extra;
          $addArenaStatus[playData;userWardrobe]
          $addSeparator
          $addArenaActionButtons
          $addArenaDevMenu[playData]
        ]
      ]

      $case[arenaOpponentBites;
        $!jsonSet[playData;arena;opponentBites;$get[value]]
        $let[desc;Opponent bites set to $get[value]]
        $let[view;custom]
        $fn[extra;
          $addArenaStatus[playData;userWardrobe]
          $addSeparator
          $addArenaActionButtons
          $addArenaDevMenu[playData]
        ]
      ]

      $case[arena;
        $resetArenaData[playData]
        $let[view;custom]
        $fn[extra;
          $addArenaOpponent[playData;$get[value];$get[arg]]
        ]
      ]
    ]

    $let[color;$getBiomeColor[playData]]

    $addContainer[
      $addAuthorDisplay

      $if[$get[desc]!=;
        $addTextDisplay[### 🛠️ $get[desc]]
      ]

      $if[$get[view]==custom;
        $callFn[extra]
      ;
        $addSeparator[Large]
        $displayAnimalStats[playData;userWardrobe]
        $addActionsMenu[playData]
      ]

      $addSeparator[Large]
      $addExitButton[playData]
      $addCheats[playData]
    ;$get[color]]

    $updatePlayData[playData]
    $interactionUpdate

    $if[$get[sendPlayData];
      $attachment[$env[playData];playData.json;true]
      $ephemeral
      $interactionFollowUp
    ]
  `,
})
