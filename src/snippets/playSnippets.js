import universalSnippets from "./universalSnippets.js";

export default {
  setNewXPOnDeath() {
    return `
      $if[$and[$env[playData;tier]==17;$get[hasAllApex]];
        $!jsonSet[playData;XP;0]
      ;
        $!jsonSet[playData;XP;$floor[$math[$env[playData;XP] / 2.7]]]
      ]
    `;
  },

  removeAllApex() {
    return `
      $arrayCreate[empty]
      $!jsonSet[playData;apex;$env[empty]]
    `;
  },

  animalStats() {
    return `-# $env[animals;$env[animalsIndexes;$env[playData;currentAnimal]];variants;$env[userWardrobe;$env[playData;currentAnimal]];emoji] • $abbreviateNumber[$env[playData;XP]]XP • $env[playData;MC]$getGlobalVar[emoji]`;
  },

  hasStarted() {
    return `$onlyIf[$and[$env[playData;started];$env[playData;MessageID]==$messageID;$env[playData;ChannelID]==$channelID]]`;
  },

  rareReward() {
    return JSON.stringify({
      whiteDove: 500,
      stinkyPig: 13150,
      pinkyPig: 500,
      goldenPheasant: 1000,
      marshDeer: 5000,
      doe: 250,
      muskDeer: 15750,
      jackass: 3750,
      rareMacaw: 165000,
      blueMacaw: 500,
      girabie: 2650,
      momaffieFamily: 1000,
      momaffie: 500,
      rareToucan: 165000,
      lavaToucan: 13150,
      fieryToucan: 500,
      keelBilledToucan: 240,
      chocoToucan: 50,
      blackPanther: 13150,
      leopard: 3200,
      jaguar: 2650,
      demonPufferfish: 10500,
      yellowPufferfish: 300,
      blackTiger: 13120,
      whiteTiger: 750,
      blackBear: 1250,
      blackLion: 55000,
      whiteLion: 10500,
      blackManedLion: 3750,
      blackLioness: 55000,
      whiteLioness: 10500,
      lioness: 500,
      blackLionCub: 55000,
      whiteLionCub: 10500,
      lionCub: 1000,
      shaheen: 220000,
      predator: 4250,
      rareVulture: 165000,
      bigGoat: 2650,
      markhor: 0,
      blackRhino: 27500,
      whiteRhino: 13150,
      greaterSpottedEagle: 275000,
      harpyEagle: 275000,
      goldenEagle: 9450,
      giraffeFamily: 7350,
      whiteGiraffe: 1750,
      aquaYeti: 1200,
      shopBigfoot: 500,
      shopSnowman: 500,
      shopSnowgirl: 500,
      luckBigfoot: 55000,
      luckSnowman: 55000,
      luckSnowgirl: 110000,
      ingDragon: 55000
    });
  },

  setNewTier() {
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
    `;
  },

  removeAllProgress() {
    return `
      $callFunction[sumMC;$env[playData;MC]]
      $setUserVar[userProfile;$env[userProfile]]

      $deleteUserVar[allRareAttemptsInfo]
      $deleteUserVar[userPlayData]
    `;
  },

  XPReqForUpg() {
    return JSON.stringify({
      "1": [0, 150],
      "2": [150, 400],
      "3": [400, 1000],
      "4": [1000, 2000],
      "5": [2000, 5000],
      "6": [5000, 12000],
      "7": [12000, 25000],
      "8": [25000, 40000],
      "9": [40000, 60000],
      "10": [60000, 90000],
      "11": [90000, 145000],
      "12": [145000, 350000],
      "13": [350000, 650000],
      "14": [650000, 1000000],
      "15": [1000000, 5000000],
      "16": [5000000, 10000000],
      "17": [10000000, 40000000]
    }).replaceAll(']', '\\]')
  },

  loadJSON() {
    return `
      ${universalSnippets.loadProfile()}
      $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]
      $jsonLoad[animals;$readFile[src/json/animals.json]]
      $jsonLoad[animalsIndexes;$getGlobalVar[animalsIndexes]]
      $jsonLoad[playData;$getUserVar[userPlayData]]
      $jsonLoad[currentApex;$env[playData;apex]]
      $jsonLoad[biomeColors;$getGlobalVar[biomeColors]]
      $jsonLoad[XPreq;${this.XPReqForUpg()}]
    `;
  },

  resetArena() {
    return `
      $!jsonSet[playData;arenaTurn;0]
      $!jsonSet[playData;opponentAnimal;]
      $!jsonSet[playData;bitesInArena;0]
      $!jsonSet[playData;opponentBitesInArena;0]
      $!jsonSet[playData;opponentAction;]
      $!jsonSet[playData;opponentTier;]
      $!jsonSet[playData;opponentApex;]
    `;
  },

  arenaRejectContent() {
    return JSON.stringify([
      "No takers?",
      "Seems like everyone's allergic to danger.",
      "Nobody wants to 1v1 you.",
      "Nobody? Seriously?",
      "No one? Really?",
      "Another 1v1 declined.",
      "You scared them all off… again.",
      "You didn't find anyone to battle.",
      "Seems like you're destined to battle… your loneliness.",
      "Nobody showed up.",
      "They saw your name and ran.",
      "Seems like everyone is scared of you because nobody wants to 1v1 you."
    ]).replaceAll(']', '\\]')
  },

  respawnButton() {
    return `
      $addActionRow
      $addButton[respawn-play-$authorID;Respawn;Success]
    `;
  },

  arenaActionButtons(showDeceiveButton = false) {
    return `
      $addActionRow
      $addButton[attack-arenaAction-$authorID;Attack;Success;🗡️]
      $addButton[defend-arenaAction-$authorID;Defend;Success;🛡️]
      ${showDeceiveButton
        ? "$addButton[deceive-arenaAction-$authorID;Deceive;Success;🎭]"
        : ""
      }
    `;
  },

  exitButton(showCheat = true) {
    return `
      $addActionRow
      $addButton[quit-play-$authorID;Quit game;Danger;🔚]

      $if[$and[${showCheat};$env[playData;isDead]!=true;$env[userProfile;testerMode]];
        $addActionRow
        $addButton[devUpArrow-play-$authorID;;Success;🔼]
        $addButton[devUpdateArrow-play-$authorID;;Success;🔃]
        $addButton[devDownArrow-play-$authorID;;Success;🔽]
      ]
    `;
  },

  animalsButtonsGenerator() {
    return `
      $let[buttonsQ;0]
      $let[emojisInDescription;]
      $jsonLoad[buttonStyle;$getGlobalVar[buttonStyle]]
      $loop[$arrayLength[animals];
        $let[i;$math[$env[i] - 1]]
        $let[animalID;$env[animals;$get[i];ID]]
        $let[animalTier;$env[animals;$get[i];tier]]

        $if[$get[animalTier]>$env[playData;tier];$break]
        $if[$get[animalTier]!=$env[playData;tier];$continue]
        $if[$get[animalID]==kingDragon;$break]

        $jsonLoad[allRareAttemptsInfo;$getUserVar[allRareAttemptsInfo]]
        $jsonLoad[ARAIkeys;$jsonKeys[allRareAttemptsInfo]]

        $if[$arrayIncludes[ARAIkeys;$get[animalID]];
          $jsonLoad[attemptsArr;$env[allRareAttemptsInfo;$get[animalID]]]
          $let[chosenAnimal;$arrayRandomValue[attemptsArr]]
          
          $if[$get[chosenAnimal]==undefined;$continue]
          $let[animalID;$get[chosenAnimal]]
        ;
          $if[$env[animals;$env[animalsIndexes;$get[animalID]];isRare];$continue]
        ]

        $let[buttonIndex;$arrayFindIndex[buttonStyle;arr;$jsonLoad[list;$env[arr;1]] $return[$arrayincludes[list;$get[animalID]]]]]
        $let[butStyle;$default[$env[buttonStyle;$get[buttonIndex];0];Secondary]]

        $let[wr;$env[userWardrobe;$get[animalID]]]
        $let[emoji;$env[animals;$env[animalsIndexes;$get[animalID]];variants;$get[wr];emoji]]
        $let[animalName;$env[animals;$env[animalsIndexes;$get[animalID]];variants;$get[wr];name]]
        $let[trig;$env[animals;$env[animalsIndexes;$get[animalID]];ID]-upgrade-animal-play-$authorID]
        $let[emojisInDescription;$get[emojisInDescription]$get[emoji]]
        
        $if[$math[$get[buttonsQ]%5]==0;$addActionRow]
        $addButton[$get[trig];$get[animalName];$get[butStyle];$get[emoji]]
        $letSum[buttonsQ;1]
      ;i;true]
    `;
  },

  actionMenu() {
    return `
      $let[curBiome;$env[playData;currentBiome]]

      $addActionRow
      $addStringSelectMenu[actions-play-$authorID;Actions]

      $if[$and[$env[playData;tier]==17;$get[hasAllApex];$includes[$env[playData;currentAnimal];kingDragon;rareKingDragon]==false];
        $addOption[Upgrade;;kingDragonUpg;⬆️]
        $let[hideSwitchBiome;true]
      ;

        $if[$and[$env[playData;XP]>=$env[XPreq;$env[playData;tier];1];$env[playData;tier]!=17];
          $addOption[Upgrade;;upgrade;⬆️]
          $let[hideSwitchBiome;true]
        ;
          $addOption[Search for XP;;searchXP;🍴]
          $if[$env[playData;tier]>=15;$addOption[Arena;;arena;⚔️]]
        ]

        $addOption[Downgrade;;downgrade;⬇️]
      ]

      $if[$get[hideSwitchBiome];;
        $addActionRow
        $addStringSelectMenu[moveTo-play-$authorID;Switch biome]

        $if[$get[curBiome]!=Land;$addOption[Land;;Land;⛰️]]
        $if[$and[$get[curBiome]!=Desert;$get[curBiome]!=Arctic;$get[curBiome]!=Volcano];$addOption[Desert;;Desert;🏜️]]
        $if[$and[$get[curBiome]!=Volcano;$get[curBiome]!=Ocean;$get[curBiome]!=Desert;$get[curBiome]!=Arctic;$get[curBiome]!=Forest];$addOption[Volcano;;Volcano;🌋]]
        $if[$and[$get[curBiome]!=Ocean;$get[curBiome]!=Volcano];$addOption[Ocean;;Ocean;🌊]]
        $if[$and[$get[curBiome]!=Desert;$get[curBiome]!=Arctic;$get[curBiome]!=Volcano];$addOption[Arctic;;Arctic;❄️]]
        $if[$and[$get[curBiome]!=Forest;$get[curBiome]!=Volcano];$addOption[Forest;;Forest;🌲]]
      ]
    `;
  },

  hasAllApex() {
    return `
      $arrayLoad[allApex;,;dragon,trex,phoenix,pterodactyl,kingCrab,yeti,landMonster,dinoMonster,giantScorpion,seaMonster,iceMonster,blackDragon]
      $jsonLoad[darkApexEmojis;$getGlobalVar[darkApexEmojis]]
      $let[hasAllApex;$arrayEvery[allApex;apex;$arrayIncludes[currentApex;$env[apex]]]]

      $arrayMap[allApex;apex;
        $if[$arrayIncludes[currentApex;$env[apex]];
          $let[emoji;$env[animals;$env[animalsIndexes;$env[apex]];variants;0;emoji]]
        ;
          $let[emoji;$env[darkApexEmojis;$env[apex]]]
        ]
        $return[$get[emoji]]
      ;totalApex]

      $let[currentApexes;# $arrayJoin[totalApex; ]]
    `;
  },
};
