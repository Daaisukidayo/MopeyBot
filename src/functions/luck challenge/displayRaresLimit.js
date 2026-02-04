export default {
  name: "displayRaresLimit",
  description: "Displays animals that are limited as the new V2 components",
  params: [
    {
      name: "progress_data",
      type: "Object",
      required: false
    },
    {
      name: "difficulty",
      type: "Number",
      required: false
    },
    {
      name: "user_profile",
      type: "Object",
      required: false
    }
  ],
  brackets: false,
  code: `
    $jsonLoad[UP;$nullish[$env[user_profile];$getProfile]]
    $jsonLoad[CP;$nullish[$env[progress_data];$getProgress]]
  
    $let[dif;$nullish[$env[difficulty];$env[CP;difficulty]]]

    $jsonLoad[chartLimits;$dump[$getGlobalVar[chartLimits];$get[dif]]]
    $jsonLoad[challengeData;$getGlobalVar[challengeData]]

    $if[$get[dif]==0; $c[unlimited rares]

      $addContainer[
        $addTextDisplay[$tl[ui.challenge.unlimitedRares]]
      ;$getGlobalVar[luckyColor]]

    ;

      $if[$advArrayIncludes[$env[UP;challenge;settings];hideLimit];;
        $arrayForEach[chartLimits;obj;
          $loop[$arrayLength[challengeData];
            $jsonLoad[data;$arrayAt[challengeData;$math[$env[i] - 1]]]

            $if[$env[data;category]==$env[obj;category];;$continue]

            $let[limit;$env[obj;limit]]
            $jsonLoad[challengeRares;$env[data;rares]]

            $arrayMap[challengeRares;rare;
              $let[animalDisplay;$getAnimalVariantInfo[$env[rare];emoji]]
              $let[quantity;$default[$env[CP;list;$env[rare]];0]]

              $if[$get[quantity]<$get[limit];
                $return[$get[animalDisplay]\`$get[quantity]\`|\`$get[limit]\`]
              ]
            ;content]

            $arrayConcat[limitsContent;limitsContent;content]

            $break
          ;i;true]
        ]

        $if[$arrayLength[limitsContent]==0;
          $arrayPush[limitsContent;$tl[ui.challenge.allLimitedReceived]]
        ]

        $addContainer[
          $addTextDisplay[# $arrayJoin[limitsContent; ]]
        ;$getGlobalVar[luckyColor]]
      ]
    ]
  `
}