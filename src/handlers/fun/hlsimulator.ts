import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: 'handleHLSimulator',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile

    $jsonLoad[difficulties;$getGlobalVar[difficulties]]

    $let[difficulty;$toTitleCase[$nullish[$option[difficulty];$message;$getGlobalVar[defaultDifficulty]]]]

    $if[$isNumber[$get[difficulty]]==false;
      $let[difficulty;$arrayFindIndex[$jsonEntries[$tl[data.difficulties]];e;
        $arrayLoad[objValues;, ;$jsonValues[$env[e;1]]]
        $return[$arrayIncludes[objValues;$toTitleCase[$get[difficulty]]]]
      ]]
    ]

    $onlyif[$arrayIncludes[difficulties;$get[difficulty]];
      $arrayMap[difficulties;d;
        $return[$tl[data.difficulties.$env[d].$get[l]]]
      ;difficultiesList]
      $newError[$tl[ui.hlsimulator.unknownDifficulty.$get[l];$arrayJoin[difficultiesList;\`, \`]]]
    ]

    $addCooldown
    $defer

    $getCache[rares;hlSimData;hlSimData]
    $jsonLoad[totalAttempts;$eval[$getGlobalVar[hlSimAttempts];false]]
    $jsonLoad[rawList;{}]

    $arrayForEach[$jsonEntries[$generateLuck[$getGlobalVar[hlSimKey]]];entry;
      $jsonLoad[animalData;$env[entry;1]]
      $jsonLoad[pool;$env[animalData;pool]]
      $let[commonAnimal;$env[animalData;common]]
      $let[totalChance;$env[animalData;total]]
      
      $jsonLoad[counts;{}]

      $let[attemptsIndex;$arrayFindIndex[totalAttempts;att;$arrayIncludes[$env[att;0];$env[entry;0]]]]
      $let[attempts;$default[$env[totalAttempts;$get[attemptsIndex];1];0]]

      $loop[$get[attempts];
        $let[rolledAnimal;]
        $let[randomNum;$random[1;$get[totalChance]]]

        $c[Iterate through the rare animal pool and check if they hit their chance]
        $forOf[pool;item;
          $if[$get[randomNum]<=$env[item;rarity];;$continue]
          
          $let[rolledAnimal;$env[item;id]]
          $break
        ]

        $c[If no rare animal was selected and we have a default one (common != null) — use it]
        $if[$and[$get[rolledAnimal]==;$get[commonAnimal]!=null];
          $let[rolledAnimal;$get[commonAnimal]]
        ]

        $c[If an animal is determined in the end (rare or common)]
        $if[$get[rolledAnimal]==;$continue]

        $let[animalId;$get[rolledAnimal]]

        $if[$env[hlSimData;$get[animalId]];;$continue]

        $let[quantity;$default[$env[counts;$get[animalId]];0]]
        $letSum[quantity;1]
        $!jsonSet[counts;$get[animalId];$changeLimitedRareAnimalQuantity[$get[quantity];$get[animalId];$get[difficulty]]]
      ]

      $jsonAssign[rawList;rawList;$env[counts]]
    ]

    $jsonLoad[result;$generateList[$sortList[$env[rawList]]]]
    
    $addChallengeCompletedContainer[{
      "locale": "$get[l]",
      "points": $env[result;p],
      "rares": $env[result;r],
      "list": $env[result;l]
    }]
  `
})