import loadLobbyVars from '../../../JSfunctions/lobby/loadVars.js'
import JSON from '../../../JSfunctions/luck challenge/jsonForChallengeAndHistory.js'

export default {
  unprefixed: true,
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[challengeProgress;$getUserVar[challengeProgress|$channelID]]
    $onlyIf[$env[challengeProgress;started]]
    $onlyIf[$startsWith[$messageContent;$getGuildVar[prefix]]==false]

    ${JSON()}
    $jsonLoad[caught;{}]
    $arrayLoad[caughtRares; ;$toLowerCase[$message]]
    $jsonLoad[allRaresList;$env[challengeProgress;list]]
    $jsonLoad[chartLimits;$getGlobalVar[chartLimits]]
    ${loadLobbyVars()}

    $arrayLoad[limitsContent]
    $arrayLoad[reachedLimitContent]

    $let[points;0]
    $let[hasDifficulty;$arrayIncludes[userSettings;difficulties]]
    $let[hideRaresLimit;$arrayIncludes[userSettings;hideLimit]]
    $let[unlimitedRares;$if[$getChannelVar[lobby]!=;$arrayIncludes[lobbyTags;unlimitedRares];$arrayIncludes[userSettings;unlimitedRares]]]
    $let[difficulty;$default[$env[lobby;difficulty];$env[userProfile;1hl;difficulty]]]

    $if[$env[challengeProgress;teamID]!=-1;
      $if[$and[$get[difficulty]!=none;$get[difficulty]!=];
        $jsonLoad[chartLimits;$getGlobalVar[$get[difficulty]ChartLimits]]
      ]
    ;
      $if[$get[hasDifficulty];
        $jsonLoad[chartLimits;$getGlobalVar[$get[difficulty]ChartLimits]]
      ]
    ]


    $localFunction[raresLogic;
      $letSum[points;$get[challengeDataPoints]]

      $jsonLoad[PQ;
        {
          "p": $default[$env[caught;$get[animalID];p];0], 
          "q": $default[$env[caught;$get[animalID];q];0]
        }
      ]

      $let[caughtPoints;$env[PQ;p]]
      $let[caughtQuantity;$env[PQ;q]]
      $letSum[caughtPoints;$get[challengeDataPoints]]
      $letSum[caughtQuantity;1]
      $!jsonSet[PQ;p;$get[caughtPoints]]
      $!jsonSet[PQ;q;$get[caughtQuantity]]
      $!jsonSet[caught;$get[animalID];$env[PQ]]

      $let[PR;$env[challengeProgress;rares]]
      $letSum[PR;1]

      $let[newQuantity;$math[$env[allRaresList;$get[animalID]] + 1]]
      $!jsonSet[allRaresList;$get[animalID];$get[newQuantity]]
      $!jsonSet[challengeProgress;rares;$get[PR]]
      $!jsonSet[challengeProgress;list;$env[allRaresList]]
    ]
    
    $c[Looping through every rare]

    $loop[$arrayLength[caughtRares];
      $let[i;$math[$env[i] - 1]]
      $let[caughtRare;$arrayAt[caughtRares;$get[i]]]

      $if[$arrayIncludes[allRares;$get[caughtRare]];;
        $if[$get[i]==0;$break]
        $continue
      ]

      $onlyIf[$env[challengeProgress;paused]==false;
        $callFunction[embed;error] 
        $description[## You are on pause!] 
        $sendMessage[$channelID]
      ]

      $let[animalID;$callFunction[findingAnimalID;$get[caughtRare]]]
      $jsonLoad[output;$callFunction[findingRareInChallengeDataBase;$get[animalID]]]
      
      $let[challengeDataPoints;$env[output;points]]
      $let[challengeDataCategory;$env[output;category]]

      $let[hasLimitCategory;$arraySome[chartLimits;obj;$env[obj;category]==$get[challengeDataCategory]]]

      $if[$or[$get[unlimitedRares];$get[hasLimitCategory]==false];
        $callFn[raresLogic]
        $continue
      ]

      $let[limitAnimalName;$env[animals;$env[animalsIndexes;$get[animalID]];variants;0;emoji]]
      $let[chartlimitIndex;$arrayFindIndex[chartLimits;obj;$env[obj;category]==$get[challengeDataCategory]]]
      $jsonLoad[limitChartObj;$env[chartLimits;$get[chartlimitIndex]]]
      $let[limit;$env[limitChartObj;limit]]
      $let[limitAnimalCount;$env[allRaresList;$get[animalID]]]

      $if[$get[limitAnimalCount]<$get[limit];
        $callFn[raresLogic]
        $letSum[limitAnimalCount;1]

        $if[$get[limitAnimalCount]==$get[limit];
          $arrayPush[reachedLimitContent;# Reached limit of $get[limitAnimalName]]
        ]
      ]
    ;i;true]

    $jsonLoad[caughtEntries;$jsonEntries[caught]]
    $arrayMap[caughtEntries;entry;
      $let[animalEmoji;$env[animals;$env[animalsIndexes;$env[entry;0]];variants;0;emoji]]
      $let[pointsInEntry;$env[entry;1;p]]
      $let[quantityInEntry;$env[entry;1;q]]
      $return[## ⁕ $get[animalEmoji]\`$get[quantityInEntry]\` ⟪+$get[pointsInEntry]⟫]
    ;caught]
    
    $c[Message sending]
    
    $if[$get[points]==0;$stop]

    $if[$get[unlimitedRares];;
      $arrayForEach[chartLimits;obj;
        $loop[$arrayLength[challengeData];
          $jsonLoad[data;$arrayAt[challengeData;$math[$env[i] - 1]]]

          $let[dataCategory;$env[data;category]]
          $let[objCategory;$env[obj;category]]

          $if[$get[dataCategory]==$get[objCategory];;$continue]

          $let[limit;$env[obj;limit]]
          $jsonLoad[challengeRares;$env[data;rares]]

          $arrayForEach[challengeRares;rare;
            $jsonLoad[allRaresDataObj;$getGlobalVar[allRaresData]]

            $let[displayRare;$env[animals;$env[animalsIndexes;$env[rare]];variants;0;emoji]]
            $let[quantity;$default[$env[allRaresList;$env[rare]];0]]

            $if[$get[quantity]<$get[limit];
              $arrayPush[limitsContent;$get[displayRare]\`$get[quantity]|$get[limit]\`]
            ]
          ]
          $break
        ;i;true]
      ]
    ]

    $let[PP;$env[challengeProgress;points]]
    $letSum[PP;$get[points]]
    $!jsonSet[challengeProgress;points;$get[PP]]


    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]
      $if[$arrayLength[reachedLimitContent]>0;
        $addTextDisplay[$arrayJoin[reachedLimitContent;\n]]
        $addSeparator[Large]
      ]
      $if[$get[unlimitedRares];
        $addTextDisplay[# ※ Unlimited Rares]
        $addSeparator[Large]
      ]
      
      $addTextDisplay[$arrayJoin[caught;\n]]
      $addSeparator
      $addTextDisplay[## $callFunction[showPoints;$authorID] ⟪+$get[points]⟫]
      $addSeparator
      $addTextDisplay[## $callFunction[showTime;$authorID]]
      
      $if[$and[$get[hideRaresLimit]==false;$arrayLength[limitsContent]!=0];
        $addSeparator[Large]
        $addTextDisplay[# $arrayJoin[limitsContent; ]]
      ]
    ;$getGlobalVar[luckyColor]]
    $setUserVar[challengeProgress|$channelID;$env[challengeProgress]]
  `
}