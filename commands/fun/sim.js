export default {
  name: 'simulator',
  aliases: ['sim'],
  type: 'messageCreate',
  code: `
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $let[cdTime;1s]
    $let[arg;$toLowercase[$message]]
    $onlyif[$or[$get[arg]==event;$get[arg]==]]
    $callFunction[cooldown;$get[cdTime]]

    $jsonLoad[animals;$readFile[json/animals.json]]
    $jsonLoad[animalsIndexes;$getGlobalVar[animalsIndexes]]
    $jsonLoad[challengeData;$getGlobalVar[$toCamelCase[$get[arg] challenge data]]]
    $jsonLoad[chartLimits;$getGlobalVar[$toCamelCase[$get[arg] chart limits]]]
    $jsonLoad[result;{}]
    $jsonLoad[totalAttempts;${totalAttempts()}]
    $arrayLoad[msgdesc]
    ${luckGenerator()}

    $let[totalRares;0]
    $let[totalPoints;0]

    $jsonLoad[allRareAttemptsInfoEntries;$jsonEntries[allRareAttemptsInfo]]

    $arrayForEach[allRareAttemptsInfoEntries;entry;
      $jsonLoad[raresArr;$env[entry;1;attempts]]
      $let[keyID;$env[entry;0]]
      $let[attemptsIndex;$arrayFindIndex[totalAttempts;att;$jsonLoad[animArr;$env[att;0]]$arrayIncludes[animArr;$get[keyID]]]]
      $let[attempts;$env[totalAttempts;$get[attemptsIndex];1]]

      $let[i;0]

      $loop[$get[attempts];
        $let[animalID;$arrayRandomValue[raresArr]]
        $c[ 
          $let[animalID;$arrayAt[raresArr;$get[i]]]
        ]
        $arrayShuffle[raresArr]
        $let[isRare;$env[animals;$env[animalsIndexes;$get[animalID]];isRare]]
        $letSum[i;1]

        $if[$get[isRare];;$continue]
        $let[i;0]

        $let[quantity;$env[result;$get[animalID]]]
        $!jsonSet[result;$get[animalID];$math[$get[quantity] + 1]]
      ]
    ]

    $jsonLoad[result;$jsonEntries[result]]

    $arrayForEach[result;arr;
      $let[animalID;$env[arr;0]]
      $let[quantity;$env[arr;1]]
      $let[animalDisplay;$env[animals;$env[animalsIndexes;$get[animalID]];variants;0;emoji]]

      $jsonLoad[output;$callFunction[findingRareInChallengeDataBase;$get[animalID]]]
      $let[challengeDataCategory;$env[output;category]]
      $let[challengeDataPoints;$env[output;points]]

      $let[hasLimitCategory;$arraySome[chartLimits;obj;$env[obj;category]==$get[challengeDataCategory]]]
      $let[chartlimitIndex;$arrayFindIndex[chartLimits;obj;$env[obj;category]==$get[challengeDataCategory]]]
      $jsonLoad[limitChartObj;$env[chartLimits;$get[chartlimitIndex]]]
      $let[limit;$env[limitChartObj;limit]]      
      
      $if[$and[$get[hasLimitCategory];$get[quantity]>$get[limit]];  $let[quantity;$get[limit]]  ]

      $let[mathResult;$math[$get[quantity] * $get[challengeDataPoints]]]
      $letSum[totalPoints;$get[mathResult]]
      $letSum[totalRares;$get[quantity]]

      $arrayPush[msgdesc;$get[animalDisplay]\`$get[quantity]\`]
    ]

    $callFunction[embed;lucky]
    $description[$trim[# $arrayJoin[msgdesc; ]]]
    $footer[Points: $get[totalPoints] • Rares: $get[totalRares]]
  `
}

function totalAttempts() {
  return `
    [
      [["pigeon", "pig", "deer", "reindeer", "swinehoe"\\], 1\\],
      [["donkey", "macaw"\\], 175\\],
      [["giraffe"\\], 75\\],
      [["cheetah", "toucan", "pufferfish"\\], 225\\],
      [["tiger"\\], 250\\],
      [["lion", "falcon", "vulture"\\], 175\\],
      [["rhino", "baldEagle", "markhor"\\], 30\\],
      [["whiteGiraffe"\\], 10\\]
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
        "whiteGiraffe|undefined|whiteGiraffe|giraffeFamily"
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