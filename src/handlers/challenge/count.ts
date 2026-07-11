import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: 'handleCount',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $getCache[rares;allRares;allRares]
    
    $let[rares;$toLowerCase[$default[$option[rares];$message]]]

    $onlyIf[$get[rares]!=;
      $let[SNORA;$tl[ui.args.shortRaresName.$get[l]]]
      $newError[$tl[ui.errors.usage.$get[l];$if[$guildID==;$getGlobalVar[prefix];$getGuildVar[prefix]]count <$get[SNORA]1> <$get[SNORA]2>...]]
    ]

    $defer

    $arrayLoad[caughtRares; ;$get[rares]]
    $jsonLoad[rawList;{}]
    $arrayCreate[unknownContent]

    $forOf[caughtRares;caughtRare;
      $arrayLoad[keyValue;=;$env[caughtRare]]

      $let[animalId;$getRareAnimalID[$env[keyValue;0]]]
      $let[value;$nullish[$env[keyValue;1];1]]

      $if[$or[$isNumber[$get[value]]==false;$get[animalId]==undefined];
        $arrayPush[unknownContent;\`$env[caughtRare]\`]
        $continue
      ]

      $if[$get[value]>100;
        $let[value;100]
      ]
      
      $if[$get[value]<0;
        $let[value;1]
      ]

      $!jsonSet[rawList;$get[animalId];$get[value]]
    ]

    $jsonLoad[result;$generateList[$sortList[$env[rawList]]]]
      
    $jsonLoad[list;$env[result;l]]
    $let[totalPoints;$env[result;p]]
    $let[totalRares;$env[result;r]]


    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.count.title.$get[l]]]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.challenge.points.$get[l];\`$get[totalPoints]\`]]
      $addTextDisplay[$tl[ui.challenge.rares.$get[l];\`$get[totalRares]\`]]
      $addSeparator
      $showDesignedList[$env[list]]
      $if[$arrayLength[unknownContent]>0;
        $addSeparator[Large]
        $addTextDisplay[$tl[ui.count.unknownRares.$get[l]]]
        $addSeparator[Large]
        $showDesignedList[$env[unknownContent]]
      ]
    ;$getGlobalVar[luckyColor]]
  `
})