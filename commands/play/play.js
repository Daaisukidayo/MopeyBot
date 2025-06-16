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
    $footer[Beta version: 2.0]

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
    $description[## You upgraded to __$get[emoji] $get[animalName]__!\n-# $env[userProfile;play;MC]]
    $getGlobalVar[author]

    $setUserVar[userProfile;$env[userProfile]]

    ${actionMenu()}
    ${exitButton()}
    $deferUpdate
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu"],
  description: "ssearch food",
  code: `
    $textSplit[$selectMenuValues;-]
    $onlyIf[$splitText[1]==$authorID;$callFunction[notYourBTN]]
    $onlyIf[$splitText[2]==searchFood]
    ${jsonLoader()}
    ${hasStarted()}

    $!jsonSet[userProfile;play;XP;$math[$env[userProfile;play;XP] + $env[XPreq;$env[userProfile;play;tier]] / $randomNumber[2;4;true]]]
    $description[## You ate some food and gained \`$env[userProfile;play;XP]\`XP]
    $color[$env[userProfile;play;color]]
    ${actionMenu()}
    $deferUpdate
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  description: "exit",
  code: `
    $textSplit[$customID;-]
    $onlyIf[$splitText[1]==$authorID;$callFunction[notYourBTN]]
    $onlyIf[$or[$splitText[0]==messagemissing;$splitText[0]==quit]]

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
      $if[$env[animals;$env[animal];tier]==$env[userProfile;play;tier];
          
        $let[emoji;$env[animals;$env[animal];variants;$env[userProfile;userWardrobe;$env[animal]];emoji]]
        $let[animalName;$env[animals;$env[animal];variants;$env[userProfile;userWardrobe;$env[animal]];name]]
        $let[trig;$env[animals;$env[animal];trig]-$authorID-upgrade]
        $let[emojisInDescription;$get[emojisInDescription]$get[emoji]]
        
        $if[$or[$get[buttonsQuantity]==0;$get[buttonsQuantity]==5;$get[buttonsQuantity]==10];
            $addActionRow
        ]
        $addButton[$get[trig];$get[animalName];Secondary;$get[emoji]]
        $letSum[buttonsQuantity;1]
      ]
    ]
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
      1: [0, 150\\],
      2: [150, 400\\],
      3: [400, 1000\\],
      4: [1000, 2000\\],
      5: [2000, 5000\\],
      6: [5000, 12000\\],
      7: [12000, 25000\\],
      8: [25000, 40000\\],
      9: [40000, 60000\\],
      10: [60000, 90000\\],
      11: [90000, 145000\\],
      12: [145000, 350000\\],
      13: [350000, 650000\\],
      14: [650000, 1000000\\],
      15: [1000000, 5000000\\],
      16: [5000000, 10000000\\],
      17: [10000000, 40000000\\]
    }
  `
}

function actionMenu () {
  return `
    $addActionRow
    $addStringSelectMenu[actions-$authorID-play;Choose an action:]
    $if[$env[userProfile;play;XP]>=$env[XPreq;$env[userProfile;play;tier];1];
      $addOption[Upgrade yourself;Upgrade;upgrade-$authorID-play;⬆️]
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
    $addOption[Search for food;Search food;searchFood-$authorID-play;🍴]
    $addOption[Downgrade yourself;Downgrade;downgrade-$authorID-play;⬇️]
    
  `
}