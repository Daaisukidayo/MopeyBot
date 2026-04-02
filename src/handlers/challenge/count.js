export default {
  name: 'handleCount',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown

    $jsonLoad[allRares;$getGlobalVar[allRares]]
    
    $let[rares;$toLowerCase[$default[$option[rares];$message]]]

    $onlyIf[$get[rares]!=;
      $let[SNORA;$tl[ui.args.shortRaresName]]
      $newError[$tl[ui.errors.usage;$getGuildVar[prefix]count <$get[SNORA]1> <$get[SNORA]2>...]]
    ]

    $defer

    $arrayLoad[caughtRares; ;$get[rares]]
    $jsonLoad[rawList;{}]
    $arrayCreate[unknownContent]

    $loop[$arrayLength[caughtRares];
      $let[caughtRare;$arrayAt[caughtRares;$math[$env[i] - 1]]]

      $arrayLoad[keyValue;=;$get[caughtRare]]

      $let[animalID;$getRareAnimalID[$env[keyValue;0]]]
      $let[value;$default[$env[keyValue;1];1]]

      $if[$get[animalID]==undefined;
        $arrayPush[unknownContent;\`$get[caughtRare]\`]
        $continue
      ]

      $if[$isNumber[$get[value]]==false;
        $arrayPush[unknownContent;\`$get[caughtRare]\`]
        $continue
      ]

      $if[$get[value]>100;
        $let[value;100]
      ]
      
      $if[$get[value]<0;
        $let[value;1]
      ]

      $!jsonSet[rawList;$get[animalID];$get[value]]
    ;i;true]

    $jsonLoad[result;$generateList[$sortList[$env[rawList]]]]
      
    $jsonLoad[list;$env[result;l]]
    $let[totalPoints;$env[result;p]]
    $let[totalRares;$env[result;r]]


    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.count.title]]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.challenge.points;\`$get[totalPoints]\`]]
      $addTextDisplay[$tl[ui.challenge.rares;\`$get[totalRares]\`]]
      $addSeparator
      $showDesignedList[$env[list]]
      $if[$arrayLength[unknownContent]>0;
        $addSeparator[Large]
        $addTextDisplay[$tl[ui.count.unknownRares]]
        $addSeparator[Large]
        $showDesignedList[$env[unknownContent]]
      ]
    ;$getGlobalVar[luckyColor]]
  `
}