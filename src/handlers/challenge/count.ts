import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "handleCount",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $getCache[rares;activeRares;activeRares]
    
    $let[rares;$toLowerCase[$default[$option[rares];$message]]]

    $onlyIf[$get[rares]!=;
      $let[prefix;$getPrefix]
      $let[SNORA;$tl[ui.args.shortRaresName.$get[l]]]
      $newError[$tl[ui.errors.usage.$get[l];$get[prefix]count <$get[SNORA]1> <$get[SNORA]2>...]]
    ]

    $defer

    $arrayLoad[caughtRares; ;$get[rares]]
    $jsonLoad[rawList;$objectOf]
    $arrayLoad[unknownContent]

    $c[A count above 100 becomes 100, a negative one becomes 1]
    $arrayForEach[caughtRares;caughtRare;
      $arrayLoad[keyValue;=;$env[caughtRare]]
      $let[value;$nullish[$jsonGet[keyValue;1];1]]

      $if[$and[$isNumber[$get[value]];$arrayIncludes[activeRares;$jsonGet[keyValue;0]]];
        $!jsonSet[rawList;$getRareAnimalID[$jsonGet[keyValue;0]];$if[$get[value]<0;1;$min[$get[value];100]]]
      ;
        $arrayPush[unknownContent;\`$env[caughtRare]\`]
      ]
    ]

    $jsonLoad[result;$generateList[$env[rawList]]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.count.title.$get[l]]]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.challenge.points.$get[l];\`$jsonGet[result;p]\`]]
      $addTextDisplay[$tl[ui.challenge.rares.$get[l];\`$jsonGet[result;r]\`]]
      $addSeparator
      $showDesignedList[$jsonGet[result;l]]
      $if[$jsonSize[unknownContent]>0;
        $addSeparator[Large]
        $addTextDisplay[$tl[ui.count.unknownRares.$get[l]]]
        $addSeparator[Large]
        $showDesignedList[$env[unknownContent]]
      ]
    ;$getGlobalVar[luckyColor]]
  `
})
