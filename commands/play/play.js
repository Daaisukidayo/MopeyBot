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
      $getEmbeds[$env[userProfile;play;playChannelID];$env[userProfile;play;playMessageID]]
    ;
      ${removeAllProgress()}
      $setUserVar[userProfile;$env[userProfile]]
    ]
    
    $onlyIf[$env[userProfile;play;playStarted]==false;
      $description[## You already have an active game session!
      ### $hyperlink[Please end your previous game!;https://discord.com/channels/$env[userProfile;play;playGuildID]/$env[userProfile;play;playChannelID]/$env[userProfile;play;playMessageID]]]
      $getGlobalVar[author]
      $color[$getGlobalVar[errorColor]]
      $addActionRow
      $addButton[messagemissing-$authorID;Can't find the game;Danger]
    ]


    ${jsonLoader()}
    $!jsonSet[userProfile;play;playTier;1]
    ${animalsButtonsGenerator()}
    ${exitButton()}

    $description[## Choose which animal to spawn as:\n# $get[emojisInDescription]]
    $getGlobalVar[author]
    $footer[Beta version: 2.0]

    $let[msgID;$sendMessage[$channelID;;true]]

    $!jsonSet[userProfile;play;playMessageID;$get[msgID]]
    $!jsonSet[userProfile;play;playChannelID;$channelID]
    $!jsonSet[userProfile;play;playGuildID;$guildID]
    $!jsonSet[userProfile;play;playStarted;true]
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
    $let[animalName;$env[animals;$get[animal];variants;$get[wardrobeIndex];name]]

    $!jsonSet[userProfile;play;playMC;$math[$get[bonus] + $env[userProfile;play;playMC]]]

    $thumbnail[$get[thumbnail]]
    $color[$get[color]]
    $description[## You upgraded to __$get[animalName]__!\n-# $env[userProfile;play;playMC]]
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
    $onlyIf[$splitText[2]==upgrade]
    ${jsonLoader()}
    ${hasStarted()}
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

    $onlyif[$env[userProfile;play;playStarted];
      $description[## You don't have an active game session!]
      $getGlobalVar[author]
      $color[$getGlobalVar[errorColor]]
      $!editMessage[$channelID;$messageID]
    ]

    $disableConsoleErrors

    $if[$splitText[0]==messagemissing;

      $!editMessage[$channelID;$messageID;
        $description[## You have been successfully disconnected from the game!\n-# Earned: $separatenumber[$env[userProfile;play;playMC];,]$getGlobalVar[emoji]]
        $getGlobalVar[author]
        $color[$getGlobalVar[defaultColor]]
      ]

      $try[
        $!disableButtonsOf[$env[userProfile;play;playChannelID];$env[userProfile;play;playMessageID]]
      ]

      ${removeAllProgress()}
    ]
    
    $if[$and[$env[userProfile;play;playMessageID]==$messageID;$splitText[0]==quit];

      $!editMessage[$channelID;$messageID;
        $description[## You have been successfully exited the game!\n-# Earned: $separatenumber[$env[userProfile;play;playMC];,]$getGlobalVar[emoji]]
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
    $onlyIf[$and[$env[userProfile;play;playStarted];$env[userProfile;play;playMessageID]==$messageID;$env[userProfile;play;playChannelID]==$channelID]]
  `
}

function removeAllProgress() {
  return `
    $callFunction[sumMC;$env[userProfile;play;playMC]]
    $!jsonSet[userProfile;play;playColor; ]
    $!jsonSet[userProfile;play;playArenaTurn;0]
    $!jsonSet[userProfile;play;playXP;0]
    $!jsonSet[userProfile;play;playBitesInArena;0]
    $!jsonSet[userProfile;play;playOpponentBitesInArena;0]
    $!jsonSet[userProfile;play;playMC;0]
    $!jsonSet[userProfile;play;playStarted;false]
    $!jsonSet[userProfile;play;playTier;0]
    $!jsonSet[userProfile;play;playMessageID; ]
    $!jsonSet[userProfile;play;playChannelID; ]
    $!jsonSet[userProfile;play;playGuildID; ]
    $!jsonSet[userProfile;play;playOpponentAnimal; ]
    $!jsonSet[userProfile;play;playCurrentAnimal; ]
    $!jsonSet[userProfile;play;playIsDead;false]
    ${removeAllApex()}
  `
}

function removeAllApex () {
  return `
    $!jsonSet[userProfile;play;apexes;hasDragApex;false]
    $!jsonSet[userProfile;play;apexes;hasTrexApex;false]
    $!jsonSet[userProfile;play;apexes;hasPhixApex;false]
    $!jsonSet[userProfile;play;apexes;hasPteroApex;false]
    $!jsonSet[userProfile;play;apexes;hasKrakApex;false]
    $!jsonSet[userProfile;play;apexes;hasKcrabApex;false]
    $!jsonSet[userProfile;play;apexes;hasYetiApex;false]
    $!jsonSet[userProfile;play;apexes;hasLandApex;false]
    $!jsonSet[userProfile;play;apexes;hasDinoApex;false]
    $!jsonSet[userProfile;play;apexes;hasScorpApex;false]
    $!jsonSet[userProfile;play;apexes;hasSeaApex;false]
    $!jsonSet[userProfile;play;apexes;hasIceApex;false]
    $!jsonSet[userProfile;play;apexes;hasBDApex;false]
  `
}

function exitButton() {
  return `
    $addActionRow
    $addButton[quit-$authorID;Quit game;Danger;🔚]

    $if[$env[userProfile;testerMode];
      $addActionRow
      $addButton[up-$authorID;;Success;🔼]
      $addButton[update-$authorID;;Success;🔃]
      $addButton[down-$authorID;;Success;🔽]

      $addActionRow
      $addButton[rarehack-$authorID;Rarehack: $advancedReplace[$env[userProfile;play;rarehackEnabled];true;on;false;off];Secondary]
    ]
  `
}

function animalsButtonsGenerator() {
  return `
    $let[buttonsQuantity;0]
    $let[emojisInDescription;]

    $arrayForEach[animalsKeys;animal;
      $if[$env[animals;$env[animal];tier]==$env[userProfile;play;playTier];
          
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
    $if[$env[userProfile;play;playXP]>=$env[XPreq;$env[userProfile;play;playTier];1];
      $addOption[Upgrade yourself;Upgrade;upgrade-$authorID-play;⬆️]
    ]
    $if[$env[userProfile;play;playTier]>=17; 		
      $addOption[Hunt everyone;Hunt;hunt-$authorID-play;🗡️]
    ]
    $if[$env[userProfile;play;playTier]>=15;
      $addOption[Go to arena;Arena;arena-$authorID-play;⚔️]
    ]
    $if[$env[userProfile;play;playTier]>=12;
      $addOption[Hunt rares;Rarehunt;rarehunt-$authorID-play;🔪]
    ]
    $addOption[Search for food;Search food;searchFood-$authorID-play;🍴]
    $addOption[Downgrade yourself;Downgrade;downgrade-$authorID-play;⬇️]
    
  `
}