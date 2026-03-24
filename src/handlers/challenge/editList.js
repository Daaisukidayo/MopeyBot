export default {
  name: 'handleEditlist',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile

    $isActiveChallenge
    $jsonLoad[challengeProgress;$getProgress]

    $jsonLoad[allRares;$getGlobalVar[allRares]]
    $jsonLoad[chartLimits;$getGlobalVar[chartLimits]]

    $jsonLoad[events;$env[challengeProgress;events]]
    $jsonLoad[raresList;$env[challengeProgress;list]]

    
    $let[arg1;$toLowerCase[$default[$option[rare];$message[0]]]]
    $let[arg2;$default[$option[action];$message[1]]]
    $let[arg3;$toLowerCase[$default[$option[count];$message[2]]]]
    
    $onlyIf[$and[$get[arg1]!=;$isOneOf[$get[arg2];+;-]];
      $newError[$tl[ui.errors.usage;$getGuildVar[prefix]editlist <$tl[ui.args.shortRaresName]> [+ | -\\] <$tl[ui.args.amount]>]]
    ]

    $onlyIf[$arrayIncludes[allRares;$get[arg1]];
      $newError[$tl[ui.editlist.invalidRare;$get[arg1]]]
    ]

    $onlyIf[$or[$and[$get[arg3]==all;$get[arg2]==-];$and[$isNumber[$get[arg3]];$get[arg3]>0]];
      $newError[$tl[ui.editlist.invalidNumber]]
    ]

    $let[state;$function[
      $return[$switch[$get[arg2];
        $case[-;removed]
        $case[+;added]
      ]]
    ]]

    $let[animalID;$getRareAnimalID[$get[arg1]]]
    $let[animalDisplay;$getAnimalVariantInfo[$get[animalID];emoji]]
    $let[count;$get[arg3]]
    $let[quantity;$default[$env[raresList;$get[animalID]];0]]
    $let[rares;0]
    $let[points;0]

    $if[$and[$env[raresList;$get[animalID]]==;$get[arg2]==-];
      $newError[$tl[ui.editlist.notInList;$get[animalDisplay]]]
    ]

    $defer
    
    $if[$get[arg3]==all;
      $!jsonDelete[raresList;$get[animalID]]
    ;
      $let[quantity;$math[$get[quantity] $get[arg2] $get[count]]]

      $if[$get[quantity]<=0;
        $!jsonDelete[raresList;$get[animalID]]
      ;
        $let[difficulty;$env[challengeProgress;difficulty]]
        $let[index;$getChartLimitIndex[$get[animalID];$get[difficulty]]]
      
        $if[$get[index]!=-1;
          $jsonLoad[limitChartObj;$env[chartLimits;$get[difficulty];$get[index]]]
          $let[limit;$env[limitChartObj;limit]]

          $if[$get[quantity]>$get[limit];
            $let[quantity;$get[limit]]
          ]
        ]
        
        $!jsonSet[raresList;$get[animalID];$get[quantity]]
      ]
    ]

    $let[count;$get[quantity]]

    $jsonLoad[result;$generateList[$sortList[$env[raresList]]]]

    $jsonLoad[list;$env[result;l]]
    $let[points;$env[result;p]]
    $let[rares;$env[result;r]]

    $!jsonSet[challengeProgress;list;$env[raresList]]
    $!jsonSet[challengeProgress;rares;$get[rares]]
    $!jsonSet[challengeProgress;points;$get[points]]
    $saveProgress

    $addContainer[
      $addAuthorDisplay

      $addTextDisplay[$tl[ui.editlist.$get[state];$get[count];$get[animalDisplay]]]
      
      $addSeparator[Large]
      $addTextDisplay[$showPoints]
      $addTextDisplay[$showRares]
      $addTextDisplay[$showTime]
      $addSeparator[Large]
      $showDesignedList[$env[list]]
    ;$getGlobalVar[luckyColor]]
  `
}