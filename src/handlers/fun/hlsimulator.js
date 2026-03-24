export default {
  name: 'handleHLSimulator',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile

    $jsonLoad[difficulties;$getGlobalVar[difficulties]]
    $jsonLoad[chartLimits;$getGlobalVar[chartLimits]]

    $let[difficulty;$default[$toTitleCase[$default[$option[difficulty];$message]];$getGlobalVar[defaultDifficulty]]]

    $if[$isNumber[$get[difficulty]]==false;
      $jsonLoad[diff;$tl[data.difficulties]]
      $arrayLoad[diffV;, ;$jsonValues[diff]]
      $let[difficulty;$arrayIndexOf[diffV;$toTitleCase[$get[difficulty]]]]
    ]

    $onlyif[$arrayIncludes[difficulties;$get[difficulty]];
      $arrayMap[difficulties;d;
        $return[$tl[data.difficulties.$env[d]]]
      ;diffList]
      $newError[$tl[ui.hlsimulator.invalidDifficulty;$arrayJoin[diffList;\`, \`]]]
    ]

    $addCooldown
    $defer

    $jsonLoad[cache;$getGlobalVar[hlSimCachedData;{}]]
    $jsonLoad[totalAttempts;$eval[$getGlobalVar[hlSimAttempts];false]]
    $jsonLoad[GLE;$advJsonEntries[$generateLuck[$getGlobalVar[hlSimKey]]]]
    $jsonLoad[rawList;{}]

    $arrayForEach[GLE;entry;
      $jsonLoad[raresArr;$env[entry;1]]
      $jsonLoad[counts;{}]

      $let[attemptsIndex;$arrayFindIndex[totalAttempts;att;$advArrayIncludes[$env[att;0];$env[entry;0]]]]
      $let[attempts;$env[totalAttempts;$get[attemptsIndex];1]]

      $loop[$get[attempts];
        $let[animalID;$arrayRandomValue[raresArr]]

        $if[$env[cache;$get[animalID]];;$continue]

        $let[quantity;$default[$env[counts;$get[animalID]];0]]

        $let[index;$getChartLimitIndex[$get[animalID];$get[difficulty]]]
      
        $if[$get[index]!=-1;
          $jsonLoad[limitChartObj;$env[chartLimits;$get[difficulty];$get[index]]]
          $let[limit;$env[limitChartObj;limit]]

          $if[$get[quantity]==$get[limit];
            $continue
          ]
        ]

        $letSum[quantity;1]
        $!jsonSet[counts;$get[animalID];$get[quantity]]
      ]

      $jsonAssign[rawList;rawList;$env[counts]]
    ]

    $jsonLoad[result;$generateList[$sortList[$env[rawList]];$get[difficulty]]]
    
    $jsonLoad[list;$env[result;l]]
    $let[totalPoints;$env[result;p]]
    $let[totalRares;$env[result;r]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.challenge.completed]]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.challenge.points;$get[totalPoints]]]
      $addTextDisplay[$tl[ui.challenge.rares;$get[totalRares]]]
      $addSeparator[Large]
      $showDesignedList[$env[list]]
    ;$getGlobalVar[luckyColor]]
    $send
  `
}