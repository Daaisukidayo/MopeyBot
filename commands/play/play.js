module.exports = [{
  name: "play", 
  type: "messageCreate",
  description: "first time playing",
  code: `
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $onlyIf[$guildID!=;## You can't start the game in DMs!]
    $onlyIf[$env[userProfile;testerMode]]
    
    $try[
      $getEmbeds[$env[userProfile;play;ChannelID];$env[userProfile;play;MessageID]]
    ;
      ${removeAllProgress()}
      $setUserVar[userProfile;$env[userProfile]]
    ]
    
    $onlyIf[$env[userProfile;play;started]==false;
      $description[## You already have an active game session!
      ### $hyperlink[Please end your previous game!;https://discord.com/channels/$env[userProfile;play;GuildID]/$env[userProfile;play;ChannelID]/$env[userProfile;play;MessageID]]]
      $getGlobalVar[author]
      $color[$getGlobalVar[errorColor]]
      $addActionRow
      $addButton[messagemissing-$authorID;Can't find the game;Danger]
    ]


    ${jsonLoader()}
    $!jsonSet[userProfile;play;tier;1]
    ${animalsButtonsGenerator()}
    ${exitButton()}

    $description[## Choose which animal to spawn as:\n# $get[emojisInDescription]]
    $getGlobalVar[author]

    $let[msgID;$sendMessage[$channelID;;true]]

    $!jsonSet[userProfile;play;MessageID;$get[msgID]]
    $!jsonSet[userProfile;play;ChannelID;$channelID]
    $!jsonSet[userProfile;play;GuildID;$guildID]
    $!jsonSet[userProfile;play;started;true]
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

    $let[animal;$env[btn;0]]
    ${jsonLoader()}
    ${hasStarted()}
    $onlyIf[$arrayIncludes[animalsKeys;$get[animal]]]

    $let[bonus;50]

    $let[wardrobeIndex;$env[userProfile;userWardrobe;$get[animal]]]
    $let[color;$env[biomeColors;$env[animals;$get[animal];biome]]]
    $let[thumbnail;$env[animals;$get[animal];variants;$get[wardrobeIndex];img]]
    $let[emoji;$env[animals;$get[animal];variants;$get[wardrobeIndex];emoji]]
    $let[animalName;$env[animals;$get[animal];variants;$get[wardrobeIndex];name]]
    $let[biome;$env[animals;$get[animal];biome]]

    $!jsonSet[userProfile;play;MC;$math[$get[bonus] + $env[userProfile;play;MC]]]
    $!jsonSet[userProfile;play;currentAnimal;$get[emoji] $get[animalName]]
    $!jsonSet[userProfile;play;color;$get[color]]
    $!jsonSet[userProfile;play;currentBiome;$get[biome]]
    $!jsonSet[userProfile;play;animalBiome;$get[biome]]

    $thumbnail[$get[thumbnail]]
    $color[$get[color]]
    $description[## You upgraded to __$get[emoji] $get[animalName]__!\n-# $separateNumber[$env[userProfile;play;MC];,]$getGlobalVar[emoji]]
    $getGlobalVar[author]

    $setUserVar[userProfile;$env[userProfile]]

    ${actionMenu()}
    ${exitButton()}
    $!editMessage[$channelID;$messageID]
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

    $!jsonSet[userProfile;play;isDead;false]
    
    $if[$includes["$env[btn;0]";"upgrade";"up"];
      $!jsonSet[userProfile;play;tier;$math[$env[userProfile;play;tier] + 1]]
      $if[$env[userProfile;play;tier]>17;
        $!jsonSet[userProfile;play;tier;1]
      ]
    ]
    $if[$includes["$env[btn;0]";"down"];
      $!jsonSet[userProfile;play;tier;$math[$env[userProfile;play;tier] - 1]]
      $if[$env[userProfile;play;tier]<1;
        $!jsonSet[userProfile;play;tier;17]
      ]
    ]
    $if[$includes["$env[btn;0]";"up";"down"];
      $!jsonSet[userProfile;play;XP;$env[XPreq;$env[userProfile;play;tier];0]]
    ]

    ${animalsButtonsGenerator()}
    ${exitButton()}

    $description[## Choose which animal to spawn as:\n# $get[emojisInDescription]]
    $getGlobalVar[author]
    $color[$env[userProfile;play;color]]
    $!editMessage[$channelID;$messageID]
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
    ${hasStarted()}

    $let[xp;$round[$math[$env[XPreq;$env[userProfile;play;tier];1] / $randomNumber[4;9;true]]]]

    $!jsonSet[userProfile;play;XP;$math[$env[userProfile;play;XP] + $get[xp]]]
    $description[## You ate some food and gained \`$separateNumber[$get[xp];,]\`XP \n${animalStats()}]
    $getGlobalVar[author]
    $color[$env[userProfile;play;color]]
    ${actionMenu()}
    ${exitButton()}
    $!editMessage[$channelID;$messageID]
    $setUserVar[userProfile;$env[userProfile]]
    $deferUpdate
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
        $let[desc;## ???]
      ]]]]]]

    ]

    $if[$env[btn;0]==fsearchFood;
      $let[desc;## ???]
    ]

    $!jsonSet[playData;isDead;true]
    $!jsonSet[playData;XP;$floor[$math[$env[playData;XP] / 3]]]

    $let[XP;$env[playData;XP]]

    $loop[17;
      $let[value1;$env[XPreq;$env[i];0]]
      $let[value2;$env[XPreq;$env[i];1]]

      $if[$and[$get[XP]>=$get[value1];$get[XP]<$get[value2]];
        $!jsonSet[playData;tier;$env[i]]
        $break
      ]
    ;i;desc]

    $!jsonSet[userProfile;play;$env[playData]]
    $setUserVar[userProfile;$env[userProfile]]

    $color[$getGlobalVar[errorColor]]
    $getGlobalVar[author]
    $description[$get[desc]]
    
    $addActionRow
    $addButton[respawn-$authorID;Respawn;Success]
    ${exitButton()}

    $!editMessage[$channelID;$messageID]
    $deferUpdate
  `
},{
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu'],
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

    $!jsonSet[userProfile;play;currentBiome;$get[biome]]
    $!jsonSet[userProfile;play;color;$get[color]]

    $description[## Successfully moved to __$get[biome]__!\n${animalStats()}]
    $getGlobalVar[author]
    $color[$env[userProfile;play;color]]
    ${actionMenu()}
    ${exitButton()}
    $!editMessage[$channelID;$messageID]
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

    $onlyif[$env[userProfile;play;started];
      $description[## You don't have an active game session!]
      $getGlobalVar[author]
      $color[$getGlobalVar[errorColor]]
      $!editMessage[$channelID;$messageID]
    ]

    $if[$env[btn;0]==messagemissing;

      $!editMessage[$channelID;$messageID;
        $description[## You have been successfully disconnected from the game!\n-# Earned: $separatenumber[$env[userProfile;play;MC];,]$getGlobalVar[emoji]]
        $getGlobalVar[author]
        $color[$getGlobalVar[defaultColor]]
      ]

      $try[
        $!disableButtonsOf[$env[userProfile;play;ChannelID];$env[userProfile;play;MessageID]]
      ]

      ${removeAllProgress()}
    ]
    
    $if[$and[$env[userProfile;play;MessageID]==$messageID;$env[btn;0]==quit];

      $!editMessage[$channelID;$messageID;
        $description[## You have been successfully exited the game!\n-# Earned: $separatenumber[$env[userProfile;play;MC];,]$getGlobalVar[emoji]]
        $getGlobalVar[author]
        $color[$getGlobalVar[defaultColor]]
      ]
      
      ${removeAllProgress()}
    ]

    $setUserVar[userProfile;$env[userProfile]]
  `
}]

// Functions 

function animalStats() {
  return `-# $env[userProfile;play;currentAnimal] • $separateNumber[$env[userProfile;play;XP];,]XP • $env[userProfile;play;MC]$getGlobalVar[emoji]`
}

function hasAllApex () {
  return `
    $jsonLoad[apex;$env[userProfile;play;apexes]]
    $let[hasAllApex;$and[$env[apex;dragon];$env[apex;trex];$env[apex;phoenix];$env[apex;pterodactyl];$env[apex;kingCrab];$env[apex;yeti];$env[apex;land];$env[apex;dino];$env[apex;scorpion];$env[apex;sea];$env[apex;ice];$env[apex;blackDragon]]]
  `
}

function hasStarted () {
  return `
    $onlyIf[$and[$env[userProfile;play;started];$env[userProfile;play;MessageID]==$messageID;$env[userProfile;play;ChannelID]==$channelID]]
  `
}

function removeAllProgress() {
  return `
    $callFunction[sumMC;$env[userProfile;play;MC]]
    $!jsonSet[userProfile;play;color;]
    $!jsonSet[userProfile;play;arenaTurn;0]
    $!jsonSet[userProfile;play;XP;0]
    $!jsonSet[userProfile;play;bitesInArena;0]
    $!jsonSet[userProfile;play;opponentBitesInArena;0]
    $!jsonSet[userProfile;play;MC;0]
    $!jsonSet[userProfile;play;started;false]
    $!jsonSet[userProfile;play;tier;0]
    $!jsonSet[userProfile;play;MessageID;]
    $!jsonSet[userProfile;play;ChannelID;]
    $!jsonSet[userProfile;play;GuildID;]
    $!jsonSet[userProfile;play;opponentAnimal;]
    $!jsonSet[userProfile;play;currentAnimal;]
    $!jsonSet[userProfile;play;currentBiome;]
    $!jsonSet[userProfile;play;animalBiome;]
    $!jsonSet[userProfile;play;isDead;false]
    ${removeAllApex()}
  `
}

function removeAllApex () {
  return `
    $!jsonSet[userProfile;play;apexes;dragon;false]
    $!jsonSet[userProfile;play;apexes;trex;false]
    $!jsonSet[userProfile;play;apexes;phoenix;false]
    $!jsonSet[userProfile;play;apexes;pterodactyl;false]
    $!jsonSet[userProfile;play;apexes;kraken;false]
    $!jsonSet[userProfile;play;apexes;kingCrab;false]
    $!jsonSet[userProfile;play;apexes;yeti;false]
    $!jsonSet[userProfile;play;apexes;land;false]
    $!jsonSet[userProfile;play;apexes;dino;false]
    $!jsonSet[userProfile;play;apexes;scorpion;false]
    $!jsonSet[userProfile;play;apexes;sea;false]
    $!jsonSet[userProfile;play;apexes;ice;false]
    $!jsonSet[userProfile;play;apexes;blackDragon;false]
  `
}

function exitButton() {
  return `
    $addActionRow
    $addButton[quit-$authorID;Quit game;Danger;🔚]

    $if[$and[$env[userProfile;play;isDead]!=true;$env[userProfile;testerMode]];
      $addActionRow
      $addButton[up-$authorID-play;;Success;🔼]
      $addButton[update-$authorID-play;;Success;🔃]
      $addButton[down-$authorID-play;;Success;🔽]
    ]
  `
}

function animalsButtonsGenerator() {
  return `
    $let[buttonsQuantity;0]
    $let[emojisInDescription;]

    $arrayForEach[animalsKeys;animal;
      $let[animal;$env[animal]]
      $if[$env[animals;$get[animal];tier]==$env[userProfile;play;tier];

        $let[israre;$env[animals;$get[animal];isRare]]
        $let[hasNonRareVariant;$env[animals;$get[animal];hasNonRareVariant]]
        $let[butStyle;Secondary]

        $jsonLoad[rares;$env[animals;$get[animal];rares]]
        $jsonLoad[rares;$arrayReverse[rares]]

        $if[$arrayAt[rares;0]==;;
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

        $if[$get[israre];
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
    
    $if[$math[$get[buttonsQuantity]%5]==0;
        $addActionRow
    ]
    $addButton[$get[trig];$get[animalName];$get[butStyle];$get[emoji]]
    $letSum[buttonsQuantity;1]
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
      "17": [10000000, 40000000\\]
    }
  `
}

function actionMenu () {
  return `
    $jsonLoad[playData;$env[userProfile;play]]
    $let[curBiome;$env[playData;currentBiome]]
    $let[failSFChance;50]
    $let[RN;$randomNumber[1;101]]

    $addActionRow
    $addStringSelectMenu[actions-$authorID-play;Choose an action:]

    $if[$env[playData;XP]>=$env[XPreq;$env[playData;tier];1];
      $addOption[Upgrade;;upgrade-$authorID-play;⬆️]
    ;
      $if[$env[playData;tier]<15;
        $if[$get[failSFChance]>$get[RN];
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