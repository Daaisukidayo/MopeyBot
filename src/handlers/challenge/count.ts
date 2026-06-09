export default {
  name: 'handleCount',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $getCache[allRares;allRares]
    
    $let[rares;$toLowerCase[$default[$option[rares];$message]]]

    $onlyIf[$get[rares]!=;
      $let[SNORA;$tl[$get[l];ui;args.shortRaresName]]
      $newError[$tl[$get[l];ui;errors.usage;$if[$guildID==;$getGlobalVar[prefix];$getGuildVar[prefix]]count <$get[SNORA]1> <$get[SNORA]2>...]]
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
      $addTextDisplay[$tl[$get[l];ui;count.title]]
      $addSeparator[Large]
      $addTextDisplay[$tl[$get[l];ui;challenge.points;\`$get[totalPoints]\`]]
      $addTextDisplay[$tl[$get[l];ui;challenge.rares;\`$get[totalRares]\`]]
      $addSeparator
      $showDesignedList[$env[list]]
      $if[$arrayLength[unknownContent]>0;
        $addSeparator[Large]
        $addTextDisplay[$tl[$get[l];ui;count.unknownRares]]
        $addSeparator[Large]
        $showDesignedList[$env[unknownContent]]
      ]
    ;$getGlobalVar[luckyColor]]
  `
}