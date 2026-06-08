"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "displayLimitedRares",
    description: "Displays limited rare animals as the V2 component",
    code: `
    $let[difficulty;$env[challengeProgress;difficulty]]
    $let[l;$env[userProfile;language]]

    $jsonLoad[chartLimitsMap;$getGlobalVar[chartLimitsMap]]
    $jsonLoad[chartLimits;$dump[$getGlobalVar[chartLimits];$get[difficulty]]]
    $jsonLoad[challengeData;$getGlobalVar[challengeData]]

    $if[$get[difficulty]==0;
      $addContainer[
        $addTextDisplay[$tl[$get[l];ui;challenge.unlimitedRares]]
      ;$getGlobalVar[luckyColor]]
      $return
    ]

    $if[$advArrayIncludes[$env[userProfile;challenge;settings];hideLimit];
      $return
    ]

    $arrayForEach[chartLimits;id;
      $loop[$arrayLength[challengeData];
        $jsonLoad[data;$arrayAt[challengeData;$math[$env[i] - 1]]]

        $if[$env[data;category]==$env[chartLimitsMap;$env[id];category];;$continue]

        $let[limit;$env[chartLimitsMap;$env[id];limit]]
        $jsonLoad[challengeRares;$env[data;rares]]

        $arrayMap[challengeRares;rare;
          $let[animalDisplay;$getAnimalVariantInfo[$env[rare];emoji]]
          $let[quantity;$default[$env[challengeProgress;list;$env[rare]];0]]

          $if[$get[quantity]<$get[limit];
            $return[$get[animalDisplay]\`$get[quantity]\`|\`$get[limit]\`]
          ]
        ;content]

        $arrayConcat[limitsContent;limitsContent;content]

        $break
      ;i;true]
    ]

    $if[$arrayLength[limitsContent]==0;
      $arrayPush[limitsContent;$tl[$get[l];ui;challenge.allLimitedReceived]]
    ]

    $addContainer[
      $addTextDisplay[# $arrayJoin[limitsContent; ]]
    ;$getGlobalVar[luckyColor]]
  `
};
//# sourceMappingURL=displayRaresLimit.js.map