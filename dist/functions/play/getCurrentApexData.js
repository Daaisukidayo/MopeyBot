"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'getCurrentApexData',
    code: `
    $jsonLoad[currentApex;$env[playData;apex]]
    $jsonLoad[allApex;$getGlobalVar[allApex]]
    $jsonLoad[darkApexEmojis;$getGlobalVar[darkApexEmojis]]
    $jsonLoad[res;{}]

    $jsonSet[res;hasAllApex;$arrayEvery[allApex;apex;$arrayIncludes[currentApex;$env[apex]]]]

    $arrayMap[allApex;apex;
      $if[$arrayIncludes[currentApex;$env[apex]];
        $return[$getAnimalVariantInfo[$env[apex];emoji]]
      ;
        $return[$env[darkApexEmojis;$env[apex]]]
      ]
    ;totalApex]

    $jsonSet[res;content;# $arrayJoin[totalApex; ]]
    $return[$env[res]]
  `
};
//# sourceMappingURL=getCurrentApexData.js.map