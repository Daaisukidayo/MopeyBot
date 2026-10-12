import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "displayLimitedRares",
  description: "Displays limited rare animals as the V2 component",
  params: [
    {
      name: "progressVar",
      description: "The name of the variable that holds the challenge progress.",
      type: ArgType.String
    }
  ],
  code: `
    $ref[progress;$env[progressVar]]
    $let[difficulty;$jsonGet[progress;difficulty]]
    $let[l;$jsonGet[userProfile;language]]

    $if[$get[difficulty]==0;
      $addContainer[
        $addTextDisplay[$tl[ui.challenge.unlimitedRares.$get[l]]]
      ;$getGlobalVar[luckyColor]]
      $return
    ]

    $if[$arrayIncludes[$jsonGet[userProfile;challenge;settings];hideLimit];
      $return
    ]

    $getCache[rares;categoryLimits;categoryLimits]
    $getCache[rares;challengeCategories;challengeCategories]

    $c[Every rare of a limited category that is still below its limit. A limit is [category, limit\\]]
    $jsonLoad[limitsContent;$arrayFlat[$arrayMap[$jsonEntries[categoryLimits;$get[difficulty]];limit;
      $return[$arrayMap[$default[$jsonGet[challengeCategories;$jsonGet[limit;0]];$arrayOf];rare;
        $let[quantity;$default[$jsonGet[progress;raresList;$env[rare]];0]]
        $if[$get[quantity]<$jsonGet[limit;1];
          $return[$getAnimalInfo[$env[rare];emoji;0]\`$get[quantity]\`|\`$jsonGet[limit;1]\`]
        ]
      ]]
    ]]]

    $if[$jsonSize[limitsContent]==0;
      $arrayPush[limitsContent;$tl[ui.challenge.allLimitedReceived.$get[l]]]
    ]

    $addContainer[
      $addTextDisplay[# $arrayJoin[limitsContent; ]]
    ;$getGlobalVar[luckyColor]]
  `
})
