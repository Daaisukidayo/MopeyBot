import playSnippets from '#snippets/playSnippets.js'

export default {
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu"],
  description: "search XP",
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;actions,play]

    $onlyIf[$arrayEvery[passKeys;key;$arrayIncludes[IID;$env[key]]]]
    $onlyIf[$selectMenuValues==farmXP]
    ${playSnippets.loadJSON()}
    $onlyIf[$arrayIncludes[IID;$authorID];$callFunction[notYourBTN]]

    ${playSnippets.hasStarted()}

    $let[deathRarity;$randomNumber[1;1001]]
    $let[deathChance;15]
    $let[deathDesc;$randomText[A predator killed you!;You were killed by a predator!]]

    $let[findPrayRarity;$randomNumber[1;101]]
    $let[findPrayChance;12]

    $let[findSoccerRarity;$randomNumber[1;101]]
    $let[findSoccerChance;10]

    $jsonLoad[expBase;$readFile[src/json/expBase.json]]
    $jsonLoad[expData;$readFile[src/json/expData.json]]

    $let[biome;$env[playData;currentBiome]]
    $let[animalBiome;$env[playData;animalBiome]]
    $let[animalID;$env[playData;currentAnimal]]
    $let[tier;$env[playData;tier]]

    $if[$env[animals;$env[animalsIndexes;$get[animalID]];isRare];
      $letSub[deathChance;10]
    ]

    $if[$get[animalBiome]!=$get[biome];
      $letSum[deathChance;10]
      $if[$get[animalBiome]==Ocean;
        $let[deathChance;1000]
        $let[deathDesc;You died by a lack of water!]
      ]
      $if[$and[$get[animalBiome]==Volcano;$or[$get[biome]==Arctic;$get[biome]==Ocean]];
        $let[deathChance;800]
        $let[deathDesc;You died by a lack of lava!]
      ]
    ]

    ${farmFood()}

    $let[color;$env[playData;color]]

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]
      
      $if[$get[deathChance]>=$get[deathRarity];
        ${playSnippets.setNewXPOnDeath()}
        ${playSnippets.setNewTier()}
        ${playSnippets.removeAllApex()}

        $addTextDisplay[## $get[deathDesc]]

        $let[color;$getGlobalVar[errorColor]]
        ${playSnippets.respawnButton()}
        $let[showCheats;false]
      ;
        $!jsonSet[playData;XP;$math[$env[playData;XP] + $get[xp]]]

        $addSection[
          $addTextDisplay[## $get[content]]
          $addThumbnail[$env[playData;currentAnimalImg]]
        ]

        ${playSnippets.actionMenu()}
        ${playSnippets.animalStats()}
        $let[showCheats;true]
      ]

      $addSeparator
      ${playSnippets.exitButton('$get[showCheats]')}
    ;$get[color]]
    
    $interactionUpdate
    $setUserVar[userPlayData;$env[playData]]
  `
}

function farmFood() {
  return `
    $switch[$get[tier];
      $case[15;$letSub[deathChance;10]]
      $case[16;$letSub[deathChance;14]]
      $case[17;$let[deathChance;5] $let[deathDesc;You were killed by teamers!]]
    ]

    $let[multiplier;$env[expData;$get[tier];m]]
    $let[extraMultiplier;3]

    $jsonLoad[data;$env[expData;$get[tier];d]]
    $jsonLoad[biomeArray;$env[expBase;b]]
    $jsonLoad[foodArray;$env[expBase;f]]
    $jsonLoad[preyArray;$env[expBase;p]]

    $let[biomeIndex;$arrayIndexOf[biomeArray;$get[biome]]]
    $jsonLoad[data;$env[data;$get[biomeIndex]]]

    $jsonLoad[food;$env[data;f]]
    $jsonLoad[prey;$env[data;p]]

    $if[$arrayLength[food]==0;
      $let[deathChance;1000]
      $let[deathDesc;You died by staying on lava!]
    ;

      $let[foodIndex;$arrayRandomValue[food]]
      $jsonLoad[food;$env[foodArray;$get[foodIndex]]]

      $jsonLoad[foodXPArr;$env[food;XP]]
      $let[minXP;$math[$env[foodXPArr;0] * $get[multiplier]]]
      $let[maxXP;$math[$env[foodXPArr;1] * $get[multiplier]]]
      $let[foodXP;$randomNumber[$get[minXP];$math[$get[maxXP] + 1]]]
      $let[foodXP;$round[$math[$get[foodXP] * $get[extraMultiplier]]]]
      $let[foodName;$env[food;name]]

      $if[$get[foodName]==;$let[foodName;undefined]]

      $let[xp;$get[foodXP]]
      $let[content;You ate a(n) $get[foodName] and gained \`$separateNumber[$get[xp];,]\`XP!]

      $if[$arrayLength[prey]==0;;

        $if[$get[findPrayChance]>=$get[findPrayRarity];
          $let[preyIndex;$arrayRandomValue[prey]]
          $let[preyID;$env[preyArray;$get[preyIndex];name]]
          $let[preyName;$env[animals;$env[animalsIndexes;$get[preyID]];variants;0;name]]
          $let[preyEmoji;$env[animals;$env[animalsIndexes;$get[preyID]];variants;0;emoji]]
          $let[preyTier;$env[animals;$env[animalsIndexes;$get[preyID]];tier]]

          $jsonLoad[XPreq;${playSnippets.XPReqForUpg()}]
          $jsonLoad[XParr;$env[XPreq;$get[preyTier]]]

          $let[minXP;$env[XParr;0]]
          $let[maxXP;$math[$env[XParr;1] / 1.5]]
          $let[xp;$randomNumber[$get[minXP];$math[$get[maxXP] + 1]]]

          $let[content;You ate a(n) __$get[preyName]__ $get[preyEmoji] and gained \`$separateNumber[$get[xp];,]\`XP!]
        ]
      ]
    ]
  `
}