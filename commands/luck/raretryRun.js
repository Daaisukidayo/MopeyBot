export default {
  name: 'raretryrun',
  aliases: ['rtr'],
  type: 'messageCreate',
  code: `
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $let[cdTime;10s]
    $callFunction[cooldown;$get[cdTime]]

    $jsonLoad[animals;$readFile[json/animals.json]]
    $jsonLoad[animalsIndexes;$getGlobalVar[animalsIndexes]]
    ${luckGenerator()}
    $jsonLoad[addClover;${addClover()}]
    $jsonLoad[content;${content()}]
    $jsonLoad[rareReward;${raresReward()}]
    $jsonLoad[allRareAttemptsInfoEntries;$jsonEntries[allRareAttemptsInfo]]

    $arrayLoad[desc]
    $let[total;0]

    $arrayForEach[allRareAttemptsInfoEntries;entry;
      $let[animalID;$env[entry;1;attempts;0]]
      $let[animalIndex;$env[animalsIndexes;$get[animalID]]]
      $let[animalName;$env[animals;$get[animalIndex];variants;0;name]]
      $let[animalEmoji;$env[animals;$get[animalIndex];variants;0;emoji]]
      $let[isRare;$env[animals;$get[animalIndex];isRare]]
      $let[rareQuantity;$env[animals;$get[animalIndex];rarity;0]]
      $let[totalAttempts;$env[animals;$get[animalIndex];rarity;1]]
      $let[animalContent;$get[animalEmoji]]
      $let[percent;$round[$math[$get[rareQuantity] / $get[totalAttempts] * 100];3]]
      $let[CL;]


      $if[$and[$get[animalID]!=undefined;$get[isRare]];
        ${addingClover()}

        $let[MC;$default[$env[rareReward;$get[animalID]];0]]

        $arrayPush[desc;## $get[animalContent]$get[CL] | \`$get[rareQuantity]/$get[totalAttempts]\` | +\`$get[MC]\`$getGlobalVar[emoji]]
        $letSum[total;$get[MC]]
      ]
    ]
  
    $if[$arrayLength[desc]==0;
      $arrayPush[desc;## nothing]
    ]

    $callFunction[embed;lucky]
    $description[# $arrayRandomValue[content]\n**$arrayJoin[desc;\n]**\n-# Total: +$get[total]$getGlobalVar[emoji]]
    
    $callFunction[sumMC;$get[total]]
    $setUserVar[userProfile;$env[userProfile]]
  `
}

function addingClover() {
  return `
    $loop[$arrayLength[addClover];
      $let[i;$math[$env[i] - 1]]
      $let[chance;$env[addClover;$get[i];0]]
      $if[$get[chance]>=$get[percent];;$continue]
      $let[CL;$env[addClover;$get[i];1]]
      $break
    ;i;true]
  `
}

function addClover() {
  return `
    [
      [0.025, "🍀🍀🍀🍀🍀"\\],
      [0.035, "🍀🍀🍀🍀"\\],
      [0.1, "🍀🍀🍀"\\],
      [0.5, "🍀🍀"\\],
      [3, "🍀"\\]
    \\]
  `
}

function content() {
  return `
    [
      "You attempted to obtain rares while upgrading from mouse to black dragon, and you received:",
      "You aimed for rares during your evolution from mouse to black dragon, and you got:",
      "You tried to acquire rares as you leveled up from mouse to black dragon, and you received:",
      "While evolving from mouse to black dragon, you sought rares and obtained:",
      "You were hoping for rares while upgrading from mouse to black dragon, and you received:",
      "You attempted to get rares on your journey from mouse to black dragon, and you got:",
      "While progressing from mouse to black dragon,you tried to select rares and got:",
      "You went for rares while evolving from mouse to black dragon, and your result was:"
  \\]
  `
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
        "tiger|tiger|whiteTiger",
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
      $let[tier;$env[animals;$env[animalsIndexes;$get[keyName]];tier]]
      $let[totalAttempts;$env[animals;$env[animalsIndexes;$env[groupParts;2]];rarity;1]]

      $let[totalRare;0]
      $arrayCreate[rarePool;0]

      $loop[$math[$arrayLength[groupParts] - 2];
        $let[ri;$math[$env[ri] + 1]]
        $let[rareAnimal;$env[groupParts;$get[ri]]]
        $let[countRare;$env[animals;$env[animalsIndexes;$get[rareAnimal]];rarity;0]]

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
        "attempts": $env[fullAttemptArr]
      }]
    ]
  `
}

function raresReward() {
  return `
    {
      "whiteDove": 125,
      "stinkyPig": 3280,
      "pinkyPig": 125,
      "goldenPheasant": 250,
      "marshDeer": 1250,
      "doe": 60,
      "muskDeer": 3935,
      "jackass": 930,
      "rareMacaw": 41250,
      "blueMacaw": 125,
      "girabie": 660,
      "momaffieFamily": 250,
      "momaffie": 125,
      "rareToucan": 41250,
      "lavaToucan": 3280,
      "fieryToucan": 125,
      "keelBilledToucan": 60,
      "chocoToucan": 0,
      "blackPanther": 3280,
      "leopard": 800,
      "jaguar": 660,
      "demonPufferfish": 2625,
      "yellowPufferfish": 75,
      "blackTiger": 3280,
      "whiteTiger": 185,
      "blackBear": 310,
      "blackLion": 13750,
      "whiteLion": 2625,
      "blackManedLion": 930,
      "blackLioness": 13750,
      "whiteLioness": 2625,
      "lioness": 125,
      "blackLionCub": 13750,
      "whiteLionCub": 2625,
      "lionCub": 250,
      "shaheen": 55000,
      "predator": 1065,
      "rareVulture": 41250,
      "bigGoat": 666,
      "markhor": 0,
      "blackRhino": 6875,
      "whiteRhino": 3280,
      "greaterSpottedEagle": 68750,
      "harpyEagle": 68750,
      "goldenEagle": 2360,
      "giraffeFamily": 1840,
      "whiteGiraffe": 440,
      "aquaYeti": 300,
      "shopBigfoot": 125,
      "shopSnowman": 125,
      "shopSnowgirl": 125,
      "luckBigfoot": 13750,
      "luckSnowman": 13750,
      "luckSnowgirl": 27500,
      "kingDragon": 13750
    }
  `
}
