export default {
  name: 'handleHLSimulator',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile

    $jsonLoad[difficulties;$getGlobalVar[difficulties]]

    $let[difficulty;$toTitleCase[$nullish[$option[difficulty];$message;$getGlobalVar[defaultDifficulty]]]]

    $if[$isNumber[$get[difficulty]]==false;
      $jsonLoad[diff;$tl[*;data;difficulties]]
      $jsonLoad[diffE;$jsonEntries[diff]]
      $let[difficulty;$arrayFindIndex[diffE;e;
        $jsonLoad[obj;$env[e;1]]
        $arrayLoad[objValues;, ;$jsonValues[obj]]
        $return[$arrayIncludes[objValues;$toTitleCase[$get[difficulty]]]]
      ]]
    ]

    $onlyif[$arrayIncludes[difficulties;$get[difficulty]];
      $newError[$tl[$get[l];ui;hlsimulator.invalidDifficulty]]
    ]

    $addCooldown
    $defer

    $getCache[hlSimData;hlSimData]
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
        $loop[$arrayLength[pool];
          $jsonLoad[rareItem;$env[pool;$sub[$env[i];1]]]
          $if[$get[randomNum]<=$env[rareItem;rarity];;$continue]
          
          $let[rolledAnimal;$env[rareItem;id]]
          $break
        ;i;true]

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
    
    $jsonLoad[list;$env[result;l]]
    $let[totalPoints;$env[result;p]]
    $let[totalRares;$env[result;r]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[$get[l];ui;challenge.completed]]
      $addSeparator[Large]
      $addTextDisplay[$tl[$get[l];ui;challenge.points;$get[totalPoints]]]
      $addTextDisplay[$tl[$get[l];ui;challenge.rares;$get[totalRares]]]
      $addSeparator[Large]
      $showDesignedList[$env[list]]
    ;$getGlobalVar[luckyColor]]
  `
}