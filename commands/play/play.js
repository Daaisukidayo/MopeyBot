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
      
      $setUserVar[userPlayData;$env[playData]]
    ]
    
    $onlyIf[$env[playData;started]==false;
      $description[## You already have an active game session!
      ### $hyperlink[Please end your previous game!;https://discord.com/channels/$env[playData;GuildID]/$env[playData;ChannelID]/$env[playData;MessageID]]]
      $getGlobalVar[author]
      $color[$getGlobalVar[errorColor]]
      $addActionRow
      $addButton[messagemissing-$authorID;Can't find the game;Danger]
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
    $arrayLoad[btn;-;$customID]
    $onlyIf[$includes[$env[btn;2];upgrade]]
    $onlyIf[$includes[$env[btn;1];$authorID];$callFunction[notYourBTN]]

    ${jsonLoader()}
    ${hasStarted()}

    $let[animal;$env[btn;0]]
    $onlyIf[$arrayIncludes[animalsKeys;$get[animal]]]

    $let[bonus;50]

    $let[wardrobeIndex;$env[userProfile;userWardrobe;$get[animal]]]
    $let[color;$env[biomeColors;$env[animals;$get[animal];biome]]]
    $let[thumbnail;$env[animals;$get[animal];variants;$get[wardrobeIndex];img]]
    $let[emoji;$env[animals;$get[animal];variants;$get[wardrobeIndex];emoji]]
    $let[animalName;$env[animals;$get[animal];variants;$get[wardrobeIndex];name]]
    $let[biome;$env[animals;$get[animal];biome]]

    $!jsonSet[playData;MC;$math[$get[bonus] + $env[playData;MC]]]
    $!jsonSet[playData;currentAnimal;$get[emoji]]
    $!jsonSet[playData;color;$get[color]]
    $!jsonSet[playData;currentBiome;$get[biome]]
    $!jsonSet[playData;animalBiome;$get[biome]]

    $thumbnail[$get[thumbnail]]
    $color[$get[color]]
    $description[## You upgraded to __$get[emoji] $get[animalName]__!\n${animalStats()}]
    $getGlobalVar[author]

    ${actionMenu()}
    ${exitButton()}
    $!editMessage[$channelID;$messageID]
    
    $setUserVar[userPlayData;$env[playData]]
    $deferUpdate
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu", "button"],
  description: "choose upgrade",
  code: `
    $arrayLoad[btn;-;$if[$isButton;$customID;$selectMenuValues]]
    $onlyIf[$includes["$env[btn;0]";"up";"down";"update";"upgrade";"respawn";"kingDragonUpg"]]
    $onlyIf[$includes[$env[btn];$authorID];$callFunction[notYourBTN]]

    ${jsonLoader()}
    ${hasStarted()}
    ${resetArena()}

    $!jsonSet[playData;isDead;false]
    
    $if[$includes["$env[btn;0]";"upgrade";"up"];
      $!jsonSet[playData;tier;$math[$env[playData;tier] + 1]]
      $if[$env[playData;tier]>17;
        $!jsonSet[playData;tier;1]
      ]
    ]
    $if[$includes["$env[btn;0]";"down"];
      $!jsonSet[playData;tier;$math[$env[playData;tier] - 1]]
      $if[$env[playData;tier]<1;
        $!jsonSet[playData;tier;17]
      ]
    ]
    $if[$includes["$env[btn;0]";"up";"down"];
      $!jsonSet[playData;XP;$env[XPreq;$env[playData;tier];0]]
    ]

    $deferUpdate

    $if[$includes["$env[btn;0]";"kingDragonUpg"]!=true;
      ${animalsButtonsGenerator()}
    ;
      $jsonLoad[KD;$env[animals;kingDragon]]
      $let[KDtrig;$env[KD;trig]-$authorID-upgrade]
      $let[KDw;$env[userProfile;userWardrobe;kingDragon]]
      $let[KDname;$env[KD;variants;$get[KDwr];name]]
      $let[KDemoji;$env[KD;variants;$get[KDwr];emoji]]
      $let[emojisInDescription;$get[KDemoji]]
      $addActionRow
      $addButton[$get[KDtrig];$get[KDname];Secondary;$get[KDemoji]]
    ]
    ${exitButton()}

    $description[## Choose which animal to spawn as:\n# $get[emojisInDescription]]
    $getGlobalVar[author]
    $color[$env[playData;color]]
    $!editMessage[$channelID;$messageID]
    
    $setUserVar[userPlayData;$env[playData]]
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu"],
  description: "search food",
  code: `
    $arrayLoad[btn;-;$selectMenuValues]
    $onlyIf[$includes["$env[btn;0]";"searchXP"]]
    $onlyIf[$includes[$env[btn];$authorID];$callFunction[notYourBTN]]

    ${jsonLoader()}
    ${hasStarted()}

    $let[xp;${setXP()}]

    $!jsonSet[playData;XP;$math[$env[playData;XP] + $get[xp]]]
    $description[## You ate some food and gained \`$separateNumber[$get[xp];,]\`XP \n${animalStats()}]
    $getGlobalVar[author]
    $color[$env[playData;color]]
    ${actionMenu()}
    ${exitButton()}
    $!editMessage[$channelID;$messageID]
    
    $setUserVar[userPlayData;$env[playData]]
    $deferUpdate
  `
},{
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu'],
  description: 'first time arena',
  code: `
    $arrayLoad[btn;-;$selectMenuValues]
    $onlyIf[$includes[$env[btn;0];arena]]
    $onlyIf[$includes[$env[btn;2];play]]
    $onlyIf[$includes[$env[btn;1];$authorID];$callFunction[notYourBTN]]

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
    $!editMessage[$channelID;$messageID]
    
    $setUserVar[userPlayData;$env[playData]]
    $deferUpdate
  `
},{
  type: 'interactionCreate',
  allowedInteractionTypes: ['button'],
  description: 'arena actions',
  code: `
    $arrayLoad[btn;-;$customID]
    $onlyIf[$includes[$env[btn;0];attack;defend;deceive]]
    $onlyIf[$includes[$env[btn;2];play]]
    $onlyIf[$includes[$env[btn;1];$authorID];$callFunction[notYourBTN]]

    ${jsonLoader()}
    ${hasStarted()}

    $let[playerAction;$env[btn;0]]
    $let[opponentAction;$getUserVar[opponentAction]]
    $let[opponentTier;$env[btn;3]]
    $let[apex;$env[btn;4]]
    $let[actionR;$randomNumber[1;101]]

    $deferUpdate

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

    $let[desc;$trimSpace[# __$env[playData;currentAnimal] $userDisplayName__\n### Bites: \`$env[playData;bitesInArena]\`\n# \`VS\`\n# __$env[playData;opponentAnimal]__\n### Bites: \`$env[playData;opponentBitesInArena]\`\n━━━━━━━━━━━━━━━\n## You chose: \`$toTitleCase[$get[playerAction]]\`\n## Opponent chose: \`$toTitleCase[$get[opponentAction]]\`\n━━━━━━━━━━━━━━━\n## $get[actionDesc]\n━━━━━━━━━━━━━━━]]

    $if[$env[playData;arenaTurn]==0; $c[If user's turn, then setting random opponent's action]
      $let[opponentAction;$randomText[attack;defend;deceive]]
    ]

    $setUserVar[opponentAction;$get[opponentAction]]

    $if[$env[playData;bitesInArena]>=10; $c[If user won]

      $c[Giving XP based on opponent's tier]

      $let[xpReward;$trimLines[
        $switch[$get[opponentTier];
          $case[15;$randomNumber[1000000;4000001]]
          $case[16;$randomNumber[4000000;7000001]]
          $case[17;$randomNumber[7000000;15000001]]
        ]
      ]]
      $!jsonSet[playData;XP;$math[$env[playData;XP] + $get[xpReward]]]

      ${resetArena()}

      $if[$env[playData;tier]==17; $c[If user is not a KD]
        $if[$env[playData;apex;$get[apex]];;
          $!jsonSet[playData;apex;$get[apex];true] $c[setting apex based on opponent's animal]
        ]
        ${hasAllApex()}
        ${currentApexes()}

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
    $!editMessage[$channelID;$messageID]
    
    $setUserVar[userPlayData;$env[playData]]
  `
},{
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu'],
  description: 'downgrading',
  code: `
    $arrayLoad[btn;-;$selectMenuValues]
    $onlyIf[$includes["$env[btn;0]";"downgrade";"failSearchXP"]]
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

    $if[$env[btn;0]==downgrade;
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

    $if[$env[btn;0]==failSearchXP;
      $let[desc;## textNotFound|playSuddenDeathContent]
    ]

    $!jsonSet[playData;isDead;true]
    ${setNewXPOnDeath()}
    ${setNewTier()}

    $color[$getGlobalVar[errorColor]]
    $getGlobalVar[author]
    $description[$get[desc]]
    
    ${respawnButton()}
    ${exitButton(false)}

    $!editMessage[$channelID;$messageID]
    
    $setUserVar[userPlayData;$env[playData]]
    $deferUpdate
  `
},{
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu'],
  description: 'move to biome',
  code: `
    $arrayLoad[btn;-;$selectMenuValues]
    $onlyIf[$includes[$env[btn];moveto_]]
    $onlyIf[$includes[$env[btn];play]]
    $onlyIf[$includes[$env[btn];$authorID];$callFunction[notYourBTN]]

    ${jsonLoader()}
    ${hasStarted()}

    $arrayLoad[btn;_;$env[btn;0]]

    $let[biome;$env[btn;1]]
    $let[color;$env[biomeColors;$get[biome]]]

    $!jsonSet[playData;currentBiome;$get[biome]]
    $!jsonSet[playData;color;$get[color]]

    $description[## Successfully moved to __$get[biome]__!\n${animalStats()}]
    $getGlobalVar[author]
    $color[$env[playData;color]]
    ${actionMenu()}
    ${exitButton()}
    $!editMessage[$channelID;$messageID]
    
    $setUserVar[userPlayData;$env[playData]]
    $deferUpdate
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  description: "exit",
  code: `
    $arrayLoad[btn;-;$customid]
    $onlyIf[$includes[$env[btn];messagemissing;quit]]
    $onlyIf[$includes[$env[btn];$authorID];$callFunction[notYourBTN]]

    ${jsonLoader()}

    $onlyif[$env[playData;started];
      $description[## You don't have an active game session!]
      $getGlobalVar[author]
      $color[$getGlobalVar[errorColor]]
      $!editMessage[$channelID;$messageID]
    ]
    $if[$env[btn;0]==messagemissing;
      $!editMessage[$channelID;$messageID;
        $description[## You have been successfully disconnected from the game!\n-# Earned: $separatenumber[$env[playData;MC];,]$getGlobalVar[emoji]]
        $getGlobalVar[author]
        $color[$getGlobalVar[defaultColor]]
      ]

      $try[
        $!disableButtonsOf[$env[playData;ChannelID];$env[playData;MessageID]]
      ]
    ]
    
    $if[$and[$env[playData;MessageID]==$messageID;$env[btn;0]==quit];

      $!editMessage[$channelID;$messageID;
        $description[## You have successfully exited the game!\n-# Earned: $separatenumber[$env[playData;MC];,]$getGlobalVar[emoji]]
        $getGlobalVar[author]
        $color[$getGlobalVar[defaultColor]]
      ]
      
    ]
    $deleteUserVar[allRareAttemptsInfo]
    ${removeAllProgress()}
    $setUserVar[userPlayData;$env[playData]]
  `
}]

// System functions

function luckGenerator () {
  return `
    $jsonLoad[allRareAttemptsInfo;{}]
    $jsonLoad[allAttemptsList;{}]
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
        "whiteGiraffe|undefined|whiteGiraffe|whiteGiraffeFamily",
        "yeti|yeti|aquaYeti",
        "shopBigfoot|undefined|shopBigfoot",
        "luckBigfoot|undefined|luckBigfoot",
        "shopSnowman|undefined|shopSnowman",
        "luckSnowman|undefined|luckSnowman",
        "shopSnowgirl|undefined|shopSnowgirl",
        "luckSnowgirl|undefined|luckSnowgirl",
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
      ;ri;desc]

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
  return `$!jsonSet[playData;XP;$floor[$math[$env[playData;XP] / 3.5]]]`
}

function setXP () {
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
    ;i;desc]
  `
}

function removeAllProgress() {
  return `
    $callFunction[sumMC;$env[playData;MC]]
    $setUserVar[userProfile;$env[userProfile]]

    $jsonLoad[resetPlayData;$getGlobalVar[userPlayData]]
    $!jsonSet[playData;$env[resetPlayData]]
    $deleteUserVar[opponentAction]
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
        $let[actionDesc;Nobody bites]
      ]

      $case[defend_deceive;
        $if[$get[actionR]>=40;
          $let[actionDesc;You unsuccessfully defended yourself and opponent bit you]
          $let[oppBitesToAdd;1]
        ;$if[$get[actionR]>=25;
          $let[actionDesc;You successfully defended yourself from his deceive and you bit him]
          $let[bitesToAdd;1]
        ;
          $let[actionDesc;You successfully defended yourself from his deceive, but nobody bites]
        ]]
      ]

      $case[deceive_attack;
        $if[$get[actionR]>=40;
          $let[actionDesc;You unsuccessfully deceived your opponent and he bit you]
          $let[oppBitesToAdd;1]
        ;$if[$get[actionR]>=25;
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
    $addButton[respawn-$authorID-play;Respawn;Success]
  `
}

function arenaActionButtons (showDeceiveButton = false) {
  return `
    $addActionRow
    $addButton[attack-$authorID-play-$get[opponentTier]-$get[apex];Attack;Success;🗡️]
    $addButton[defend-$authorID-play-$get[opponentTier]-$get[apex];Defend;Success;🛡️]
    $if[${showDeceiveButton};
      $addButton[deceive-$authorID-play-$get[opponentTier]-$get[apex];Deceive;Success;🎭]
    ]
  `
}

function exitButton(showCheat = true) {
  return `
    $addActionRow
    $addButton[quit-$authorID;Quit game;Danger;🔚]

    $if[$and[${showCheat};$env[playData;isDead]!=true;$env[userProfile;testerMode]];
      $addActionRow
      $addButton[up-$authorID-play;;Success;🔼]
      $addButton[update-$authorID-play;;Success;🔃]
      $addButton[down-$authorID-play;;Success;🔽]
    ]
  `
}

function animalsButtonsGenerator() {
  return `
    $let[buttonsQ;0]
    $let[emojisInDescription;]

    $loop[$arrayLength[animalsKeys];
      $jsonLoad[allRareAttemptsInfo;$getUserVar[allRareAttemptsInfo]]
      $jsonLoad[ARAIkeys;$jsonKeys[allRareAttemptsInfo]]

      $let[i;$math[$env[i] - 1]]
      $let[animal;$env[animalsKeys;$get[i]]]
      $let[animalTier;$env[animals;$get[animal];tier]]
      $let[butStyle;Secondary]

      $if[$get[animalTier]!=$env[playData;tier];
        $continue
      ]
      $if[$get[animalTier]>$env[playData;tier];
        $break
      ]

      $if[$arrayIncludes[ARAIkeys;$get[animal]];
        $jsonLoad[attemptsArr;$env[allRareAttemptsInfo;$get[animal];attempts]]
        $let[index;$env[allRareAttemptsInfo;$get[animal];index]]
        $let[maxIndex;$env[allRareAttemptsInfo;$get[animal];maxIndex]]

        $if[$get[index]==$get[maxIndex];
          $log[pass]
          $arrayShuffle[attemptsArr]
          $!jsonSet[allRareAttemptsInfo;$get[animal];attempts;$env[attemptsArr]]
          $!jsonSet[allRareAttemptsInfo;$get[animal];index;0]
          $let[index;$env[allRareAttemptsInfo;$get[animal];index]]
        ]

        $let[chosenAnimal;$env[attemptsArr;$get[index]]]

        $letSum[index;1]
        $!jsonSet[allRareAttemptsInfo;$get[animal];index;$get[index]]

        $setUserVar[allRareAttemptsInfo;$env[allRareAttemptsInfo]]
        
        $if[$get[chosenAnimal]==undefined;
          $continue
        ]

        $if[$or[$includes[$get[animal];markhor;whiteGiraffe;Bigfoot;Snowman;Snowgirl];$get[animal]!=$get[chosenAnimal]];
          $let[butStyle;Success]
        ]
        $let[animal;$get[chosenAnimal]]
      ;
        $if[$env[animals;$get[animal];isRare];
          $continue
        ]
      ]
      ${varsForButtonGen()}
    ;i;desc]
  `
}



function varsForButtonGen () {
  return `
    $let[emoji;$env[animals;$get[animal];variants;$env[userProfile;userWardrobe;$get[animal]];emoji]]
    $let[animalName;$env[animals;$get[animal];variants;$env[userProfile;userWardrobe;$get[animal]];name]]
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
    $let[failSearchFoodChance;3]
    $let[searchFoodR;$randomNumber[1;101]]

    $addActionRow
    $addStringSelectMenu[actions-$authorID-play;Choose an action:]

    $if[$and[$env[playData;tier]==17;$get[hasAllApex]];
      $addOption[Upgrade;;kingDragonUpg-$authorID-play;⬆️]
    ]

    $if[$and[$env[playData;XP]>=$env[XPreq;$env[playData;tier];1];$env[playData;tier]!=17];
      $addOption[Upgrade;;upgrade-$authorID-play;⬆️]
    ;
      $if[$get[failSearchFoodChance]>$get[searchFoodR];
        $addOption[Search for XP;;failSearchXP-$authorID-play;🍴]
      ;
        $addOption[Search for XP;;searchXP-$authorID-play;🍴]
      ]
    ]

    $if[$env[playData;tier]>=15;
      $addOption[Arena;;arena-$authorID-play;⚔️]
    ]
    $addOption[Downgrade;;downgrade-$authorID-play;⬇️]

    $addActionRow
    $addStringSelectMenu[moveto-$authorID-play;Switch biome]

    $if[$get[curBiome]!=Land;
      $addOption[Land;;moveto_Land-$authorID-play;⛰️]
    ]
    $if[$and[$get[curBiome]!=Desert;$get[curBiome]!=Arctic;$get[curBiome]!=Volcano];
      $addOption[Desert;;moveto_Desert-$authorID-play;🏜️]
    ]
    $if[$and[$get[curBiome]!=Volcano;$get[curBiome]!=Ocean;$get[curBiome]!=Desert;$get[curBiome]!=Arctic;$get[curBiome]!=Forest];
      $addOption[Volcano;;moveto_Volcano-$authorID-play;🌋]
    ]
    $if[$and[$get[curBiome]!=Ocean;$get[curBiome]!=Volcano];
      $addOption[Ocean;;moveto_Ocean-$authorID-play;🌊]
    ]
    $if[$and[$get[curBiome]!=Desert;$get[curBiome]!=Arctic;$get[curBiome]!=Volcano];
      $addOption[Arctic;;moveto_Arctic-$authorID-play;❄️]
    ]
    $if[$and[$get[curBiome]!=Forest;$get[curBiome]!=Volcano];
      $addOption[Forest;;moveto_Forest-$authorID-play;🌲]
    ]

  `
}

// Helper functions

function animalStats() {
  return `-# $env[playData;currentAnimal] • $abbreviateNumber[$env[playData;XP]]XP • $env[playData;MC]$getGlobalVar[emoji]`
}

function animalEmoji (animal, v = 0) {
  return `$env[animals;${animal};variants;${v};emoji]`
}

function currentApexes () {
  return `
    $let[currentApexes;# $trimLines[Apexes:\n# $replace[
        $if[$env[playData;apex;dragon];         ${animalEmoji('dragon')};         <:DragonS1Dark:1327711395860451461>]
        $if[$env[playData;apex;trex];           ${animalEmoji('trex')};           <:TRexS1Dark:1327711207414566962>]
        $if[$env[playData;apex;phoenix];        ${animalEmoji('phoenix')};        <:PhoenixS1Dark:1327711260560851134>]
        $if[$env[playData;apex;pterodactyl];    ${animalEmoji('pterodactyl')};    <:PteroS1Dark:1327711247055065098>]
        $if[$env[playData;apex;kraken];         ${animalEmoji('kraken')};         <:KrakenS1Dark:1327711355024703540>]
        $if[$env[playData;apex;kingCrab];       ${animalEmoji('kingCrab')};       <:KingCrabS1Dark:1327711368316583976>]
        $if[$env[playData;apex;yeti];           ${animalEmoji('yeti')};           <:YetiS1Dark:1327711197025407088>]
        $if[$env[playData;apex;landMonster];    ${animalEmoji('landMonster')};    <:LandS1Dark:1327711335944945735>]
        $if[$env[playData;apex;dinoMonster];    ${animalEmoji('dinoMonster')};    <:DinoS1Dark:1327711412411170876>]
        $if[$env[playData;apex;giantScorpion];  ${animalEmoji('giantScorpion')};  <:ScorpS1Dark:1327711231737466981>]
        $if[$env[playData;apex;seaMonster];     ${animalEmoji('seaMonster')};     <:SeaS1Dark:1327711219318001674>]
        $if[$env[playData;apex;iceMonster];     ${animalEmoji('iceMonster')};     <:IceS1Dark:1327711379964297316>]
        $if[$env[playData;apex;blackDragon];    ${animalEmoji('blackDragon')};    <:BDragS1Dark:1327711428324364461>]
      ;\n;]
    ]]
  `
}

function hasAllApex () {
  return `
    $jsonLoad[apex;$env[playData;apex]]
    $let[hasAllApex;$and[$env[apex;dragon];$env[apex;trex];$env[apex;phoenix];$env[apex;pterodactyl];$env[apex;kingCrab];$env[apex;yeti];$env[apex;landMonster];$env[apex;dinoMonster];$env[apex;giantScorpion];$env[apex;seaMonster];$env[apex;iceMonster];$env[apex;blackDragon]]]
  `
}

function hasStarted () {
  return `
    $onlyIf[$and[$env[playData;started];$env[playData;MessageID]==$messageID;$env[playData;ChannelID]==$channelID]]
  `
}