module.exports = [{
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
    ${luckGenerator()}
    $jsonLoad[addClover;${addClover()}]
    $jsonLoad[content;${content()}]
    $jsonLoad[rareReward;${raresReward()}]
    $jsonLoad[allRareAttemptsInfoEntries;$jsonEntries[allRareAttemptsInfo]]

    $arrayLoad[desc]
    $let[total;0]

    $arrayForEach[allRareAttemptsInfoEntries;entry;
      $let[animalID;$env[entry;1;attempts;0]]
      $let[animalName;$env[animals;$get[animalID];variants;0;name]]
      $let[animalEmoji;$env[animals;$get[animalID];variants;0;emoji]]
      $let[isRare;$env[animals;$get[animalID];isRare]]
      $let[rareQuantity;$env[animals;$get[animalID];rarity;0]]
      $let[totalAttempts;$env[animals;$get[animalID];rarity;1]]
      $let[animalContent;$get[animalEmoji]]
      $let[percent;$round[$math[$get[rareQuantity] / $get[totalAttempts] * 100];3]]
      $let[CL;]


      $if[$and[$get[animalID]!=undefined;$get[isRare]];
        ${addingClover()}

        $let[rewardArrayIndex;$arrayFindIndex[rareReward;obj;$env[obj;animalID]==$get[animalID]]]
        $let[MC;$env[rareReward;$get[rewardArrayIndex];MC]]

        $arrayPush[desc;## $get[animalContent]$get[CL] | \`$get[rareQuantity]/$get[totalAttempts]\` | +\`$get[MC]\`$getGlobalVar[emoji]]
        $letSum[total;$get[MC]]
      ]
    ]
  
    $if[$arrayLength[desc]==0;
      $arrayPush[desc;## nothing]
    ]

    $let[content;$arrayRandomValue[content]]
    $let[msgdesc;# $get[content]\n**$arrayJoin[desc;\n]**]

    $callFunction[embed;lucky]
    $description[$get[msgdesc]\n-# Total: +$get[total]$getGlobalVar[emoji]]
    
    $callFunction[sumMC;$get[total]]
    $setUserVar[userProfile;$env[userProfile]]
  `
}]

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
        "attempts": $env[fullAttemptArr]
      }]
    ]
  `
}

function raresReward() {
  return `
    [
      {
        "animalID": "whiteDove",
        "MC": 125
      },
      {
        "animalID": "stinkyPig",
        "MC": 3280
      },
      {
        "animalID": "pinkyPig",
        "MC": 125
      },
      {
        "animalID": "goldenPheasant",
        "MC": 250
      },
      {
        "animalID": "marshDeer",
        "MC": 1250
      },
      {
        "animalID": "doe",
        "MC": 60
      },
      {
        "animalID": "muskDeer",
        "MC": 3935
      },
      {
        "animalID": "jackass",
        "MC": 930
      },
      {
        "animalID": "rareMacaw",
        "MC": 41250
      },
      {
        "animalID": "blueMacaw",
        "MC": 125
      },
      {
        "animalID": "girabie",
        "MC": 660
      },
      {
        "animalID": "momaffieFamily",
        "MC": 250
      },
      {
        "animalID": "momaffie",
        "MC": 125
      },
      {
        "animalID": "rareToucan",
        "MC": 41250
      },
      {
        "animalID": "lavaToucan",
        "MC": 3280
      },
      {
        "animalID": "fieryToucan",
        "MC": 125
      },
      {
        "animalID": "keelBilledToucan",
        "MC": 60
      },
      {
        "animalID": "chocoToucan",
        "MC": 0
      },
      {
        "animalID": "blackPanther",
        "MC": 3280
      },
      {
        "animalID": "leopard",
        "MC": 800
      },
      {
        "animalID": "jaguar",
        "MC": 660
      },
      {
        "animalID": "demonPufferfish",
        "MC": 2625
      },
      {
        "animalID": "yellowPufferfish",
        "MC": 75
      },
      {
        "animalID": "blackTiger",
        "MC": 3280
      },
      {
        "animalID": "whiteTiger",
        "MC": 185
      },
      {
        "animalID": "blackBear",
        "MC": 310
      },
      {
        "animalID": "blackLion",
        "MC": 13750
      },
      {
        "animalID": "whiteLion",
        "MC": 2625
      },
      {
        "animalID": "blackManedLion",
        "MC": 930
      },
      {
        "animalID": "blackLioness",
        "MC": 13750
      },
      {
        "animalID": "whiteLioness",
        "MC": 2625
      },
      {
        "animalID": "lioness",
        "MC": 125
      },
      {
        "animalID": "blackLionCub",
        "MC": 13750
      },
      {
        "animalID": "whiteLionCub",
        "MC": 2625
      },
      {
        "animalID": "lionCub",
        "MC": 250
      },
      {
        "animalID": "shaheen",
        "MC": 55000
      },
      {
        "animalID": "predator",
        "MC": 1065
      },
      {
        "animalID": "rareVulture",
        "MC": 41250
      },
      {
        "animalID": "bigGoat",
        "MC": 666
      },
      {
        "animalID": "markhor",
        "MC": 0
      },
      {
        "animalID": "blackRhino",
        "MC": 6875
      },
      {
        "animalID": "whiteRhino",
        "MC": 3280
      },
      {
        "animalID": "greaterSpottedEagle",
        "MC": 68750
      },
      {
        "animalID": "harpyEagle",
        "MC": 68750
      },
      {
        "animalID": "goldenEagle",
        "MC": 2360
      },
      {
        "animalID": "giraffeFamily",
        "MC": 1840
      },
      {
        "animalID": "whiteGiraffe",
        "MC": 440
      },
      {
        "animalID": "aquaYeti",
        "MC": 300
      },
      {
        "animalID": "shopBigfoot",
        "MC": 125
      },
      {
        "animalID": "shopSnowman",
        "MC": 125
      },
      {
        "animalID": "shopSnowgirl",
        "MC": 125
      },
      {
        "animalID": "luckBigfoot",
        "MC": 13750
      },
      {
        "animalID": "luckSnowman",
        "MC": 13750
      },
      {
        "animalID": "luckSnowgirl",
        "MC": 27500
      },
      {
        "animalID": "kingDragon",
        "MC": 13750
      }
    \\]
  `
}
