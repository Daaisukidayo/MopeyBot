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

    $jsonLoad[playData;$env[userProfile;play]]

    
    $try[
      $getEmbeds[$env[playData;ChannelID];$env[playData;MessageID]]
    ;
      ${removeAllProgress()}
      $!jsonSet[userProfile;play;$env[playData]]
      $setUserVar[userProfile;$env[userProfile]]
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
    ${animalsButtonsGenerator()}
    ${exitButton()}

    $description[## Choose which animal to spawn as:\n# $get[emojisInDescription]]
    $getGlobalVar[author]

    $let[msgID;$sendMessage[$channelID;;true]]

    $!jsonSet[playData;MessageID;$get[msgID]]
    $!jsonSet[playData;ChannelID;$channelID]
    $!jsonSet[playData;GuildID;$guildID]
    $!jsonSet[playData;started;true]
    $!jsonSet[userProfile;play;$env[playData]]
    $setUserVar[userProfile;$env[userProfile]]
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
    $jsonLoad[playData;$env[userProfile;play]]
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
    $!jsonSet[userProfile;play;$env[playData]]
    $setUserVar[userProfile;$env[userProfile]]
    $deferUpdate
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu", "button"],
  description: "choose upgrade",
  code: `
    $arrayLoad[btn;-;$if[$isButton;$customID;$selectMenuValues]]
    $onlyIf[$includes["$env[btn;0]";"up";"down";"update";"upgrade";"respawn"]]
    $onlyIf[$includes[$env[btn];$authorID];$callFunction[notYourBTN]]

    ${jsonLoader()}
    $jsonLoad[playData;$env[userProfile;play]]
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

    ${animalsButtonsGenerator()}
    ${exitButton()}

    $description[## Choose which animal to spawn as:\n# $get[emojisInDescription]]
    $getGlobalVar[author]
    $color[$env[playData;color]]
    $!editMessage[$channelID;$messageID]
    $!jsonSet[userProfile;play;$env[playData]]
    $setUserVar[userProfile;$env[userProfile]]
    $deferUpdate
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu"],
  description: "search food",
  code: `
    $arrayLoad[btn;-;$selectMenuValues]
    $onlyIf[$includes["$env[btn;0]";"searchFood"]]
    $onlyIf[$includes[$env[btn];$authorID];$callFunction[notYourBTN]]

    ${jsonLoader()}
    $jsonLoad[playData;$env[userProfile;play]]
    ${hasStarted()}

    $let[xp;$round[$math[$env[XPreq;$env[playData;tier];1] / $randomNumber[4;9;true]]]]

    $!jsonSet[playData;XP;$math[$env[playData;XP] + $get[xp]]]
    $description[## You ate some food and gained \`$separateNumber[$get[xp];,]\`XP \n${animalStats()}]
    $getGlobalVar[author]
    $color[$env[playData;color]]
    ${actionMenu()}
    ${exitButton()}
    $!editMessage[$channelID;$messageID]
    $!jsonSet[userProfile;play;$env[playData]]
    $setUserVar[userProfile;$env[userProfile]]
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
    $jsonLoad[playData;$env[userProfile;play]]
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
    $!jsonSet[userProfile;play;$env[playData]]
    $setUserVar[userProfile;$env[userProfile]]
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
    $jsonLoad[playData;$env[userProfile;play]]
    ${hasStarted()}

    $let[playerAction;$env[btn;0]]
    $let[opponentAction;$getUserVar[opponentAction]]
    $let[opponentTier;$env[btn;3]]
    $let[apex;$env[btn;4]]
    $let[actionR;$randomNumber[1;101]]

    $deferUpdate

    $if[$env[playData;arenaTurn]==0;
      $let[opponentAction;$trimLines[
        $if[$get[actionR]<=70;
          $if[$get[playerAction]==attack;defend;$if[$get[playerAction]==defend;deceive;attack]] $c[Counter action]
        ;$if[$get[actionR]<=90; 
          $get[playerAction]  $c[Same action]
        ;
          $if[$get[playerAction]==attack;deceive;$if[$get[playerAction]==defend;attack;defend]] $c[Tie]
        ]]  
      ]]
    ]

    $switch[$get[playerAction]_$get[opponentAction];

      $case[attack_attack;
        $if[$get[actionR]>=67;
          $let[desc;No one get a bite]
        ;$if[$get[actionR]>=33;
          $let[desc;You bit your opponent]
          $let[bitesToAdd;1]
        ;
          $let[desc;Your opponent bit you]
          $let[oppBitesToAdd;1]
        ]]
      ]

      $case[attack_defend;
        $if[$get[actionR]>=40;
          $let[desc;Your opponent defended himself and bit you]
          $let[oppBitesToAdd;1]
        ;$if[$get[actionR]>=25;
          $let[desc;Your opponent defended himself, but nobody bites]
        ;
          $let[desc;Your opponent failed to defend himself and you bit him]
          $let[bitesToAdd;1]
        ]]
      ]

      $case[attack_deceive;
        $if[$get[actionR]>=40;
          $let[desc;You successfully counterattacked his deceive and bit him!]
          $let[bitesToAdd;1]
        ;$if[$get[actionR]>=25;
          $let[desc;Your opponent successfully deceived you, but nobody bites]
        ;
          $let[desc;Your opponent successfully deceived and bit you]
          $let[oppBitesToAdd;1]
        ]]
      ]

      $case[defend_attack;
        $if[$get[actionR]>=30;
          $let[desc;You successfully defended yourself and bit your opponent]
          $let[bitesToAdd;1]
        ;$if[$get[actionR]>=15;
          $let[desc;You successfully defended yourself, but nobody bites]
        ;
          $let[desc;You unsuccessfully defended yourself and your opponent bit you]
          $let[oppBitesToAdd;1]
        ]]
      ]

      $case[defend_defend;
        $let[desc;Nobody bites]
      ]

      $case[defend_deceive;
        $if[$get[actionR]>=40;
          $let[desc;You unsuccessfully defended yourself and opponent bit you]
          $let[oppBitesToAdd;1]
        ;$if[$get[actionR]>=25;
          $let[desc;You successfully defended yourself from his deceive and you bit him]
          $let[bitesToAdd;1]
        ;
          $let[desc;You successfully defended yourself from his deceive, but nobody bites]
        ]]
      ]

      $case[deceive_attack;
        $if[$get[actionR]>=40;
          $let[desc;You unsuccessfully deceived your opponent and he bit you]
          $let[oppBitesToAdd;1]
        ;$if[$get[actionR]>=25;
          $let[desc;You successfully deceived your opponent and bit him]
          $let[bitesToAdd;1]
        ;
          $let[desc;You successfully deceived your opponent, but nobody bites]
        ]]
      ]

      $case[deceive_defend;
        $if[$get[actionR]>=30;
          $let[desc;You successfully deceived your opponent and bit him]
          $let[bitesToAdd;1]
        ;$if[$get[actionR]>=15;
          $let[desc;You successfully deceived your opponent, but nobody bites]
        ;
          $let[desc;You unsuccessfully deceived your opponent and he bit you]
          $let[oppBitesToAdd;1]
        ]]
      ]

      $case[deceive_deceive;
        $if[$get[actionR]>=67;
          $let[desc;No one get a bite]
        ;$if[$get[actionR]>=33;
          $let[desc;You successfully deceived your opponent and bit him]
          $let[bitesToAdd;1]
        ;
          $let[desc;You unsuccessfully deceived your opponent and he bit you]
          $let[oppBitesToAdd;1]
        ]]
      ]
    ]

    $if[$get[bitesToAdd]>0;
      $!jsonSet[playData;bitesInArena;$math[$env[playData;bitesInArena] + $get[bitesToAdd]]]
    ]
    $if[$get[oppBitesToAdd]>0;
      $!jsonSet[playData;opponentBitesInArena;$math[$env[playData;opponentBitesInArena] + $get[oppBitesToAdd]]]
    ]

    $c[? Embeds]

    $description[# You: __$env[playData;currentAnimal] $userDisplayName__
    ### Bites: \`$env[playData;bitesInArena]\`
    # Opponent: __$env[playData;opponentAnimal]__
    ### Bites: \`$env[playData;opponentBitesInArena]\`]
    $description[## You choosed: \`$toTitleCase[$get[playerAction]]\`
    ## Opponent choosed: \`$toTitleCase[$get[opponentAction]]\`;1]

    $if[$env[playData;arenaTurn]==0;
      $let[opponentAction;$randomText[attack;defend;deceive]]
    ]

    $setUserVar[opponentAction;$get[opponentAction]]

    $if[$env[playData;bitesInArena]>=10; $c[If user won]

      $c[? giving extra tier if for example dragon won a bd/kd and got 10 millions xp]

      $switch[$get[opponentTier];
        $case[15; $c[- if player won 15 tier]
          $!jsonSet[playData;XP;$math[$env[playData;XP] + $randomNumber[1000000;3000001]]]
        ]
        $case[16; $c[- if player won 16 tier]
          $!jsonSet[playData;XP;$math[$env[playData;XP] + $randomNumber[3500000;6000000]]]
        ]
        $case[17; $c[- if player won 17 tier]
          $!jsonSet[playData;XP;$math[$env[playData;XP] + $randomNumber[7000000;15000000]]]
        ]
      ]

      ${resetArena()}

      $if[$env[playData;tier]==17;
        $if[$env[playData;apex;$get[apex]];;
          $!jsonSet[playData;apex;$get[apex];true]
        ]
        ${hasAllApex()}
        ${currentApexes()}

        $description[$get[currentApexes];3]
        $color[$getGlobalVar[apexEmbedColor];3]
      ]

      ${arenaEmbedColors('luckyColor')}
      ${actionMenu()}
      ${exitButton()}
      $let[desc;$get[desc]\n## You won!\n${animalStats()}]


    ;$if[$env[playData;opponentBitesInArena]>=10; $c[If opponent won]

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
      ${arenaEmbedColors('errorColor')}

    ;  $c[If still in progress]
      $if[$env[playData;arenaTurn]==1;
        $!jsonSet[playData;arenaTurn;0]
        $addField[Your turn!;Choose:;true;3]
      ; 
        $!jsonSet[playData;arenaTurn;1]
        $addField[Opponent's turn!;He chosed: \`$toTitleCase[$getUserVar[opponentAction]]\`;true;3]
      ]

      ${arenaActionButtons(true)}
      ${exitButton()}

      ${arenaEmbedColors('defaultColor')}
      $color[$getGlobalVar[defaultColor];3]
    ]]

    $description[# $get[desc];2]
    $getGlobalVar[author]
    $!editMessage[$channelID;$messageID]
    $!jsonSet[userProfile;play;$env[playData]]
    $setUserVar[userProfile;$env[userProfile]]
  `
},{
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu'],
  description: 'downgrading',
  code: `
    $arrayLoad[btn;-;$selectMenuValues]
    $onlyIf[$includes["$env[btn;0]";"downgrade";"fsearchFood"]]
    $onlyIf[$includes[$env[btn];$authorID];$callFunction[notYourBTN]]

    ${jsonLoader()}
    ${hasStarted()}
    $!jsonSet[playData;$env[userProfile;play]]

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
        $let[desc;## You chose to downgrade by $randomText[giving yourself to a predator;giving everyone bites]!]

      ;$if[$and[$or[$get[animLandBiome];$get[animArcticBiome];$get[animForestBiome]];$or[$get[isCurrLandBiome];$get[isCurrArcticBiome];$get[isCurrForestBiome]]];
        
        $c[? If animal belongs to Land, Arctic or Forest and current biome is Land, Arctic or Forest]
        $let[desc;## You chose to downgrade by $randomText[giving yourself to a predator;running out of water]!]

      ; 
        $let[desc;## textNotFound|playUnknownDeathDowngradeContent]
      ]]]]]]

    ]

    $if[$env[btn;0]==fsearchFood;
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
    $!jsonSet[userProfile;play;$env[playData]]
    $setUserVar[userProfile;$env[userProfile]]
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
    $jsonLoad[playData;$env[userProfile;play]]
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
    $!jsonSet[userProfile;play;$env[playData]]
    $setUserVar[userProfile;$env[userProfile]]
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
    $jsonLoad[playData;$env[userProfile;play]]
    ${hasStarted()}

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

      ${removeAllProgress()}
    ]
    
    $if[$and[$env[playData;MessageID]==$messageID;$env[btn;0]==quit];

      $!editMessage[$channelID;$messageID;
        $description[## You have been successfully exited the game!\n-# Earned: $separatenumber[$env[playData;MC];,]$getGlobalVar[emoji]]
        $getGlobalVar[author]
        $color[$getGlobalVar[defaultColor]]
      ]
      
      ${removeAllProgress()}
    ]

    $!jsonSet[userProfile;play;$env[playData]]
    $setUserVar[userProfile;$env[userProfile]]
  `
}]

// Functions

function resetArena () {
  return `
    $!jsonSet[playData;arenaTurn;0]
    $!jsonSet[playData;opponentAnimal;]
    $!jsonSet[playData;bitesInArena;0]
    $!jsonSet[playData;opponentBitesInArena;0]
    $deleteUserVar[opponentAction]
  `
}

function arenaEmbedColors (color) {
  return `
    $color[$getGlobalVar[${color}]]
    $color[$getGlobalVar[${color}];1]
    $color[$getGlobalVar[${color}];2]
  `
}

function setNewXPOnDeath () {
  return `$!jsonSet[playData;XP;$floor[$math[$env[playData;XP] / 2.5]]]`
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

function removeAllProgress() {
  return `
    $callFunction[sumMC;$env[playData;MC]]
    $jsonLoad[resetProfile;$getGlobalVar[userProfile]]
    $!jsonSet[playData;$env[resetProfile;play]]
    $deleteUserVar[opponentAction]
  `
}

function removeAllApex () {
  return `
    $jsonLoad[resetProfile;$getGlobalVar[userProfile]]
    $!jsonSet[playData;apex;$env[resetProfile;play;apex]]
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

    $arrayForEach[animalsKeys;animal;
      $let[animal;$env[animal]]
      $if[$env[animals;$get[animal];tier]==$env[playData;tier]; $c[adding animals which are equal to user tier]

        $let[isRare;$env[animals;$get[animal];isRare]]
        $let[hasNonRareVariant;$env[animals;$get[animal];hasNonRareVariant]]
        $let[butStyle;Secondary]

        $jsonLoad[rares;$env[animals;$get[animal];rares]]
        $jsonLoad[rares;$arrayReverse[rares]]

        $if[$arrayAt[rares;0]==;; $c[if animal has rare species]
          $let[raresQ;0]
          $arrayForEach[rares;rare;
            $letSum[raresQ;1]
            $let[i;$sum[$get[raresQ];$arrayIndexOf[animalsKeys;$get[animal]]]]
            $let[rareName;$arrayAt[animalsKeys;$get[i]]]
            $if[$includes[$arrayJoin[rares; ];$get[rareName]];

              $jsonLoad[rarity;$env[animals;$get[rareName];rarity]]

              $let[r;$randomNumber[1;$math[1 + $env[rarity;1]]]]
              $if[$env[rarity;0]>=$get[r];
                $let[animal;$get[rareName]]
                $let[butStyle;Success]
              ]
            ]
          ]
        ]

        $if[$get[isRare]; $c[if animal is a rare]
          $if[$get[hasNonRareVariant];;
            $jsonLoad[rarity;$env[animals;$get[animal];rarity]]
            $let[r;$randomNumber[1;$math[1 + $env[rarity;1]]]]
            $if[$env[rarity;0]>=$get[r];
              $let[butStyle;Success]
              $let[animal;$env[animal]]
              ${varsForButtonGen()}
            ]
          ]
        ;
          ${varsForButtonGen()}
        ]
      ]
    ]
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

function jsonLoader() {
  return `
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $jsonLoad[animals;$readFile[json/animals.json]]
    $jsonLoad[animalsKeys;$jsonKeys[animals]]
    $jsonLoad[biomeColors;$getGlobalVar[biomeColors]]
    $jsonLoad[XPreq;${XPReqForUpg()}]
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
      "17": [10000000, 9223372036854775807\\]
    }
  `
}

function actionMenu () {
  return `
    $if[$env[playData]==;
      $jsonLoad[playData;$env[userProfile;play]]
    ]
    $let[curBiome;$env[playData;currentBiome]]
    $let[failSearchFoodChance;50]
    $let[searchFoodR;$randomNumber[1;101]]

    $addActionRow
    $addStringSelectMenu[actions-$authorID-play;Choose an action:]

    $if[$env[playData;XP]>=$env[XPreq;$env[playData;tier];1];
      $addOption[Upgrade;;upgrade-$authorID-play;⬆️]
    ;
      $if[$env[playData;tier]<15;
        $if[$get[failSearchFoodChance]>$get[searchFoodR];
          $addOption[Search for food;;fsearchFood-$authorID-play;🍴]
        ;
          $addOption[Search for food;;searchFood-$authorID-play;🍴]
        ]
      ]
    ]
    $if[$env[playData;tier]>=17; 		
      $addOption[Hunt everyone;;hunt-$authorID-play;🗡️]
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