import { ForgeFunction } from "@tryforge/forgescript";

export default new ForgeFunction({
  name: 'getCurrentApexData',
  code: `
    $jsonLoad[currentApex;$env[playData;apex]]
    $jsonLoad[allApex;$getGlobalVar[allApex]]
    $jsonLoad[darkApexEmojis;$getGlobalVar[darkApexEmojis]]
    $jsonLoad[res;{}]

    $jsonSet[res;hasAllApex;$arrayEvery[allApex;apex;$arrayIncludes[currentApex;$env[apex]]]]

    $arrayMap[allApex;apex;
      $if[$arrayIncludes[currentApex;$env[apex]];
        $return[$getAnimalInfo[$env[apex];emoji;0]]
      ;
        $return[$env[darkApexEmojis;$env[apex]]]
      ]
    ;totalApex]

    $jsonSet[res;content;# $arrayJoin[totalApex; ]]
    $return[$env[res]]
  `
})