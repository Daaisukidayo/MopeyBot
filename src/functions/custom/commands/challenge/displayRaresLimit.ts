import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "displayLimitedRares",
  description: "Displays limited rare animals as the V2 component",
  code: `
    $let[difficulty;$env[challengeProgress;difficulty]]
    $let[l;$env[userProfile;language]]

    $jsonLoad[chartLimitsMap;$getGlobalVar[chartLimitsMap]]
    $jsonLoad[chartLimits;$env[$getGlobalVar[chartLimits];$get[difficulty]]]
    $jsonLoad[challengeData;$getGlobalVar[challengeData]]

    $if[$get[difficulty]==0;
      $addContainer[
        $addTextDisplay[$tl[ui.challenge.unlimitedRares.$get[l]]]
      ;$getGlobalVar[luckyColor]]
      $return
    ]

    $if[$arrayIncludes[$env[userProfile;challenge;settings];hideLimit];
      $return
    ]

    $arrayForEach[chartLimits;id;
      $forOf[challengeData;data;
        $if[$env[data;category]==$env[chartLimitsMap;$env[id];category];;$continue]

        $let[limit;$env[chartLimitsMap;$env[id];limit]]
        $jsonLoad[challengeRares;$env[data;rares]]

        $arrayMap[challengeRares;rare;
          $let[animalDisplay;$getAnimalInfo[$env[rare];emoji;0]]
          $let[quantity;$default[$env[challengeProgress;list;$env[rare]];0]]

          $if[$get[quantity]<$get[limit];
            $return[$get[animalDisplay]\`$get[quantity]\`|\`$get[limit]\`]
          ]
        ;content]

        $arrayConcat[limitsContent;limitsContent;content]

        $break
      ]
    ]

    $if[$arrayLength[limitsContent]==0;
      $arrayPush[limitsContent;$tl[ui.challenge.allLimitedReceived.$get[l]]]
    ]

    $addContainer[
      $addTextDisplay[# $arrayJoin[limitsContent; ]]
    ;$getGlobalVar[luckyColor]]
  `
})