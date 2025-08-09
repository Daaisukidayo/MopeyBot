module.exports = [{
  name: "play", 
  type: "messageCreate",
  description: "first time playing",
  code: `
    $reply
    ${jsonLoader()}
    $callFunction[checking]
    $onlyIf[$guildID!=;## You can't start the game in DMs!]
    $onlyIf[$env[userProfile;testerMode]]
    
    $try[
      $getEmbeds[$env[playData;ChannelID];$env[playData;MessageID]]
    ;
      ${removeAllProgress()}
      
      $setUserVar[userPlayData;$getGlobalVar[userplayData]]
      $jsonLoad[playData;$getUserVar[userPlayData]]
    ]
    
    $onlyIf[$env[playData;started]==false;
      $description[## You already have an active game session!
      ### $hyperlink[Please end your previous game!;https://discord.com/channels/$env[playData;GuildID]/$env[playData;ChannelID]/$env[playData;MessageID]]]
      $getGlobalVar[author]
      $color[$getGlobalVar[errorColor]]
      $addActionRow
      $addButton[messagemissing-$authorID;Can't find the message;Danger]
    ]

    $!jsonSet[playData;tier;1]
    ${luckGenerator()}
    ${animalsButtonsGenerator()}
    ${exitButton()}

    $description[## Choose which animal to spawn as:\n# $get[emojisInDescription]]
    $getGlobalVar[author]

    $let[msgID;$sendMessage[$channelID;;true]]

    $!jsonSet[playData;MessageID;$get[msgID]]
    $!jsonSet[playData;ChannelID;$channelID]
    $!jsonSet[playData;GuildID;$guildID]
    $!jsonSet[playData;started;true]
    $setUserVar[userPlayData;$env[playData]]
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  description: "upgraded",
  code: `
    $arrayLoad[IID;-;$customID]
    $onlyIf[$arrayIncludes[IID;upgrade]]
    $onlyIf[$arrayIncludes[IID;$authorID];$callFunction[notYourBTN]]

    ${jsonLoader()}
    ${hasStarted()}

    $let[animal;$env[IID;0]]
    $onlyIf[$arrayIncludes[animalsKeys;$get[animal]]]

    $jsonLoad[rareReward;${rareReward()}]
    $let[bonusPerUpgrade;50]

    $let[bonusPerRare;$default[$env[rareReward;$get[animal]];0]]

    $let[wardrobeIndex;$env[userProfile;userWardrobe;$get[animal]]]
    $let[color;$env[biomeColors;$env[animals;$get[animal];biome]]]
    $let[thumbnail;$env[animals;$get[animal];variants;$get[wardrobeIndex];img]]
    $let[emoji;$env[animals;$get[animal];variants;$get[wardrobeIndex];emoji]]
    $let[animalName;$env[animals;$get[animal];variants;$get[wardrobeIndex];name]]
    $let[biome;$env[animals;$get[animal];biome]]

    $!jsonSet[playData;MC;$math[$get[bonusPerUpgrade] + $env[playData;MC] + $get[bonusPerRare]]]
    $!jsonSet[playData;currentAnimal;$get[animal]]
    $!jsonSet[playData;color;$get[color]]
    $!jsonSet[playData;currentBiome;$get[biome]]
    $!jsonSet[playData;animalBiome;$get[biome]]

    $thumbnail[$get[thumbnail]]
    $color[$get[color]]
    $description[## You upgraded to __$get[emoji] $get[animalName]__!\n${animalStats()}]
    $getGlobalVar[author]

    ${actionMenu()}
    ${exitButton()}
    $interactionUpdate
    
    $setUserVar[userPlayData;$env[playData]]
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu", "button"],
  description: "choose upgrade",
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[values;-;$selectMenuValues]
    $arrayLoad[passKeys;,;devUpArrow,devDownArrow,devUpdateArrow,upgrade,respawn,kingDragonUpg]

    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]
    $onlyIf[$arrayIncludes[IID;$authorID];$callFunction[notYourBTN]]

    ${jsonLoader()}
    ${hasStarted()}
    ${resetArena()}

    $!jsonSet[playData;isDead;false]

    $let[id;$default[$env[values;0];$env[IID;0]]]
    
    $if[$includes[$get[id];upgrade;devUpArrow];
      $!jsonSet[playData;tier;$math[$env[playData;tier] + 1]]
      $if[$env[playData;tier]>17;
        $!jsonSet[playData;tier;1]
      ]
    ]
    $if[$includes[$get[id];devDownArrow];
      $!jsonSet[playData;tier;$math[$env[playData;tier] - 1]]
      $if[$env[playData;tier]<1;
        $!jsonSet[playData;tier;17]
      ]
    ]
    $if[$includes[$get[id];devUpArrow;devDownArrow];
      $!jsonSet[playData;XP;$env[XPreq;$env[playData;tier];0]]
    ]

    $if[$includes[$get[id];kingDragonUpg];
      $jsonLoad[KD;$env[animals;kingDragon]]
      $let[KDtrig;$env[KD;trig]-upgrade-$authorID]
      $let[KDwr;$env[userProfile;userWardrobe;kingDragon]]
      $let[KDname;$env[KD;variants;$get[KDwr];name]]
      $let[KDemoji;$env[KD;variants;$get[KDwr];emoji]]
      $let[emojisInDescription;$get[KDemoji]]
      $addActionRow
      $addButton[$get[KDtrig];$get[KDname];Secondary;$get[KDemoji]]
    ;
      ${animalsButtonsGenerator()}
    ]
    ${exitButton()}

    $description[## Choose which animal to spawn as:\n# $get[emojisInDescription]]
    $getGlobalVar[author]
    $color[$env[playData;color]]
    $interactionUpdate
    $setUserVar[userPlayData;$env[playData]]
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu"],
  description: "search XP",
  code: `
    $arrayLoad[IID;-;$selectMenuValues]
    $onlyIf[$includes["$env[IID;0]";"searchXP"]]
    $onlyIf[$includes[$env[btn];$authorID];$callFunction[notYourBTN]]

    ${jsonLoader()}
    ${hasStarted()}

    $let[deathRarity;$randomNumber[1;1001]]
    $let[deathChance;30] $c[3%]
    $let[deathDesc;You were killed by a predator!]

    $let[findPrayRarity;$randomNumber[1;101]]
    $let[findPrayChance;20]

    $jsonLoad[expBase;$readFile[json/expBase.json]]
    $jsonLoad[expData;$readFile[json/expData.json]]

    $let[biome;$env[playData;currentBiome]]
    $let[animalBiome;$env[playData;animalBiome]]
    $let[animal;$env[playData;currentAnimal]]
    $let[tier;$env[playData;tier]]

    $if[$env[animals;$get[animal];isRare];
      $letSub[deathChance;20]
    ]

    $if[$get[animalBiome]!=$get[biome];
      $letSum[deathChance;20]
      $if[$get[animalBiome]==Ocean;
        $let[deathChance;1000]
        $let[deathDesc;You died by a lack of water!]
      ]
      $if[$and[$get[animalBiome]==Volcano;$or[$get[biome]==Arctic;$get[biome]==Ocean]];
        $let[deathChance;800]
        $let[deathDesc;You died by a lack of lava!]
      ]
    ]

    $switch[$get[tier];
      $case[15;$letSub[deathChance;10]]
      $case[16;$letSub[deathChance;15]]
      $case[17;$let[deathChance;5] $let[deathDesc;You were killed by teamers!]]
    ]

    $let[multiplier;$env[expData;$get[tier];m]]
    $let[extraMultiplier;1.5]

    $jsonLoad[data;$env[expData;$get[tier];d]]
    $jsonLoad[biomeArray;$env[expBase;b]]
    $jsonLoad[foodArray;$env[expBase;f]]
    $jsonLoad[preyArray;$env[expBase;p]]

    $let[biomeIndex;$arrayIndexOf[biomeArray;$get[biome]]]
    $jsonLoad[data;$env[data;$get[biomeIndex]]]

    $jsonLoad[food;$env[data;f]]
    $jsonLoad[prey;$env[data;p]]

    $if[$arrayLength[food]==0;
      $let[deathChance;1000]
      $let[deathDesc;You died by staying on lava!]
    ;

      $let[foodIndex;$arrayRandomValue[food]]
      $jsonLoad[food;$env[foodArray;$get[foodIndex]]]

      $jsonLoad[foodXPArr;$env[food;XP]]
      $let[minXP;$math[$env[foodXPArr;0] * $get[multiplier]]]
      $let[maxXP;$math[$env[foodXPArr;1] * $get[multiplier]]]
      $let[foodXP;$randomNumber[$get[minXP];$math[$get[maxXP] + 1]]]
      $let[foodXP;$round[$math[$get[foodXP] * $get[extraMultiplier]]]]
      $let[foodName;$env[food;name]]

      $if[$get[foodName]==;$let[foodName;undefined]]

      $let[xp;$get[foodXP]]
      $let[content;You ate a(n) $get[foodName] and gained \`$separateNumber[$get[xp];,]\`XP!]

      $if[$arrayLength[prey]==0;;

        $if[$get[findPrayChance]>=$get[findPrayRarity];
          $let[preyIndex;$arrayRandomValue[prey]]
          $let[preyID;$env[preyArray;$get[preyIndex];name]]
          $let[preyName;$env[animals;$get[preyID];variants;0;name]]
          $let[preyEmoji;$env[animals;$get[preyID];variants;0;emoji]]
          $let[preyTier;$env[animals;$get[preyID];tier]]

          $jsonLoad[XPreq;${XPReqForUpg()}]
          $jsonLoad[XParr;$env[XPreq;$get[preyTier]]]

          $let[minXP;$env[XParr;0]]
          $let[maxXP;$math[$env[XParr;1] / 1.5]]
          $let[xp;$randomNumber[$get[minXP];$math[$get[maxXP] + 1]]]

          $let[content;You ate a(n) __$get[preyName]__ $get[preyEmoji] and gained \`$separateNumber[$get[xp];,]\`XP!]
        ]
      ]
    ]

    $color[$env[playData;color]]

    $if[$get[deathChance]>=$get[deathRarity];
      ${setNewXPOnDeath()}
      ${setNewTier()}
      $description[## $get[deathDesc]]
      $color[$getGlobalVar[errorColor]]
      ${respawnButton()}
      $let[showCheats;false]
    ;
      $!jsonSet[playData;XP;$math[$env[playData;XP] + $get[xp]]]
      $description[## $get[content]\n${animalStats()}]
      ${actionMenu()}
      $let[showCheats;true]
    ]
    ${exitButton('$get[showCheats]')}
    $getGlobalVar[author]
    $interactionUpdate
    
    $setUserVar[userPlayData;$env[playData]]
  `
},{
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu'],
  description: 'first time arena',
  code: `
    $arrayLoad[IID;-;$selectMenuValues]
    $onlyIf[$includes[$env[IID;0];arena]]
    $onlyIf[$includes[$env[IID;2];play]]
    $onlyIf[$includes[$env[IID;1];$authorID];$callFunction[notYourBTN]]

    ${jsonLoader()}
    ${hasStarted()}

    $let[arenaR;$randomNumber[1;101]]
    $let[arenaApexAcceptR;$randomNumber[1;101]]
    $let[KDacceptR;$randomNumber[1;101]]
    $let[aquaAcceptR;$randomNumber[1;101]]
    $let[KDacceptC;15]
    $let[aquaAcceptC;30]
    $let[tier17C;5]
    $let[tier16C;15]
    $let[acceptArenaC;60]

    $if[$get[arenaR]<=$get[acceptArenaC];

      $arrayLoad[opp]

      $if[$get[arenaApexAcceptR]<=$get[tier17C];

        $let[paths;$if[$get[KDacceptR]<=$get[KDacceptC];kingDragon;blackDragon]]
        $let[opponentTier;17]

      ;$if[$get[arenaApexAcceptR]<=$get[tier16C];

        $switch[$env[playData;currentBiome];
          $case[Land;     $let[paths;dinoMonster]]
          $case[Volcano;  $let[paths;landMonster]]
          $case[Ocean;    $let[paths;seaMonster]]
          $case[Arctic;   $let[paths;iceMonster]]
          $case[Desert;   $let[paths;giantScorpion]]
          $case[Forest;   $let[paths;dinoMonster]]
        ]
        $let[opponentTier;16]

      ;

        $switch[$env[playData;currentBiome];
          $case[Land;     $let[paths;dragon,trex]]
          $case[Volcano;  $let[paths;phoenix]]
          $case[Ocean;    $let[paths;kraken,kingCrab]]
          $case[Arctic;   $let[paths;$if[$get[KDacceptR]<=$get[KDacceptC];aquaYeti;yeti]]]
          $case[Desert;   $let[paths;pterodactyl]]
          $case[Forest;   $let[paths;dragon,trex]]
        ]
        $let[opponentTier;15]

      ]]

      $arrayLoad[paths;,;$get[paths]]

      $arrayForEach[paths;path;
        $jsonLoad[vars;$env[animals;$env[path];variants]]
        $jsonLoad[v;$env[vars;$arrayRandomIndex[vars]]]

        $arrayPush[opp;$env[v;emoji]--$env[v;name]--$env[v;img]--$env[path]]
      ]

      $arrayLoad[opp;--;$arrayRandomValue[opp]]
      $let[opponent;$env[opp;0] $env[opp;1]]
      $let[desc;## You went in arena with __$get[opponent]__\n### Your turn!]
      $let[thumb;$env[opp;2]]

      $!jsonSet[playData;opponentAnimal;$get[opponent]]
      $let[apex;$env[opp;3]]

      ${arenaActionButtons()}

    ;
      $jsonLoad[ARC;${arenaRejectContent()}]
      $let[desc;## $arrayRandomValue[ARC]]
      ${actionMenu()}
    ]

    ${exitButton()}

    $getGlobalVar[author]
    $description[$get[desc]\n${animalStats()}]
    $thumbnail[$get[thumb]]
    $color[$env[playData;color]]
    $interactionUpdate
    
    $setUserVar[userPlayData;$env[playData]]
  `
},{
  type: 'interactionCreate',
  allowedInteractionTypes: ['button'],
  description: 'arena actions',
  code: `
    $arrayLoad[IID;-;$customID]
    $onlyIf[$includes[$env[IID;0];attack;defend;deceive]]
    $onlyIf[$includes[$env[IID;2];play]]
    $onlyIf[$includes[$env[IID;1];$authorID];$callFunction[notYourBTN]]

    ${jsonLoader()}
    ${hasStarted()}

    $let[playerAction;$env[IID;0]]
    $let[opponentAction;$getUserVar[opponentAction]]
    $let[opponentTier;$env[IID;3]]
    $let[apex;$env[IID;4]]
    $let[actionR;$randomNumber[1;101]]


    $if[$env[playData;arenaTurn]==0;
      $let[opponentAction;$trimLines[
        $if[$get[actionR]<=65;
          $if[$get[playerAction]==attack;defend;$if[$get[playerAction]==defend;deceive;attack]] $c[Counter action]
        ;
          $if[$get[actionR]<90; 
            $get[playerAction]  $c[Same action]
          ;
            $if[$get[playerAction]==attack;deceive;$if[$get[playerAction]==defend;attack;defend]] $c[Tie]
          ]
        ]  
      ]]
    ]

    ${arenaOpponentsActionLogic()}

    $if[$get[bitesToAdd]>0;
      $!jsonSet[playData;bitesInArena;$math[$env[playData;bitesInArena] + $get[bitesToAdd]]]
    ]
    $if[$get[oppBitesToAdd]>0;
      $!jsonSet[playData;opponentBitesInArena;$math[$env[playData;opponentBitesInArena] + $get[oppBitesToAdd]]]
    ]

    $c[? Embeds]

    $let[currentAnimal;$env[animals;$env[playData;currentAnimal];variants;$env[userProfile;userWardrobe;$env[playData;currentAnimal]];emoji]]

    $let[desc;$trimSpace[# __$get[currentAnimal] $userDisplayName__\n### Bites: \`$env[playData;bitesInArena]\`\n# \`VS\`\n# __$env[playData;opponentAnimal]__\n### Bites: \`$env[playData;opponentBitesInArena]\`\n━━━━━━━━━━━━━━━\n## You chose: \`$toTitleCase[$get[playerAction]]\`\n## Opponent chose: \`$toTitleCase[$get[opponentAction]]\`\n━━━━━━━━━━━━━━━\n## $get[actionDesc]\n━━━━━━━━━━━━━━━]]

    $if[$env[playData;arenaTurn]==0; $c[If user's turn, then setting random opponent's action]
      $let[opponentAction;$randomText[attack;defend;deceive]]
    ]

    $setUserVar[opponentAction;$get[opponentAction]]

    $if[$env[playData;bitesInArena]>=10; $c[If user won]

      $c[Giving XP based on opponent's tier]
      $jsonLoad[xpReward;{
        "15": [1000000,4000000],
        "16": [4000000,7000000],
        "17": [7000000,15000000]
      }]
      $let[min;$env[xpReward;$get[opponentTier];0]]
      $let[max;$math[$env[xpReward;$get[opponentTier];1] + 1]]
      $let[xpReward;$randomNumber[$get[min];$get[max]]]
      
      $!jsonSet[playData;XP;$math[$env[playData;XP] + $get[xpReward]]]

      ${resetArena()}

      $if[$env[playData;tier]==17; $c[If user is not a KD]
        $if[$env[playData;apex;$get[apex]];;
          $!jsonSet[playData;apex;$get[apex];true] $c[setting apex based on opponent's animal]
        ]
        ${hasAllApex()}

        $description[$get[currentApexes];1]
        $color[$getGlobalVar[apexEmbedColor];1]
      ]

      $!jsonSet[playData;MC;$math[$env[playData;MC] + 1000]]

      $color[$getGlobalVar[luckyColor]]
      ${actionMenu()}
      ${exitButton()}
      $let[desc;$get[desc]\n## YOU WON!\n${animalStats()}]

    ;
    
      $if[$env[playData;opponentBitesInArena]>=10; $c[If opponent won]

        $let[desc;$get[desc]\n## You lost]

        $!jsonSet[playData;currentAnimal;]
        ${resetArena()}

        $if[$and[$env[playData;tier]==17;$get[hasAllApex]];
          $!jsonSet[playData;XP;0];
          ${setNewXPOnDeath()}
        ]

        ${setNewTier()}
        ${removeAllApex()}
        ${respawnButton()}
        ${exitButton(false)}
        $color[$getGlobalVar[errorColor]]

      ;  $c[If arena still in progress]

        $if[$env[playData;arenaTurn]==1; $c[If opponent's turn]
          $!jsonSet[playData;arenaTurn;0]
          $let[desc;$get[desc]\n## Your turn!\n### Choose:]
        ; 
          $!jsonSet[playData;arenaTurn;1]
          $let[desc;$get[desc]\n## Opponent's turn!\n### He chose: \`$toTitleCase[$getUserVar[opponentAction]]\`]
        ]

        ${arenaActionButtons(true)}
        ${exitButton()}
        $color[$getGlobalVar[defaultColor]]
      ]
    ]
    
    $description[$get[desc]]
    $getGlobalVar[author]
    $interactionUpdate
    
    $setUserVar[userPlayData;$env[playData]]
  `
},{
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu'],
  description: 'downgrading',
  code: `
    $arrayLoad[IID;-;$selectMenuValues]
    $onlyIf[$includes["$env[IID;0]";"downgrade"]]
    $onlyIf[$includes[$env[btn];$authorID];$callFunction[notYourBTN]]

    ${jsonLoader()}
    ${hasStarted()}

    $let[currentBiome;$env[playData;currentBiome]]
    $let[animalBiome;$env[playData;animalBiome]]

    $let[animLandBiome;$checkCondition[$get[animalBiome]==Land]]
    $let[animDesertBiome;$checkCondition[$get[animalBiome]==Desert]]
    $let[animVolcanoBiome;$checkCondition[$get[animalBiome]==Volcano]]
    $let[animOceanBiome;$checkCondition[$get[animalBiome]==Ocean]]
    $let[animArcticBiome;$checkCondition[$get[animalBiome]==Arctic]]
    $let[animForestBiome;$checkCondition[$get[animalBiome]==Forest]]

    $let[isCurrLandBiome;$checkCondition[$get[currentBiome]==Land]]
    $let[isCurrDesertBiome;$checkCondition[$get[currentBiome]==Desert]]
    $let[isCurrVolcanoBiome;$checkCondition[$get[currentBiome]==Volcano]]
    $let[isCurrOceanBiome;$checkCondition[$get[currentBiome]==Ocean]]
    $let[isCurrArcticBiome;$checkCondition[$get[currentBiome]==Arctic]]
    $let[isCurrForestBiome;$checkCondition[$get[currentBiome]==Forest]]

    $if[$env[IID;0]==downgrade;
      $if[$and[$or[$get[animLandBiome];$get[animDesertBiome];$get[animArcticBiome];$get[animForestBiome];$get[animOceanBiome]];$or[$get[isCurrVolcanoBiome];$get[isCurrDesertBiome]]];
        
        $c[? If animal belongs to Land, Desert, Forest or Arctic and current biome is Volcano or Desert]
        $let[desc;## You chose to downgrade by diving into lava!]

      ;$if[$and[$or[$get[animLandBiome];$get[animDesertBiome];$get[animArcticBiome];$get[animForestBiome];$get[animVolcanoBiome]];$get[isCurrOceanBiome]];
        
        $c[? If animal belongs to Land, Desert, Arctic, Forest or Volcano and current biome is Ocean]
        $let[desc;## You chose to downgrade by surrendering to the deep ocean predators!]

      ;$if[$and[$get[animOceanBiome];$or[$get[isCurrLandBiome];$get[isCurrVolcanoBiome];$get[isCurrOceanBiome];$get[isCurrForestBiome];$get[isCurrArcticBiome];$get[isCurrDesertBiome]]];
        
        $c[? If animal belongs to Ocean and current biome is Land, Ocean, Forest, Arctic or Desert]
        $let[desc;## You chose to downgrade by suffocating on land!]

      ;$if[$and[$get[animVolcanoBiome];$or[$get[isCurrLandBiome];$get[isCurrOceanBiome];$get[isCurrForestBiome];$get[isCurrArcticBiome];$get[isCurrDesertBiome]]];
        
        $c[? If animal belongs to Volcano and current biome is Land, Ocean, Forest, Arctic or Desert]
        $let[desc;## You chose to downgrade by running out of lava!]

      ;$if[$and[$get[animVolcanoBiome];$get[isCurrVolcanoBiome]];
        
        $c[? If animal belongs to Volcano and current biome is Volcano]
        $let[desc;## You chose to downgrade by $if[$env[playData;tier]<17;giving yourself to a predator;giving everyone bites]!]

      ;$if[$and[$or[$get[animLandBiome];$get[animArcticBiome];$get[animForestBiome]];$or[$get[isCurrLandBiome];$get[isCurrArcticBiome];$get[isCurrForestBiome]]];
        
        $c[? If animal belongs to Land, Arctic or Forest and current biome is Land, Arctic or Forest]
        $let[desc;## You chose to downgrade by $randomText[giving yourself to a predator;running out of water]!]

      ; 
        $let[desc;## textNotFound|playUnknownDeathDowngradeContent]
      ]]]]]]

    ]

    $!jsonSet[playData;isDead;true]
    ${setNewXPOnDeath()}
    ${setNewTier()}

    $color[$getGlobalVar[errorColor]]
    $getGlobalVar[author]
    $description[$get[desc]]
    
    ${respawnButton()}
    ${exitButton(false)}

    $interactionUpdate
    
    $setUserVar[userPlayData;$env[playData]]
  `
},{
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu'],
  description: 'move to biome',
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[values;-;$selectMenuValues]
    $arrayLoad[passKeys;,;moveTo,play]

    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]
    $onlyIf[$arrayIncludes[IID;$authorID];$callFunction[notYourBTN]]

    ${jsonLoader()}
    ${hasStarted()}

    $let[biome;$env[IID;1]]
    $let[color;$env[biomeColors;$get[biome]]]

    $!jsonSet[playData;currentBiome;$get[biome]]
    $!jsonSet[playData;color;$get[color]]

    $description[## Successfully moved to __$get[biome]__!\n${animalStats()}]
    $getGlobalVar[author]
    $color[$env[playData;color]]
    ${actionMenu()}
    ${exitButton()}
    $interactionUpdate
    
    $setUserVar[userPlayData;$env[playData]]
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  description: "exit",
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;messagemissing,quit]

    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]
    $onlyIf[$arrayIncludes[IID;$authorID];$callFunction[notYourBTN]]

    ${jsonLoader()}

    $onlyif[$env[playData;started];
      $description[## You don't have an active game session!]
      $callFunction[embed;error]
      $interactionUpdate
    ]

    $switch[$env[IID;0];

      $case[messagemissing;
        $description[## You have been successfully disconnected from the game!\n-# Earned: $separatenumber[$env[playData;MC];,]$getGlobalVar[emoji]]
        $callFunction[embed;default]
        $try[$!disableComponentsOf[$env[playData;ChannelID];$env[playData;MessageID]]]
      ]
    
      $case[quit;
        $onlyIf[$env[playData;MessageID]==$messageID]
        $description[## You have successfully exited the game!\n-# Earned: $separatenumber[$env[playData;MC];,]$getGlobalVar[emoji]]
        $callFunction[embed;default]
      ]

    ]
    $interactionUpdate
    ${removeAllProgress()}
  `
}]

// System functions

function rareReward () {
  return `{
    "whiteDove": 500,
    "pinkyPig": 200,
    "stinkyPig": 200,
    "doe": 200,
    "marshDeer": 200,
    "muskDeer": 200,
    "goldenPheasant": 200,
    "jackass": 200,
    "blueMacaw": 200,
    "rareMacaw": 200,
    "momaffie": 200,
    "momaffieFamily": 200,
    "girabie": 200,
    "jaguar": 200,
    "leopard": 200,
    "blackPanther": 200,
    "chocoToucan": 50,
    "keelBilledToucan": 200,
    "fieryToucan": 200,
    "lavaToucan": 200,
    "rareToucan": 200,
    "yellowPufferfish": 200,
    "demonPufferfish": 200,
    "blackBear": 200,
    "whiteTiger": 200,
    "blackTiger": 200,
    "blackManedLion": 200,
    "lionCub": 200,
    "whiteLionCub": 200,
    "blackLionCub": 200,
    "lioness": 200,
    "WhiteLioness": 200,
    "blackLioness": 200,
    "predator": 200,
    "shaheen": 200,
    "goldenEagle": 200,
    "harpyEagle": 200,
    "greaterSpottedEagle": 200,
    "whiteRhino": 200,
    "blackRhino": 200,
    "markhor": 200,
    "bigGoat": 200,
    "whiteGiraffe": 200,
    "giraffeFamily": 200,
    "aquaYeti": 200,
    "shopSnowman": 200,
    "luckSnowman": 200,
    "shopSnowgirl": 200,
    "luckSnowgirl": 200,
    "shopBigfoot": 200,
    "luckBigfoot": 200,
    "kingDragon": 200
  }`
}

function luckGenerator () {
  return `
    $jsonLoad[allRareAttemptsInfo;{}]
    $jsonLoad[rareGroups;
      [
        "pigeon|pigeon|whiteDove", 
        "pig|pig|pinkyPig|stinkyPig",
        "deer|deer|doe|marshDeer",
        "reindeer|reindeer|muskDeer",
        "swinehoe|swinehoe|goldenPheasant",
        "donkey|donkey|jackass",
        "macaw|macaw|blueMacaw|rareMacaw",
        "giraffe|giraffe|momaffie|momaffieFamily|girabie",
        "cheetah|cheetah|jaguar|leopard|blackPanther",
        "toucan|toucan|chocoToucan|keelBilledToucan|fieryToucan|lavaToucan|rareToucan",
        "pufferfish|pufferfish|yellowPufferfish|demonPufferfish",
        "bear|bear|blackBear",
        "tiger|tiger|whiteTiger|blackTiger",
        "lion|lion|lioness|lionCub|blackManedLion|whiteLionCub|whiteLioness|whiteLion|blackLionCub|blackLioness|blackLion",
        "falcon|falcon|predator|shaheen",
        "vulture|vulture|rareVulture",
        "rhino|rhino|whiteRhino|blackRhino",
        "baldEagle|baldEagle|goldenEagle|harpyEagle|greaterSpottedEagle",
        "markhor|undefined|markhor|bigGoat",
        "whiteGiraffe|undefined|whiteGiraffe|giraffeFamily",
        "yeti|yeti|aquaYeti",
        "luckBigfoot|undefined|shopBigfoot|luckBigfoot",
        "luckSnowman|undefined|shopSnowman|luckSnowman",
        "luckSnowgirl|undefined|shopSnowgirl|luckSnowgirl",
        "blackDragon|blackDragon|kingDragon"
      \\]
    ]

    $arrayForEach[rareGroups;groupConfig;
      $arrayLoad[groupParts;|;$env[groupConfig]]
      $let[keyName;$env[groupParts;0]]
      $let[commonAnimal;$env[groupParts;1]]
      $let[tier;$env[animals;$get[keyName];tier]]
      $let[totalAttempts;$env[animals;$env[groupParts;2];rarity;1]]

      $let[totalRare;0]
      $arrayCreate[rarePool;0]

      $loop[$math[$arrayLength[groupParts] - 2];
        $let[ri;$math[$env[ri] + 1]]
        $let[rareAnimal;$env[groupParts;$get[ri]]]
        $let[countRare;$env[animals;$get[rareAnimal];rarity;0]]

        $if[$get[countRare]!=;
          $arrayCreate[oneRareArr;$get[countRare]]
          $arrayFill[oneRareArr;$get[rareAnimal]]
          $arrayConcat[rarePool;rarePool;oneRareArr]
          $letSum[totalRare;$get[countRare]]
        ]
      ;ri;true]

      $let[totalCommons;$math[$get[totalAttempts] - $get[totalRare]]]
      $arrayCreate[commonArr;$get[totalCommons]]
      $arrayFill[commonArr;$get[commonAnimal]]

      $arrayConcat[fullAttemptArr;rarePool;commonArr]
      $arrayShuffle[fullAttemptArr]

      $!jsonSet[allRareAttemptsInfo;$get[keyName];{
        "index": 0,
        "maxIndex": $arrayLength[fullAttemptArr],
        "attempts": $env[fullAttemptArr]
      }]
    ]
    $setUserVar[allRareAttemptsInfo;$env[allRareAttemptsInfo]]
  `
}

function setNewXPOnDeath () {
  return `$!jsonSet[playData;XP;$floor[$math[$env[playData;XP] / 2]]]`
}

function setXP () { // deprecated
  return `$round[$math[($env[XPreq;$env[playData;tier];0] + $env[XPreq;$env[playData;tier];1] / $env[playData;tier]) / $randomNumber[10;16;true]]]`
}

function setNewTier () {
  return `
    $let[XP;$env[playData;XP]]
    $loop[17;
      $let[value1;$env[XPreq;$env[i];0]]
      $let[value2;$env[XPreq;$env[i];1]]

      $if[$and[$get[XP]>=$get[value1];$get[XP]<$get[value2]];
        $!jsonSet[playData;tier;$env[i]]
        $break
      ]
    ;i;true]
  `
}

function removeAllProgress() {
  return `
    $callFunction[sumMC;$env[playData;MC]]
    $setUserVar[userProfile;$env[userProfile]]

    $deleteUserVar[allRareAttemptsInfo]
    $deleteUserVar[userPlayData]
  `
}

function removeAllApex () {
  return `
    $jsonLoad[resetPlayData;$getGlobalVar[userPlayData]]
    $!jsonSet[playData;apex;$env[resetPlayData;apex]]
  `
}

function XPReqForUpg () {
  return `
    {
      "1": [0, 150\\],
      "2": [150, 400\\],
      "3": [400, 1000\\],
      "4": [1000, 2000\\],
      "5": [2000, 5000\\],
      "6": [5000, 12000\\],
      "7": [12000, 25000\\],
      "8": [25000, 40000\\],
      "9": [40000, 60000\\],
      "10": [60000, 90000\\],
      "11": [90000, 145000\\],
      "12": [145000, 350000\\],
      "13": [350000, 650000\\],
      "14": [650000, 1000000\\],
      "15": [1000000, 5000000\\],
      "16": [5000000, 10000000\\],
      "17": [10000000, 40000000\\]
    }
  `
}

function jsonLoader() {
  return `
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $jsonLoad[playData;$getUserVar[userPlayData]]
    $jsonLoad[animals;$readFile[json/animals.json]]
    $jsonLoad[animalsKeys;$jsonKeys[animals]]
    $jsonLoad[biomeColors;$getGlobalVar[biomeColors]]
    $jsonLoad[XPreq;${XPReqForUpg()}]
  `
}

// Arena functions

function arenaOpponentsActionLogic () {
  return `
    $switch[$get[playerAction]_$get[opponentAction];

      $case[attack_attack;
        $if[$get[actionR]>=67;
          $let[actionDesc;No one get a bite]
        ;$if[$get[actionR]>=33;
          $let[actionDesc;You bit your opponent]
          $let[bitesToAdd;1]
        ;
          $let[actionDesc;Your opponent bit you]
          $let[oppBitesToAdd;1]
        ]]
      ]

      $case[attack_defend;
        $if[$get[actionR]>=40;
          $let[actionDesc;Your opponent defended himself and bit you]
          $let[oppBitesToAdd;1]
        ;$if[$get[actionR]>=25;
          $let[actionDesc;Your opponent defended himself, but nobody bites]
        ;
          $let[actionDesc;Your opponent failed to defend himself and you bit him]
          $let[bitesToAdd;1]
        ]]
      ]

      $case[attack_deceive;
        $if[$get[actionR]>=40;
          $let[actionDesc;You successfully counterattacked his deceive and bit him!]
          $let[bitesToAdd;1]
        ;$if[$get[actionR]>=25;
          $let[actionDesc;Your opponent successfully deceived you, but nobody bites]
        ;
          $let[actionDesc;Your opponent successfully deceived and bit you]
          $let[oppBitesToAdd;1]
        ]]
      ]

      $case[defend_attack;
        $if[$get[actionR]>=30;
          $let[actionDesc;You successfully defended yourself and bit your opponent]
          $let[bitesToAdd;1]
        ;$if[$get[actionR]>=15;
          $let[actionDesc;You successfully defended yourself, but nobody bites]
        ;
          $let[actionDesc;You unsuccessfully defended yourself and your opponent bit you]
          $let[oppBitesToAdd;1]
        ]]
      ]

      $case[defend_defend;
        $let[actionDesc;No one get a bite]
      ]

      $case[defend_deceive;
        $if[$get[actionR]>=30;
          $let[actionDesc;You unsuccessfully defended yourself and opponent bit you]
          $let[oppBitesToAdd;1]
        ;$if[$get[actionR]>=15;
          $let[actionDesc;You successfully defended yourself from his deceive and you bit him]
          $let[bitesToAdd;1]
        ;
          $let[actionDesc;You successfully defended yourself from his deceive, but nobody bites]
        ]]
      ]

      $case[deceive_attack;
        $if[$get[actionR]>=30;
          $let[actionDesc;You unsuccessfully deceived your opponent and he bit you]
          $let[oppBitesToAdd;1]
        ;$if[$get[actionR]>=15;
          $let[actionDesc;You successfully deceived your opponent and bit him]
          $let[bitesToAdd;1]
        ;
          $let[actionDesc;You successfully deceived your opponent, but nobody bites]
        ]]
      ]

      $case[deceive_defend;
        $if[$get[actionR]>=30;
          $let[actionDesc;You successfully deceived your opponent and bit him]
          $let[bitesToAdd;1]
        ;$if[$get[actionR]>=15;
          $let[actionDesc;You successfully deceived your opponent, but nobody bites]
        ;
          $let[actionDesc;You unsuccessfully deceived your opponent and he bit you]
          $let[oppBitesToAdd;1]
        ]]
      ]

      $case[deceive_deceive;
        $if[$get[actionR]>=67;
          $let[actionDesc;No one get a bite]
        ;$if[$get[actionR]>=33;
          $let[actionDesc;You successfully deceived your opponent and bit him]
          $let[bitesToAdd;1]
        ;
          $let[actionDesc;You unsuccessfully deceived your opponent and he bit you]
          $let[oppBitesToAdd;1]
        ]]
      ]
    ]
  `
}

function resetArena () {
  return `
    $!jsonSet[playData;arenaTurn;0]
    $!jsonSet[playData;opponentAnimal;]
    $!jsonSet[playData;bitesInArena;0]
    $!jsonSet[playData;opponentBitesInArena;0]
    $deleteUserVar[opponentAction]
  `
}

function arenaRejectContent () {
  return `[
    "No takers?",
    "Another rejection.",
    "Another dodge…",
    "Declined? Again?",
    "Another reject… classic.",
    "Seems like everyone's allergic to danger.",
    "Another rejection… Starting to feel personal.",
    "Nobody wants to 1v1 you.",
    "Nobody? Seriously?",
    "Wow, another one backed out.",
    "Guess you're just too dangerous.",
    "Rejected again.",
    "No one? Really?",
    "Another 1v1 declined.",
    "You scared them all off… again.",
    "You didn't find anyone to battle.",
    "Another 'No.'",
    "Seems like you're destined to battle… your loneliness.",
    "Rejected… again.",
    "Nobody wants to fight? Again?",
    "Another reject… Typical.",
    "Still no opponent?",
    "Nobody showed up.",
    "Another 1v1 rejected.",
    "They saw your name and ran.",
    "No takers? Again?",
    "Seems like everyone is scared of you because nobody wants to 1v1 you.",
    "Another reject :|"
  \\]
  `
}

// Button/menu functions

function respawnButton () {
  return `
    $addActionRow
    $addButton[respawn-play-$authorID;Respawn;Success]
  `
}

function arenaActionButtons (showDeceiveButton = false) {
  return `
    $addActionRow
    $addButton[attack-play-$authorID-$get[opponentTier]-$get[apex];Attack;Success;🗡️]
    $addButton[defend-play-$authorID-$get[opponentTier]-$get[apex];Defend;Success;🛡️]
    $if[${showDeceiveButton};
      $addButton[deceive-play-$authorID-$get[opponentTier]-$get[apex];Deceive;Success;🎭]
    ]
  `
}

function exitButton(showCheat = true) {
  return `
    $addActionRow
    $addButton[quit-$authorID;Quit game;Danger;🔚]

    $if[$and[${showCheat};$env[playData;isDead]!=true;$env[userProfile;testerMode]];
      $addActionRow
      $addButton[devUpArrow-play-$authorID;;Success;🔼]
      $addButton[devUpdateArrow-play-$authorID;;Success;🔃]
      $addButton[devDownArrow-play-$authorID;;Success;🔽]
    ]
  `
}

function animalsButtonsGenerator() {
  return `
    $let[buttonsQ;0]
    $let[emojisInDescription;]
    $jsonLoad[buttonStyle;$getGlobalVar[buttonStyle]]

    $loop[$arrayLength[animalsKeys];

      $let[i;$math[$env[i] - 1]]
      $let[animal;$env[animalsKeys;$get[i]]]
      $let[animalTier;$env[animals;$get[animal];tier]]

      $if[$get[animalTier]>$env[playData;tier];
        $break
      ]
      $if[$get[animalTier]!=$env[playData;tier];
        $continue
      ]

      $jsonLoad[allRareAttemptsInfo;$getUserVar[allRareAttemptsInfo]]
      $jsonLoad[ARAIkeys;$jsonKeys[allRareAttemptsInfo]]

      $if[$arrayIncludes[ARAIkeys;$get[animal]];
        $jsonLoad[attemptsArr;$env[allRareAttemptsInfo;$get[animal];attempts]]
        $let[index;$env[allRareAttemptsInfo;$get[animal];index]]

        $let[chosenAnimal;$env[attemptsArr;$get[index]]]
        $letSum[index;1]

        $if[$env[animals;$get[chosenAnimal];isRare];
          $arrayShuffle[attemptsArr]
          $!jsonSet[allRareAttemptsInfo;$get[animal];attempts;$env[attemptsArr]]
          $!jsonSet[allRareAttemptsInfo;$get[animal];index;0]
          $let[index;0]
        ]

        $!jsonSet[allRareAttemptsInfo;$get[animal];index;$get[index]]
        $setUserVar[allRareAttemptsInfo;$env[allRareAttemptsInfo]]
        
        $if[$get[chosenAnimal]==undefined;
          $continue
        ]

        $let[animal;$get[chosenAnimal]]

      ;
        $if[$env[animals;$get[animal];isRare];
          $continue
        ]
      ]

      $let[buttonIndex;$arrayFindIndex[buttonStyle;arr;$jsonLoad[list;$env[arr;1]]$arrayincludes[list;$get[animal]]]]
      $let[butStyle;$env[buttonStyle;$get[buttonIndex];0]]
      $if[$get[butStyle]==;
        $let[butStyle;Secondary]
      ]

      ${varsForButtonGen()}
    ;i;true]
  `
}

function varsForButtonGen () {
  return `
    $let[wr;$env[userProfile;userWardrobe;$get[animal]]]
    $let[emoji;$env[animals;$get[animal];variants;$get[wr];emoji]]
    $let[animalName;$env[animals;$get[animal];variants;$get[wr];name]]
    $let[trig;$env[animals;$get[animal];trig]-$authorID-upgrade]
    $let[emojisInDescription;$get[emojisInDescription]$get[emoji]]
    
    $if[$math[$get[buttonsQ]%5]==0;
      $addActionRow
    ]
    $addButton[$get[trig];$get[animalName];$get[butStyle];$get[emoji]]
    $letSum[buttonsQ;1]
  `
}

function actionMenu () {
  return `
    $let[curBiome;$env[playData;currentBiome]]

    $addActionRow
    $addStringSelectMenu[actions-play-$authorID;Actions]

    $if[$and[$env[playData;tier]==17;$get[hasAllApex]];
      $addOption[Upgrade;;kingDragonUpg;⬆️]
    ]

    $if[$and[$env[playData;XP]>=$env[XPreq;$env[playData;tier];1];$env[playData;tier]!=17];
      $addOption[Upgrade;;upgrade;⬆️]
      $let[hideSwitchBiome;true]
    ;
      $addOption[Search for XP;;searchXP;🍴]
      $if[$env[playData;tier]>=15;
        $addOption[Arena;;arena;⚔️]
      ]
    ]

    $addOption[Downgrade;;downgrade;⬇️]

    $if[$get[hideSwitchBiome];;

      $addActionRow
      $addStringSelectMenu[moveTo-play-$authorID;Switch biome]

      $if[$get[curBiome]!=Land;
        $addOption[Land;;moveto_Land;⛰️]
      ]
      $if[$and[$get[curBiome]!=Desert;$get[curBiome]!=Arctic;$get[curBiome]!=Volcano];
        $addOption[Desert;;moveto_Desert;🏜️]
      ]
      $if[$and[$get[curBiome]!=Volcano;$get[curBiome]!=Ocean;$get[curBiome]!=Desert;$get[curBiome]!=Arctic;$get[curBiome]!=Forest];
        $addOption[Volcano;;moveto_Volcano;🌋]
      ]
      $if[$and[$get[curBiome]!=Ocean;$get[curBiome]!=Volcano];
        $addOption[Ocean;;moveto_Ocean;🌊]
      ]
      $if[$and[$get[curBiome]!=Desert;$get[curBiome]!=Arctic;$get[curBiome]!=Volcano];
        $addOption[Arctic;;moveto_Arctic;❄️]
      ]
      $if[$and[$get[curBiome]!=Forest;$get[curBiome]!=Volcano];
        $addOption[Forest;;moveto_Forest;🌲]
      ]
    ]

  `
}

// Helper functions

function animalStats() {
  return `-# $env[animals;$env[playData;currentAnimal];variants;$env[userProfile;userWardrobe;$env[playData;currentAnimal]];emoji] • $abbreviateNumber[$env[playData;XP]]XP • $env[playData;MC]$getGlobalVar[emoji]`
}

function animalEmoji (animal, v = 0) {
  return `$env[animals;${animal};variants;${v};emoji]`
}

function hasAllApex() {
  return `
    $arrayLoad[allApex;,;dragon,trex,phoenix,pterodactyl,kingCrab,yeti,landMonster,dinoMonster,giantScorpion,seaMonster,iceMonster,blackDragon]
    $arrayLoad[totalApex]
    $jsonLoad[darkApexEmojis;$getGlobalVar[darkApexEmojis]]
    $let[hasAllApex;$arrayEvery[allApex;apex;$env[playData;apex;$env[apex]]]]

    $arrayForEach[allApex;apex;
      $arrayPush[totalApex;$if[$env[playData;apex;$env[apex]];${animalEmoji('$env[apex]')};$env[darkApexEmojis;$env[apex]]]]
    ]

    $let[currentApexes;# $arrayJoin[totalApex; ]]
  `
}

function hasStarted () {
  return `
    $onlyIf[$and[$env[playData;started];$env[playData;MessageID]==$messageID;$env[playData;ChannelID]==$channelID]]
  `
}