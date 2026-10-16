"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "limitRareCount",
    description: "Returns the amount of a rare animal, lowered to the limit of its category in the difficulty.",
    output: forgescript_1.ArgType.Number,
    params: [
        {
            name: "amount",
            description: "Amount of the rare animal.",
            type: forgescript_1.ArgType.Number,
        },
        {
            name: "rareAnimalId",
            description: "ID of the rare animal.",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "difficulty",
            description: "The difficulty whose limits apply.",
            type: forgescript_1.ArgType.Number,
        },
    ],
    code: `
    $c[Limits per difficulty come from cacheAllRares, an unlimited category has none]
    $getCache[rares;categoryLimits;categoryLimits]
    $let[limit;$jsonGet[categoryLimits;$env[difficulty];$jsonGet[$getChallengeRare[$env[rareAnimalId]];category]]]
    $return[$if[$get[limit]==;$env[amount];$min[$env[amount];$get[limit]]]]
  `,
});
//# sourceMappingURL=limitRareCount.js.map