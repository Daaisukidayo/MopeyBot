"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "getSoccerStealChance",
    description: "Returns the per-mille chance to get the soccer stolen: rarer soccer is stolen more often, higher tier protects it better",
    output: forgescript_1.ArgType.Number,
    brackets: true,
    params: [
        {
            name: "playDataVar",
            description: "The name of the variable that holds the play data.",
            type: forgescript_1.ArgType.String
        },
        {
            name: "soccerType",
            description: "The soccer type (e.g. 'pumpkin', 'umbrella', 'beachball')",
            type: forgescript_1.ArgType.String
        },
        {
            name: "soccerId",
            description: "The ID of the soccer item",
            type: forgescript_1.ArgType.Number
        }
    ],
    code: `
    $ref[playData;$env[playDataVar]]
    $jsonLoad[lossChances;$getGlobalVar[soccerLossChances]]
    $let[tierFactor;$max[$jsonGet[lossChances;stealMinTierFactor];$math[1 - $jsonGet[lossChances;stealTierReduction] * ($jsonGet[playData;tier] - 1)]]]
    $c[The rank is how many soccers of this type are more common than this one]
    $let[chance;$jsonGet[$getPlaySoccer[$env[soccerType];$env[soccerId]];chance]]
    $let[rank;$arrayCount[$jsonGet[$readFile[res/data/playSoccers.json];$env[soccerType]];item;$jsonGet[item;chance]>$get[chance]]]
    $return[$round[$math[($jsonGet[lossChances;stealBase] + $jsonGet[lossChances;stealPerRarity] * $get[rank]) * $get[tierFactor]]]]
  `
});
//# sourceMappingURL=getSoccerStealChance.js.map