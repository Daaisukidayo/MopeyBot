module.exports = [{
  name: "play", 
  type: "messageCreate", 
  code: `
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $onlyIf[$guildID!=;## You can't start the game in DMs!]
    $onlyIf[$env[userProfile;testerMode]]

    $disableConsoleErrors
    
    $try[
      $getEmbeds[$getUserVar[playChannelID];$getUserVar[playMessageID]]
    ;
      ${removeAllProgress()}
      $setUserVar[userProfile;$env[userProfile]]
    ]
    
    $onlyIf[$getUserVar[playStarted;$authorID;false]==false;
      $description[## You already have an active game session!
      ### $hyperlink[Please end your previous game!;https://discord.com/channels/$getUserVar[playGuildID]/$getUserVar[playChannelID]/$getUserVar[playMessageID]]]
      $getGlobalVar[author]
      $color[$getGlobalVar[errorColor]]
      $addActionRow
      $addButton[messagemissing-$authorID;Can't find the game;Danger]
    ]

    $jsonLoad[animals;$readFile[json/animals.json]]
    $jsonLoad[animalsKeys;$jsonKeys[animals]]

    $setUserVar[playTier;1]
    $let[buttonsQuantity;0]
    $let[emojisInDescription;]


    $arrayForEach[animalsKeys;animal;
      $if[$env[animals;$env[animal];tier]==$getUserVar[playTier];
          
        $let[emoji;$env[animals;$env[animal];variants;$env[userProfile;userWardrobe;$env[animal]];emoji]]
        $let[animalName;$env[animals;$env[animal];variants;$env[userProfile;userWardrobe;$env[animal]];name]]
        $let[trig;$env[animals;$env[animal];trig]-$authorID-+++]
        $let[emojisInDescription;$get[emojisInDescription]$get[emoji]]
        
        $if[$or[$get[buttonsQuantity]==0;$get[buttonsQuantity]==5];
            $addActionRow
        ]
        $addButton[$get[trig];$get[animalName];Secondary;$get[emoji]]
        $letSum[buttonsQuantity;1]
      ]
    ]

    ${exitButton()}

    $description[## Choose which animal to spawn as:\n# $get[emojisInDescription]]
    $getGlobalVar[author]
    $footer[Beta version: 2.0]

    $let[msgID;$sendMessage[$channelID;;true]]

    $setUserVar[playMessageID;$get[msgID]]
    $setUserVar[playChannelID;$channelID]
    $setUserVar[playGuildID;$guildID]
    $setUserVar[playStarted;true]
    $setUserVar[playMC;0]
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  description: "upgrade",
  code: `
    $textSplit[$customID;-]
    $onlyIf[$splitText[1]==$authorID;$callFunction[notYourBTN]]
    $onlyIf[$splitText[2]==+++]
    $onlyIf[$and[$getUserVar[playStarted];$getUserVar[playMessageID]==$messageID;$getUserVar[playChannelID]==$channelID]]

    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $jsonLoad[animals;$readFile[json/animals.json]]
    $jsonLoad[animalsKeys;$jsonKeys[animals]]
    $jsonLoad[biomeColors;$getGlobalVar[biomeColors]]

    $let[animal;$splitText[0]]
    $onlyIf[$arrayIncludes[animalsKeys;$get[animal]]]

    $let[failUpgChance;5]

    $let[wardrobeIndex;$env[userProfile;userWardrobe;$get[animal]]]
    $let[color;$env[biomeColors;$toLowerCase[$env[animals;$get[animal];biome]]]]
    $let[thumbnail;$env[animals;$get[animal];variants;$get[wardrobeIndex];img]]
    $let[animalName;$env[animals;$get[animal];variants;$get[wardrobeIndex];name]]

    $thumbnail[$get[thumbnail]]
    $color[$get[color]]
    $description[## You upgraded to __$get[animalName]__!
    -# $var[desc2]]
    $getGlobalVar[author]

    $setUserVar[playMC;$get[totalEarnedCoins];$authorID]

    $addActionRow
    $addStringSelectMenu[actions-$authorID;Choose an action:]  	
    $if[$getUserVar[playTier]<15;
      $if[$randomNumber[1;101]>=$get[failUpgradeChance];
        $addOption[Upgrade yourself;Upgrade;upgrade-$authorID;⬆️]
      ;  		
        $addOption[Fake Upgrade yourself;Upgrade;fupgrade-$authorID;⬆️]
      ]
    ]	
    $if[$and[$getUserVar[playTier]==17;$checkContains[$get[animalName];King;Queen]==false]; 		
      $addOption[Hunt everyone;Hunt;hunt-$authorID;🗡️]
    ]
    $if[$getUserVar[playTier]>=15;
      $addOption[Go to arena;Arena;arena-$authorID;⚔️]
    ]    
    $if[$getUserVar[playTier]>=12;
      $addOption[Hunt rares;Rarehunt;rarehunt-$authorID;🔪]
    ] 
    $if[$getUserVar[playTier]!=1;
      $addOption[Downgrade yourself;Downgrade;downgrade-$authorID;⬇️]
    ] 	
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  code: `
    $textSplit[$customID;-]
    $onlyIf[$splitText[1]==$authorID;$callFunction[notYourBTN;]]
    $onlyIf[$or[$splitText[0]==messagemissing;$splitText[0]==quit]]

    $onlyif[$getUserVar[playStarted];
      $description[## You don't have an active game session!]
      $getGlobalVar[author]
      $color[$getGlobalVar[errorColor]]
      $!editMessage[$channelID;$messageID]
    ]

    $disableConsoleErrors

    $if[$splitText[0]==messagemissing;

      $!editMessage[$channelID;$messageID;
        $description[## You have been successfully disconnected from the game!\n-# Earned: $separatenumber[$getUserVar[playMC];,]$getGlobalVar[emoji]]
        $getGlobalVar[author]
        $color[$getGlobalVar[defaultColor]]
      ]

      $try[
        $!disableButtonsOf[$getUserVar[playChannelID];$getUserVar[playMessageID]]
      ]

      ${removeAllProgress()}
    ]
    
    $if[$and[$getUserVar[playMessageID]==$messageID;$splitText[0]==quit];

      $!editMessage[$channelID;$messageID;
        $description[## You have been successfully exited the game!\n-# Earned: $separatenumber[$getUserVar[playMC];,]$getGlobalVar[emoji]]
        $getGlobalVar[author]
        $color[$getGlobalVar[defaultColor]]
      ]
      
      ${removeAllProgress()}
    ]

    $setUserVar[userProfile;$env[userProfile]]
`
}]

// Functions 

function removeAllProgress() {
  return `
    $callFunction[sumMC;$getUserVar[playMC]]
    $deleteUserVar[playColor]
    $deleteUserVar[playArenaTurn]
    $deleteUserVar[playXP]
    $deleteUserVar[playBitesInArena]
    $deleteUserVar[playOpponentBitesInArena]
    $deleteUserVar[playMC]
    $deleteUserVar[playStarted]
    $deleteUserVar[playTier]
    $deleteUserVar[playMessageID]
    $deleteUserVar[playChannelID]
    $deleteUserVar[playGuildID]
    $deleteUserVar[playOpponentAnimal]
    $deleteUserVar[playCurrentAnimal]
    $deleteUserVar[playIsDead]
    ${removeAllApex()}
  `
}

function removeAllApex () {
  return `
    $deleteUserVar[hasDragApex]
    $deleteUserVar[hasTrexApex]
    $deleteUserVar[hasPhixApex]
    $deleteUserVar[hasPteroApex]
    $deleteUserVar[hasKrakApex]
    $deleteUserVar[hasKcrabApex]
    $deleteUserVar[hasYetiApex]
    $deleteUserVar[hasLandApex]
    $deleteUserVar[hasDinoApex]
    $deleteUserVar[hasScorpApex]
    $deleteUserVar[hasSeaApex]
    $deleteUserVar[hasIceApex]
    $deleteUserVar[hasBDApex]
  `
}

function exitButton() {
  return `
    $addActionRow
    $addButton[quit-$authorID;Quit game;Danger;🔚]

    $if[$getUserVar[testerMode];
      $addActionRow
      $addButton[up-$authorID;;Success;🔼]
      $addButton[update-$authorID;;Success;🔃]
      $addButton[down-$authorID;;Success;🔽]

      $addActionRow
      $addButton[rarehack-$authorID;Rarehack: $advancedReplace[$getUserVar[rarehackEnabled;$authorID;false];true;on;false;off];Secondary]
    ]
  `
}