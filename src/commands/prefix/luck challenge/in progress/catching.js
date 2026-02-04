export default {
  unprefixed: true,
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[challengeProgress;$getProgress]
    $onlyIf[$env[challengeProgress]!=]
    $onlyIf[$env[challengeProgress;started]]
    $onlyIf[$startsWith[$messageContent;$if[$guildID!=;$getGuildVar[prefix];$getGlobalVar[prefix]]]==false]

    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]

    $jsonLoad[lobby;$getChannelVar[lobby]]
    $jsonLoad[raresList;$env[challengeProgress;list]]
    
    $jsonLoad[allRares;$getGlobalVar[allRares]]
    $jsonLoad[events;$env[challengeProgress;events]]

    $let[difficulty;$env[challengeProgress;difficulty]]
    $jsonLoad[chartLimits;$getGlobalVar[chartLimits]]
    $jsonLoad[chartLimits;$env[chartLimits;$get[difficulty]]]
    

    $jsonLoad[caught;{}]
    $arrayLoad[caughtRares; ;$toLowerCase[$message]]
    $arrayLoad[reachedLimitContent]

    $let[points;0]
    $let[totalPoints;0]
    $let[totalRares;0]

    

    $c[Handling every caught rare]
    $loop[$arrayLength[caughtRares];
      $let[i;$math[$env[i] - 1]]
      $let[caughtRare;$arrayAt[caughtRares;$get[i]]]

      $if[$arrayIncludes[allRares;$get[caughtRare]];;
        $if[$get[i]==0;$break]
        $continue
      ]

      $if[$env[challengeProgress;paused];
        $newError[$tl[ui.challenge.onPause]]
      ]

      $let[animalID;$getRareAnimalID[$get[caughtRare]]]
      
      $let[CDPoints;$getChartPoints[$get[animalID]]]

      $let[chartlimitIndex;$getChartLimitIndex[$get[animalID]]]

      $if[$get[chartlimitIndex]==-1;
        ${addRareToList()}
        $continue
      ]

      $let[limitAnimalDisplay;$getAnimalVariantInfo[$get[animalID];emoji]]
      
      $jsonLoad[limitChartObj;$env[chartLimits;$get[chartlimitIndex]]]
      $let[limit;$env[limitChartObj;limit]]
      $let[limitAnimalCount;$env[raresList;$get[animalID]]]

      $if[$get[limitAnimalCount]<$get[limit];;$continue]
      
      ${addRareToList()}
      $letSum[limitAnimalCount;1]

      $if[$get[limitAnimalCount]==$get[limit];
        $arrayPush[reachedLimitContent;$tl[ui.challenge.reachedLimit;$get[limitAnimalDisplay]]]
      ]
    ;i;true]

    $c[adds caught message]
    $jsonLoad[caughtEntries;$jsonEntries[caught]]

    $arrayMap[caughtEntries;entry;
      $let[animalDisplay;$getAnimalVariantInfo[$env[entry;0];emoji]]
      $let[pointsInEntry;$env[entry;1;points]]
      $let[quantityInEntry;$env[entry;1;quantity]]
      $return[## - $get[animalDisplay]\`$get[quantityInEntry]\` «\`+$get[pointsInEntry]\`»]
    ;caught]
    
    $onlyIf[$get[points]>0]

    $c[Adds and saves total points and total rares]
    $jsonLoad[le;$jsonEntries[raresList]]
    $arrayForEach[le;e;
      $let[quantity;$env[e;1]]

      $letSum[totalPoints;$math[$dump[$getRareFromCDB[$env[e;0]];points] * $get[quantity]]]
      $letSum[totalRares;$get[quantity]]
    ]
    $!jsonSet[challengeProgress;points;$get[totalPoints]]
    $!jsonSet[challengeProgress;rares;$get[totalRares]]

    $c[Adds an event]
    $arrayLoad[event; ;$getUserVar[1htime|$channelID] $get[totalPoints]]
    $arrayPushJSON[events;$env[event]]
    $!jsonSet[challengeProgress;events;$env[events]]
    $saveProgress

    $c[Message sending]
    $addContainer[
      $addAuthorDisplay

      $if[$arrayLength[reachedLimitContent]>0;
        $addTextDisplay[$arrayJoin[reachedLimitContent;\n]]
        $addSeparator[Large]
      ]
      
      $addTextDisplay[$cropText[$arrayJoin[caught;\n];0;3997;...]]
      $addSeparator[Large]
      $addTextDisplay[$showPoints «\`+$get[points]\`»]
      $addTextDisplay[$showPredict]
      $addTextDisplay[$showTime]
    ;$getGlobalVar[luckyColor]]
    $displayRaresLimit
  `
}


function addRareToList() {
  return `
    $letSum[points;$get[CDPoints]]
    $jsonLoad[caughtData;
      {
        "points": $default[$env[caught;$get[animalID];points];0], 
        "quantity": $default[$env[caught;$get[animalID];quantity];0]
      }
    ]

    $let[caughtPoints;$env[caughtData;points]]
    $let[caughtQuantity;$env[caughtData;quantity]]
    $letSum[caughtPoints;$get[CDPoints]]
    $letSum[caughtQuantity;1]
    $!jsonSet[caughtData;points;$get[caughtPoints]]
    $!jsonSet[caughtData;quantity;$get[caughtQuantity]]
    $!jsonSet[caught;$get[animalID];$env[caughtData]]

    $let[newQuantity;$math[$env[raresList;$get[animalID]] + 1]]
    $!jsonSet[raresList;$get[animalID];$get[newQuantity]]
    $!jsonSet[challengeProgress;list;$env[raresList]]
  `
}