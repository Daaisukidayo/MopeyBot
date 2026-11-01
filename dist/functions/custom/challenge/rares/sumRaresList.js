"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "sumRaresList",
    description: "totals of a rares list: 'points' and 'rares'",
    output: forgescript_1.ArgType.Json,
    params: [
        {
            name: "raresList",
            description: "caught rares as counts by ID",
            type: forgescript_1.ArgType.Json,
        },
    ],
    code: `
    $jsonLoad[entries;$jsonEntries[raresList]]
    $return[$objectOf[points;$arraySum[$arrayMap[entries;entry;$return[$math[$jsonGet[$getChallengeRare[$jsonGet[entry;0]];points] * $jsonGet[entry;1]]]]];rares;$arraySum[entries;1]]]
  `,
});
//# sourceMappingURL=sumRaresList.js.map