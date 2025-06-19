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

    $disableConsoleErrors
    
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
    $textSplit[$customID;-]
    $onlyIf[$splitText[1]==$authorID;$callFunction[notYourBTN]]
    $onlyIf[$splitText[2]==upgrade]
    ${jsonLoader()}
    ${hasStarted()}


    $let[animal;$splitText[0]]
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
    $!jsonSet[userProfile;play;biome;$get[biome]]

    $thumbnail[$get[thumbnail]]
    $color[$get[color]]
    $description[## You upgraded to __$get[emoji] $get[animalName]__!\n-# $separateNumber[$env[userProfile;play;MC];,]$getGlobalVar[emoji]]
    $getGlobalVar[author]

    $setUserVar[userProfile;$env[userProfile]]

    ${actionMenu()}
    ${exitButton()}
    $deferUpdate
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu", "button"],
  description: "choose upgrade",
  code: `
    $let[IDS;$if[$isButton;$customID;$selectMenuValues]]
    $onlyIf[$includes[$get[IDS];up-;down-;update-;upgrade-;downgrade-]]
    $onlyIf[$includes[$get[IDS];$authorID];$callFunction[notYourBTN]]
    $deferUpdate

    ${jsonLoader()}
    
    $if[$includes[$get[IDS];upgrade-;up-];
      $!jsonSet[userProfile;play;tier;$math[$env[userProfile;play;tier] + 1]]
      $if[$env[userProfile;play;tier]>17;
        $!jsonSet[userProfile;play;tier;1]
      ]
    ]
    $if[$includes[$get[IDS];downgrade-;down-];
      $!jsonSet[userProfile;play;tier;$math[$env[userProfile;play;tier] - 1]]
      $if[$env[userProfile;play;tier]<1;
        $!jsonSet[userProfile;play;tier;17]
      ]
    ]
    $if[$includes[$get[IDS];up-;down-];
      $!jsonSet[userProfile;play;XP;$env[XPreq;$env[userProfile;play;tier];0]]
    ]

    ${animalsButtonsGenerator()}
    ${exitButton()}

    $description[## Choose which animal to spawn as:\n# $get[emojisInDescription]]
    $getGlobalVar[author]
    $color[$env[userProfile;play;color]]
    $!editMessage[$channelID;$messageID]
    $setUserVar[userProfile;$env[userProfile]]
    
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu"],
  description: "search food",
  code: `
    $textSplit[$selectMenuValues;-]
    $onlyIf[$splitText[1]==$authorID;$callFunction[notYourBTN]]
    $onlyIf[$splitText[0]==searchFood]
    ${jsonLoader()}
    ${hasStarted()}

    $let[xp;$round[$math[$env[XPreq;$env[userProfile;play;tier];1] / $randomNumber[3;6;true]]]]

    $!jsonSet[userProfile;play;XP;$math[$env[userProfile;play;XP] + $get[xp]]]
    $description[## You ate some food and gained \`$separateNumber[$get[xp];,]\`XP \n-# $env[userProfile;play;currentAnimal] • $separateNumber[$env[userProfile;play;XP];,]XP • $env[userProfile;play;MC]$getGlobalVar[emoji]]
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
    $textSplit[$customID;-]
    $onlyIf[$splitText[1]==$authorID;$callFunction[notYourBTN]]
    $onlyIf[$includes[$splitText[0];messagemissing;quit]]

    ${jsonLoader()}

    $onlyif[$env[userProfile;play;started];
      $description[## You don't have an active game session!]
      $getGlobalVar[author]
      $color[$getGlobalVar[errorColor]]
      $!editMessage[$channelID;$messageID]
    ]

    $disableConsoleErrors

    $if[$splitText[0]==messagemissing;

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
    
    $if[$and[$env[userProfile;play;MessageID]==$messageID;$splitText[0]==quit];

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

function hasStarted () {
  return `
    $onlyIf[$and[$env[userProfile;play;started];$env[userProfile;play;MessageID]==$messageID;$env[userProfile;play;ChannelID]==$channelID]]
  `
}

function removeAllProgress() {
  return `
    $callFunction[sumMC;$env[userProfile;play;MC]]
    $!jsonSet[userProfile;play;color; ]
    $!jsonSet[userProfile;play;arenaTurn;0]
    $!jsonSet[userProfile;play;XP;0]
    $!jsonSet[userProfile;play;bitesInArena;0]
    $!jsonSet[userProfile;play;OpponentBitesInArena;0]
    $!jsonSet[userProfile;play;MC;0]
    $!jsonSet[userProfile;play;started;false]
    $!jsonSet[userProfile;play;tier;0]
    $!jsonSet[userProfile;play;MessageID;]
    $!jsonSet[userProfile;play;ChannelID;]
    $!jsonSet[userProfile;play;GuildID;]
    $!jsonSet[userProfile;play;opponentAnimal;]
    $!jsonSet[userProfile;play;currentAnimal;]
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

    $if[$env[userProfile;testerMode];
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
    $addActionRow
    $addStringSelectMenu[actions-$authorID-play;Choose an action:]
    $if[$env[userProfile;play;XP]>=$env[XPreq;$env[userProfile;play;tier];1];
      $addOption[Upgrade yourself;Upgrade;upgrade-$authorID-play;⬆️]
    ;
      $if[$env[userProfile;play;tier]<15;
        $addOption[Search for food;Search food;searchFood-$authorID-play;🍴]
      ]
    ]
    $if[$env[userProfile;play;tier]>=17; 		
      $addOption[Hunt everyone;Hunt;hunt-$authorID-play;🗡️]
    ]
    $if[$env[userProfile;play;tier]>=15;
      $addOption[Go to arena;Arena;arena-$authorID-play;⚔️]
    ]
    $if[$env[userProfile;play;tier]>=12;
      $addOption[Hunt rares;Rarehunt;rarehunt-$authorID-play;🔪]
    ]
    $addOption[Downgrade yourself;Downgrade;downgrade-$authorID-play;⬇️]
    
  `
}