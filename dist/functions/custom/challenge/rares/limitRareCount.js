"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "limitRareCount",
    description: "the rare's count, clamped to its category cap in the difficulty",
    output: forgescript_1.ArgType.Number,
    params: [
        {
            name: "amount",
            description: "how many of the rare",
            type: forgescript_1.ArgType.Number,
        },
        {
            name: "rareAnimalId",
            description: "the rare's ID",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "difficulty",
            description: "the difficulty whose caps apply",
            type: forgescript_1.ArgType.Number,
        },
    ],
    code: `
    $c[caps per difficulty from cacheAllRares, uncapped categories have none]
    $getCache[rares;categoryLimits;categoryLimits]
    $let[limit;$jsonGet[categoryLimits;$env[difficulty];$jsonGet[$getChallengeRare[$env[rareAnimalId]];category]]]
    $return[$if[$get[limit]==;$env[amount];$min[$env[amount];$get[limit]]]]
  `,
});
//# sourceMappingURL=limitRareCount.js.map