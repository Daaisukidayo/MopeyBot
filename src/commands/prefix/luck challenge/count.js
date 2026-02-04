export default {
  name: 'count',
  type: 'messageCreate',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown[5s]
    $jsonLoad[allRares;$getGlobalVar[allRares]]
    
    $onlyIf[$message!=;
      $let[SNORA;$tl[ui.args.shortRaresName]]
      $newError[$tl[ui.errors.usage;$getGuildVar[prefix]count <$get[SNORA]1> <$get[SNORA]2>...]]
    ]

    $arrayLoad[caughtRares; ;$toLowerCase[$message]]
    $jsonLoad[rawList;{}]
    $arrayLoad[unknownContent]
    $arrayLoad[displacement]

    $loop[$arrayLength[caughtRares];
      $let[caughtRare;$arrayAt[caughtRares;$math[$env[i] - 1]]]

      $if[$arrayIncludes[allRares;$get[caughtRare]];;
        $arrayPush[unknownContent;\`$get[caughtRare]\`]
        $continue
      ]

      $let[animalID;$getRareAnimalID[$get[caughtRare]]]
      $let[newQuantity;$math[$env[rawList;$get[animalID]] + 1]]
      $!jsonSet[rawList;$get[animalID];$get[newQuantity]]
    ;i;true]

    $loop[$arrayLength[unknownContent];
      $if[$math[($env[i] - 1) % $getGlobalVar[maxRowsInRaresList]]==0;
        $arrayPushJSON[displacement;$arraySplice[unknownContent;0;$getGlobalVar[maxRowsInRaresList]]]
      ]
    ;i;true]

    $arrayMap[displacement;page;
      $return[$arrayJoin[page; ]]
    ;finalUK]

    $jsonLoad[result;$generateList[$sortList[$env[rawList]]]]
      
    $jsonLoad[list;$env[result;l]]
    $let[totalPoints;$env[result;p]]
    $let[totalRares;$env[result;r]]

    $c[===========EMBED===========]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.count.title]]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.challenge.points;\`$get[totalPoints]\`]]
      $addTextDisplay[$tl[ui.challenge.rares;\`$get[totalRares]\`]]
      $addSeparator
      $showDesignedList[$env[list]]
      $if[$arrayLength[finalUK]!=0;
        $addSeparator[Large]
        $addTextDisplay[$tl[ui.count.unknownRares]]
        $addSeparator[Large]
        $showDesignedList[$env[finalUK]]
      ]
    ;$getGlobalVar[luckyColor]]
  `
}