import universalSnippets from "#snippets/universalSnippets.js"

export default {
  name: 'raretryrun',
  aliases: ['rtr'],
  type: 'messageCreate',
  code: `
    $reply
    ${universalSnippets.checkProfile({time: '10s'})}

    $jsonLoad[l;$readFile[src/json/localizations.json]]
    $jsonLoad[animals;$readFile[src/json/animals.json]]
    $jsonLoad[animalsIndexes;$getGlobalVar[animalsIndexes]]
    ${universalSnippets.luckGenerator(luckKey())}
    $jsonLoad[addClover;${addClover()}]
    $jsonLoad[content;$env[l;raretryRun;0;$env[userProfile;language]]]
    $jsonLoad[rareReward;${raresReward()}]
    $jsonLoad[allRareAttemptsInfoEntries;$jsonEntries[allRareAttemptsInfo]]
    $let[lastDailyRaretryrun;$default[$env[userProfile;limiters;lastDailyRaretryrun];-1]]

    $arrayLoad[desc]
    $let[total;0]

    $arrayMap[allRareAttemptsInfoEntries;entry;
      $let[animalID;$env[entry;1;0]]
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
        $loop[$arrayLength[addClover];
          $let[i;$math[$env[i] - 1]]
          $let[chance;$env[addClover;$get[i];0]]
          $if[$get[chance]>=$get[percent];;$continue]
          $let[CL;$env[addClover;$get[i];1]]
          $break
        ;i;true]

        $let[MC;$default[$env[rareReward;$get[animalID]];0]]
        $letSum[total;$get[MC]]

        $if[$get[lastDailyRaretryrun]!=$day;
          $if[$getUserVar[catchedRaresInRaretryrun]<$getGlobalVar[maxRaretryrunRares];
            $setUserVar[catchedRaresInRaretryrun;$math[$getUserVar[catchedRaresInRaretryrun] + 1]]
          ;
            $!jsonSet[userProfile;limiters;lastDailyRaretryrun;$day]
            $let[lastDailyRaretryrun;$day]
            $sendMessage[$channelID;## <@$authorID>, you have caught $getGlobalVar[maxRaretryrunRares] \`$commandName\` rares!]
          ]
        ]

        $return[## $get[animalContent]$get[CL] | \`$get[rareQuantity]/$get[totalAttempts]\` | +\`$get[MC]\`$getGlobalVar[emoji]]
      ]
    ;desc]
  
    $if[$arrayLength[desc]==0;
      $arrayPush[desc;## nothing]
    ]

    $callFunction[sumMC;$get[total]]
    $setUserVar[userProfile;$env[userProfile]]

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]
      $addTextDisplay[# $arrayRandomValue[content]]
      $addSeparator
      $addTextDisplay[**$arrayJoin[desc;\n]**]
      $addSeparator
      $addTextDisplay[-# Total: +$get[total]$getGlobalVar[emoji]]
    ;$getGlobalVar[luckyColor]]
  `
}

function addClover() {
  return JSON.stringify([
    [0.025, "🍀⁵"],
    [0.035, "🍀⁴"],
    [0.1, "🍀³"],
    [0.5, "🍀²"],
    [3, "🍀"]
  ]).replaceAll(']', '\\]')
}

function luckKey() {
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

function raresReward() {
  return JSON.stringify({
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
    "rareBigfoot": 13750,
    "rareSnowman": 13750,
    "rareSnowgirl": 27500,
    "rareKingDragon": 13750
  })
}
