export default {
  name: "editlist",
  aliases: ["elist", "el"],
  type: "messageCreate",
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
    
    $let[arg1;$toLowerCase[$message[0]]]
    $let[arg2;$message[1]]
    $let[arg3;$toLowerCase[$message[2]]]
    
    $onlyIf[$and[$get[arg1]!=;$includes[$get[arg2];+;-]];
      $newError[$tl[ui.errors.usage;$getGuildVar[prefix]$commandName <$tl[ui.args.shortRaresName]> \\[+ | -\\] <$tl[ui.args.amount]>]]
    ]

    $onlyIf[$arrayIncludes[allRares;$get[arg1]];
      $newError[$tl[ui.$commandName.invalidRare;$get[arg1]]]
    ]

    $onlyIf[$or[$and[$get[arg3]==all;$get[arg2]==-];$and[$isNumber[$get[arg3]];$get[arg3]>0]];
      $newError[$tl[ui.$commandName.invalidNumber]]
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
      $newError[$tl[ui.$commandName.notInList;$get[animalDisplay]]]
    ]
    
    $if[$get[arg3]==all;
      $let[count;$get[quantity]]
      $!jsonDelete[raresList;$get[animalID]]
    ;
      $let[quantity;$math[$get[quantity] $get[arg2] $get[count]]]
      $!jsonSet[raresList;$get[animalID];$get[quantity]]

      $if[$get[quantity]<=0;
        $!jsonDelete[raresList;$get[animalID]]
      ]
    ]

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

      $addTextDisplay[$tl[ui.$commandName.$get[state];$get[count];$get[animalDisplay]]]
      
      $addSeparator[Large]
      $addTextDisplay[$showPoints]
      $addTextDisplay[$showRares]
      $addTextDisplay[$showTime]
      $addSeparator[Large]
      $showDesignedList[$env[list]]
    ;$getGlobalVar[luckyColor]]
  `
}