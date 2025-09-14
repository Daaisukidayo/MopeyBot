import lobbySnippets from '#snippets/lobbySnippets.js'
import challengeSnippets from '#snippets/challengeSnippets.js'

export default {
  unprefixed: true,
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[challengeProgress;$getUserVar[challengeProgress|$channelID]]
    $onlyIf[$env[challengeProgress;started]]
    $onlyIf[$startsWith[$messageContent;$getGuildVar[prefix]]==false]

    ${challengeSnippets.loadGJSON()}
    ${lobbySnippets.loadLobbyVars()}

    $jsonLoad[caught;{}]
    $arrayLoad[caughtRares; ;$toLowerCase[$message]]
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

    ${sumPoints()}
    
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

    ${challengeSnippets.raresLimit()}

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
      
      $if[$or[$get[unlimitedRares];$get[hideRaresLimit]];;
        $if[$arrayLength[limitsContent]==0;  $arrayPush[limitsContent;※ All commons received]  ]

        $addSeparator[Large]
        $addTextDisplay[# $arrayJoin[limitsContent; ]]
      ]
    ;$getGlobalVar[luckyColor]]
    $setUserVar[challengeProgress|$channelID;$env[challengeProgress]]
  `
}

function sumPoints() {
  return `
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
  `
}