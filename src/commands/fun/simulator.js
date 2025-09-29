import universalSnippets from "#snippets/universalSnippets.js"
import challengeSnippets from '#snippets/challengeSnippets.js'

export default {
  name: 'simulator',
  aliases: ['sim'],
  type: 'messageCreate',
  code: `
    $reply
    $let[arg;$toLowercase[$message]]
    $onlyif[$or[$get[arg]==event;$get[arg]==]]
    ${universalSnippets.checkProfile({time: '10s'})}

    $jsonLoad[animals;$readFile[src/json/animals.json]]
    $jsonLoad[animalsIndexes;$getGlobalVar[animalsIndexes]]
    $jsonLoad[challengeData;$getGlobalVar[$toCamelCase[$get[arg] challenge data]]]
    $jsonLoad[chartLimits;$getGlobalVar[$toCamelCase[$get[arg] chart limits]]]
    $jsonLoad[result;{}]
    $jsonLoad[totalAttempts;${totalAttempts()}]
    ${universalSnippets.luckGenerator(simulatorRaresGroupKey())}

    $let[totalRares;0]
    $let[totalPoints;0]

    $jsonLoad[allRareAttemptsInfoEntries;$jsonEntries[allRareAttemptsInfo]]

    $arrayForEach[allRareAttemptsInfoEntries;entry;
      $jsonLoad[raresArr;$env[entry;1]]
      $let[keyID;$env[entry;0]]
      $let[attemptsIndex;$arrayFindIndex[totalAttempts;att;  $jsonLoad[animArr;$env[att;0]] $return[$arrayIncludes[animArr;$get[keyID]]]  ]]
      $let[attempts;$env[totalAttempts;$get[attemptsIndex];1]]

      $loop[$get[attempts];
        $let[animalID;$arrayRandomValue[raresArr]]
        $let[animalIndex;$env[animalsIndexes;$get[animalID]]]

        $arrayShuffle[raresArr]
        $let[isRare;$env[animals;$get[animalIndex];isRare]]

        $if[$get[isRare];;$continue]

        $let[quantity;$env[result;$get[animalID]]]
        $!jsonSet[result;$get[animalID];$math[$get[quantity] + 1]]
      ]
    ]

    $jsonLoad[result;$jsonEntries[result]]

    $arrayMap[result;arr;
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
      
      $if[$and[$get[hasLimitCategory];$get[quantity]>$get[limit]];
        $let[quantity;$get[limit]]
      ]

      $let[mathResult;$math[$get[quantity] * $get[challengeDataPoints]]]
      $letSum[totalPoints;$get[mathResult]]
      $letSum[totalRares;$get[quantity]]

      $return[$get[animalDisplay]\`$get[quantity]\`]
    ;content]

    $arrayLoad[content;,;$arrayJoin[content; ]]

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]
      $addTextDisplay[# 1 Hour Luck Ended!]
      $addSeparator[Large]
      $addTextDisplay[## ⁘ Points: \`$get[totalPoints]\`]
      $addTextDisplay[## ⁘ Rares: \`$get[totalRares]\`]
      $addSeparator[Large]
      ${challengeSnippets.listDesign()}
    ;$getGlobalVar[luckyColor]]
  `
}

function totalAttempts() {
  return JSON.stringify([
    [["pigeon", "pig", "deer", "reindeer", "swinehoe"], 1],
    [["donkey", "macaw"], 175],
    [["giraffe"], 75],
    [["cheetah", "toucan", "pufferfish"], 200],
    [["tiger"], 200],
    [["lion", "falcon", "vulture"], 150],
    [["rhino", "baldEagle", "markhor"], 40],
    [["whiteGiraffe"], 10],
    [["yeti"], 3],
    [["rareBigfoot"], 3],
    [["rareSnowman"], 3],
    [["rareSnowgirl"], 3],
    [["blackDragon"], 1]
  ]).replaceAll(']', '\\]')
}

function simulatorRaresGroupKey() {
  return JSON.stringify([
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
    "rareBigfoot|undefined|shopBigfoot|rareBigfoot",
    "rareSnowman|undefined|shopSnowman|rareSnowman",
    "rareSnowgirl|undefined|shopSnowgirl|rareSnowgirl",
    "blackDragon|blackDragon|rareKingDragon"
  ]).replaceAll(']', '\\]')
}