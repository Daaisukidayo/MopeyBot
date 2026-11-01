"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "getCurrentApexData",
    params: [
        {
            name: "playDataVar",
            description: "var w/ the play data",
            type: forgescript_1.ArgType.String,
        },
    ],
    code: `
    $ref[playData;$env[playDataVar]]
    $jsonLoad[currentApex;$jsonGet[playData;apex]]
    $jsonLoad[allApex;$getGlobalVar[allApex]]
    $jsonLoad[darkApexEmojis;$getGlobalVar[darkApexEmojis]]
    $c[owned apexes get their emoji, the rest the dark version]
    $arrayMap[allApex;apex;
      $return[$if[$arrayIncludes[currentApex;$env[apex]];$getAnimalInfo[$env[apex];emoji;0];$jsonGet[darkApexEmojis;$env[apex]]]]
    ;totalApex]

    $return[$objectOf[hasAllApex;$arrayEvery[allApex;apex;$arrayIncludes[currentApex;$env[apex]]];content;# $arrayJoin[totalApex; ]]]
  `,
});
//# sourceMappingURL=getCurrentApexData.js.map