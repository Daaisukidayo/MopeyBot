const type = "name"

module.exports = [{
  name: 'simulator',
  aliases: ['sim'],
  type: 'messageCreate',
  code: `
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $let[cdTime;10s]
    $callFunction[cooldown;$get[cdTime]]

    $jsonLoad[animals;$readFile[json/animals.json]]
    $jsonLoad[challengeData;$getGlobalVar[challengeData]]
    $jsonLoad[result;{}]
    ${luckGenerator()}

    $let[totalRares;0]
    $let[totalPoints;0]
    $let[msgdesc;]

    $jsonLoad[allRareAttemptsInfoEntries;$jsonEntries[allRareAttemptsInfo]]

    $arrayForEach[allRareAttemptsInfoEntries;entry;
      $jsonLoad[raresArr;$env[entry;1;attempts]]
      $arrayForEach[raresArr;rare;
        $if[$env[animals;$env[rare];isRare];
          $let[quantity;$env[result;$env[rare]]]
          $!jsonSet[result;$env[rare];$math[$get[quantity] + 1]]
          $if[$and[${isCommon("$env[rare]")};$get[quantity]>3];;
            $letsum[totalRares;1]
          ]
        ]
      ]
    ]

    $jsonLoad[result;$jsonEntries[result]]

    $arrayForEach[result;arr;
      $let[animalID;$env[arr;0]]
      $let[quantity;$env[arr;1]]
      $let[animal;$env[animals;$get[animalID];variants;0;${type}]]

      $if[$and[${isCommon("$get[animalID]")};$get[quantity]>3];
        $let[quantity;3]
      ]

      $let[msgdesc;$get[msgdesc]# $get[animal]\`$get[quantity]\`\n]
      ${findingRareInChallengeDataBase()}
      $letsum[totalPoints;$math[$get[quantity] * $get[challengeDataPoints]]]
    ]

    $color[$getGlobalVar[luckyColor]]
    $description[$trim[$get[msgdesc]]]
    $footer[Points: $get[totalPoints] • Rares: $get[totalRares]]
    $getGlobalVar[author]
  `
}]


function findingRareInChallengeDataBase () {
  return `
    $loop[$arrayLength[challengeData];
      $let[j;$math[$env[j] - 1]]

      $jsonLoad[challengeDataObj;$arrayAt[challengeData;$get[j]]]
      $jsonLoad[challengeDataRaresList;$env[challengeDataObj;rares]]
      $let[challengeDataPoints;$env[challengeDataObj;points]]
      $let[challengeDataCategory;$env[challengeDataObj;category]]

      $if[$arrayIncludes[challengeDataRaresList;$get[animalID]];
        $break
      ]
    ;j;desc]
  `
}


function isCommon (rare) {
  return `$includes[${rare};chocoToucan;keelBilledToucan;markhor]`
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
      ;ri;desc]

      $let[totalCommons;$math[$get[totalAttempts] - $get[totalRare]]]
      $arrayCreate[commonArr;$get[totalCommons]]
      $arrayFill[commonArr;$get[commonAnimal]]

      $arrayConcat[fullAttemptArr;rarePool;commonArr]
      $arrayShuffle[fullAttemptArr]

      $if[$includes[-$get[keyName]-;-pigeon-;-pig-;-deer-;-reindeer-;-swinehoe-];
        $jsonLoad[fullAttemptArr;$arraySplice[fullAttemptArr;0;1]]
      ]
      $if[$includes[-$get[keyName]-;-donkey-;-macaw-;-giraffe-;-cheetah-;-toucan-;-pufferfish-];
        $jsonLoad[fullAttemptArr;$arraySplice[fullAttemptArr;0;120]]
      ]
      $if[$includes[-$get[keyName]-;-tiger-];
        $jsonLoad[fullAttemptArr;$arraySplice[fullAttemptArr;0;60]]
      ]
      $if[$includes[-$get[keyName]-;-lion-;-falcon-;-vulture-];
        $jsonLoad[fullAttemptArr;$arraySplice[fullAttemptArr;0;75]]
      ]
      $if[$includes[-$get[keyName]-;-rhino-;-baldEagle-;-markhor-];
        $jsonLoad[fullAttemptArr;$arraySplice[fullAttemptArr;0;30]]
      ]
      $if[$includes[-$get[keyName]-;-whiteGiraffe-];
        $jsonLoad[fullAttemptArr;$arraySplice[fullAttemptArr;0;5]]
      ]

      $!jsonSet[allRareAttemptsInfo;$get[keyName];{
        "attempts": $env[fullAttemptArr]
      }]
    ]
  `
}

function findingRareInRaresMapBase () {
  return `
    $loop[$arrayLength[raresMap];
      $let[j;$math[$env[j] - 1]]

      $jsonLoad[rareMap;$arrayAt[raresMap;$get[j]]]
      $jsonLoad[raresList;$env[rareMap;rares]]

      $if[$arrayIncludes[raresList;$get[animalID]];
        $break
      ]
    ;j;desc]
  `
}