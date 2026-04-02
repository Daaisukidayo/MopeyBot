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

    $jsonLoad[events;$env[challengeProgress;events]]
    $jsonLoad[raresList;$env[challengeProgress;list]]

    $c[Parse arguments from options or message content]
    $let[arg1;$toLowerCase[$default[$option[rare];$message[0]]]]
    $let[arg2;$default[$option[action];$message[1]]]
    $let[arg3;$toLowerCase[$default[$option[count];$message[2]]]]
    
    $c[Check basic usage and action type]
    $onlyIf[$and[$get[arg1]!=;$isOneOf[$get[arg2];+;-]];
      $newError[$tl[ui.errors.usage;$getGuildVar[prefix]editlist <$tl[ui.args.shortRaresName]> [+ | -\\] <$tl[ui.args.amount]>]]
    ]

    $c[Check if the animal rare exists in the global list]
    $onlyIf[$arrayIncludes[allRares;$get[arg1]];
      $newError[$tl[ui.editlist.invalidRare;$get[arg1]]]
    ]

    $c[Ensure "all" is only used for removal, otherwise check if count is a positive number]
    $onlyIf[$or[$and[$get[arg3]==all;$get[arg2]==-];$and[$isNumber[$get[arg3]];$get[arg3]>0]];
      $newError[$tl[ui.editlist.invalidNumber]]
    ]

    $c[Determine the state string based on the action symbol]
    $let[state;$function[
      $return[$switch[$get[arg2];
        $case[-;removed]
        $case[+;added]
      ]]
    ]]

    $let[animalID;$getRareAnimalID[$get[arg1]]]
    $let[animalDisplay;$getAnimalVariantInfo[$get[animalID];emoji]]
    $let[oldQuantity;$default[$env[raresList;$get[animalID]];0]]
    $let[rares;0]
    $let[points;0]

    $c[Check if user tries to remove something they don't have]
    $if[$and[$env[raresList;$get[animalID]]==;$get[arg2]==-];
      $newError[$tl[ui.editlist.notInList;$get[animalDisplay]]]
    ]

    $defer
    
    $if[$get[arg3]==all;
      $c[If removing all, actual difference equals the old quantity]
      $let[actualDiff;$get[oldQuantity]]
      $!jsonDelete[raresList;$get[animalID]]
      $let[updatedQuantity;0]
    ;
      $c[Calculate temporary new quantity before applying limits]
      $let[tempNew;$math[$get[oldQuantity] $get[arg2] $get[arg3]]]

      $if[$get[tempNew]<=0;
        $c[If result is zero or negative, delete entry. Actual change is the entire old quantity]
        $let[actualDiff;$get[oldQuantity]]
        $!jsonDelete[raresList;$get[animalID]]
        $let[updatedQuantity;0]
      ;
        $c[If positive, apply difficulty-based limits]
        $let[difficulty;$env[challengeProgress;difficulty]]
        $!jsonSet[raresList;$get[animalID];$changeRareAmountIfExceededLimit[$get[tempNew];$get[animalID];$get[difficulty]]]
        
        $let[updatedQuantity;$env[raresList;$get[animalID]]]
        $c[Actual difference is the absolute change after limits were applied]
        $let[actualDiff;$abs[$math[$get[updatedQuantity] - $get[oldQuantity]]]]
      ]
    ]

    $c[Recalculate list UI, total points, and total rares]
    $jsonLoad[result;$generateList[$sortList[$env[raresList]]]]
    $jsonLoad[list;$env[result;l]]

    $c[Final verification: check if any changes actually occurred]
    $if[$get[oldQuantity]==$get[updatedQuantity];
      $let[state;failed]
      $c[On failure, show the quantity user TRIED to add/remove for better feedback]
      $let[count;$if[$get[arg3]==all;$get[oldQuantity];$get[arg3]]]
    ;
      $c[On success, update points/counts and save progress]
      $let[points;$env[result;p]]
      $let[rares;$env[result;r]]

      $!jsonSet[challengeProgress;list;$env[raresList]]
      $!jsonSet[challengeProgress;rares;$get[rares]]
      $!jsonSet[challengeProgress;points;$get[points]]
      $saveProgress
      
      $c[On success, count is the actual value changed]
      $let[count;$get[actualDiff]]
    ]

    $addContainer[
      $addAuthorDisplay

      $c[Display localized status message (Added/Removed/Failed)]
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