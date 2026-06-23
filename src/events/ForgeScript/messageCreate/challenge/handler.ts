export default {
  type: "messageCreate",
  code: `
    $jsonLoad[challengeProgress;$getProgress]
    $onlyIf[$env[challengeProgress]!=]
    $onlyIf[$env[challengeProgress;started]]
    $c[
      $onlyIf[$env[challengeProgress;paused]==false]
    ]
    $onlyIf[$startsWith[$messageContent;$if[$guildID!=;$getGuildVar[prefix];$getGlobalVar[prefix]]]==false]

    $reply

    $fn[addRareToList;
      $letSum[points;$get[pointsFromChart]]
      $jsonLoad[tempData;
        {
          "points": $default[$env[tempRaresData;$get[rareAnimalId];points];0], 
          "quantity": $default[$env[tempRaresData;$get[rareAnimalId];quantity];0]
        }
      ]

      $let[caughtPoints;$env[tempData;points]]
      $let[caughtQuantity;$env[tempData;quantity]]
      $letSum[caughtPoints;$get[pointsFromChart]]
      $letSum[caughtQuantity;1]
      $jsonSet[tempData;points;$get[caughtPoints]]
      $jsonSet[tempData;quantity;$get[caughtQuantity]]
      $jsonSet[tempRaresData;$get[rareAnimalId];$env[tempData]]

      $let[newQuantity;$math[$env[raresList;$get[rareAnimalId]] + 1]]
      $jsonSet[raresList;$get[rareAnimalId];$get[newQuantity]]
      $jsonSet[challengeProgress;list;$env[raresList]]
    ]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]

    $getCache[rares;allRares;allRares]

    $jsonLoad[raresList;$env[challengeProgress;list]]
    $jsonLoad[events;$env[challengeProgress;events]]

    $let[difficulty;$env[challengeProgress;difficulty]]
    $jsonLoad[chartLimitsMap;$getGlobalVar[chartLimitsMap]]
    $jsonLoad[chartLimits;$env[$getGlobalVar[chartLimits];$get[difficulty]]]
    
    $jsonLoad[tempRaresData;{}]
    $arrayLoad[providedRares; ;$toLowerCase[$message]]
    $arrayLoad[reachedLimitContent]

    $let[points;0]
    $let[totalPoints;0]
    $let[totalRares;0]
    

    $c[Handling every provided rare]
    $loop[$arrayLength[providedRares];
      $let[caughtRare;$arrayAt[providedRares;$math[$env[i] - 1]]]

      $if[$arrayIncludes[allRares;$get[caughtRare]]==false;
        $if[$env[i]==1;$break;$continue] $c[Stops the loop if the first provided rare is invalid, otherwise continues.]
      ]

      $let[rareAnimalId;$getRareAnimalID[$get[caughtRare]]]
      
      $let[pointsFromChart;$getChartPoints[$get[rareAnimalId]]]
      $let[category;$env[$getRareFromCDB[$get[rareAnimalId]];category]]

      $let[chartlimitId;$arrayFind[chartLimits;id;$env[chartLimitsMap;$env[id];category]==$get[category]]]

      $c[if rare is not limited, adds immediately to the list and continues cycle]
      $if[$get[chartlimitId]==;
        $callFn[addRareToList]
        $continue
      ]
      
      $let[limit;$env[chartLimitsMap;$get[chartlimitId];limit]]
      $let[limitAnimalCount;$env[raresList;$get[rareAnimalId]]]

      $if[$get[limitAnimalCount]<$get[limit];;$continue]
      
      $callFn[addRareToList]
      $letSum[limitAnimalCount;1]

      $c[Adds an informational content about reaching the rare animal limit]
      $if[$get[limitAnimalCount]==$get[limit];
        $let[limitedAnimalDisplay;$getAnimalVariantInfo[$get[rareAnimalId];emoji]]
        $arrayPush[reachedLimitContent;$tl[ui.challenge.reachedLimit.$get[l];$get[limitedAnimalDisplay]]]
      ]
    ;i;true]

    $onlyIf[$get[points]>0]
    
    $jsonLoad[entries;$jsonEntries[tempRaresData]]
    $arrayMap[entries;e;
      $let[animalDisplay;$getAnimalVariantInfo[$env[e;0];emoji]]
      $let[pointsInEntry;$env[e;1;points]]
      $let[quantityInEntry;$env[e;1;quantity]]
      $return[## - $get[animalDisplay]\`$get[quantityInEntry]\` «\`+$get[pointsInEntry]\`»]
    ;raresContent]
    

    $c[Adds and saves total points and total rares]
    $jsonLoad[le;$jsonEntries[raresList]]
    $arrayForEach[le;e;
      $let[quantity;$env[e;1]]

      $letSum[totalPoints;$math[$env[$getRareFromCDB[$env[e;0]];points] * $get[quantity]]]
      $letSum[totalRares;$get[quantity]]
    ]
    $!jsonSet[challengeProgress;points;$get[totalPoints]]
    $!jsonSet[challengeProgress;rares;$get[totalRares]]

    $c[Adds an event for prediction]
    $let[currentTimeMS;$math[3600000 - ($env[challengeProgress;endTime] - $getTimestamp)]]
    $let[passedSeconds;$round[$math[$get[currentTimeMS] / 1000]]]

    $arrayLoad[event; ;$get[passedSeconds] $get[totalPoints]]
    $arrayPushJSON[events;$env[event]]
    $!jsonSet[challengeProgress;events;$env[events]]

    $if[$env[challengeProgress;paused];
      $!jsonSet[challengeProgress;paused;false]
      $saveProgress[$env[challengeProgress]]
      $startTimer
    ;
      $saveProgress[$env[challengeProgress]]
    ]

    $c[Final message]
    $addContainer[
      $addAuthorDisplay

      $if[$arrayLength[reachedLimitContent]>0;
        $addTextDisplay[$arrayJoin[reachedLimitContent;\n]]
        $addSeparator[Small]
      ]
      
      $addTextDisplay[$cropText[$arrayJoin[raresContent;\n];0;3700;...]]
      $addSeparator[Large]
      $addTextDisplay[$showPoints «\`+$get[points]\`»]
      $addTextDisplay[$showPredict]
      $addTextDisplay[$showTime]
    ;$getGlobalVar[luckyColor]]
    $displayLimitedRares
  `
}