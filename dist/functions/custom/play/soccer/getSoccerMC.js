"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "getSoccerMC",
    description: "random coins for a soccer: a hold = a share (soccerHoldMCShare) of the tier's goal coins (soccerGoalMC) times the soccer's multiplier w/ its rare part boosted (soccerMCRareBonus), a goal = a multiple of that (soccerGoalMCMultiplier)",
    output: forgescript_1.ArgType.Number,
    brackets: true,
    params: [
        {
            name: "playDataVar",
            description: "var w/ the play data",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "soccerType",
            description: "the soccer type, like 'pumpkin', 'umbrella' or 'beachball'",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "soccerId",
            description: "the soccer item's ID",
            type: forgescript_1.ArgType.Number,
        },
        {
            name: "action",
            description: "what the coins are for: 'goal' or 'hold'",
            type: forgescript_1.ArgType.String,
        },
    ],
    code: `
    $ref[playData;$env[playDataVar]]
    $c[hold = a share of the tier's goal coins, rarer soccers way more (the part of the multiplier above 1 gets boosted). goal = a multiple of a hold]
    $let[multiplier;$math[1 + ($jsonGet[$getPlaySoccer[$env[soccerType];$env[soccerId]];mcMultiplier] - 1) * $getGlobalVar[soccerMCRareBonus]]]
    $jsonLoad[reward;$jsonGet[$getGlobalVar[soccerGoalMC];$jsonGet[playData;tier]]]
    $let[coins;$round[$math[$random[$jsonGet[reward;0];$jsonGet[reward;1]] * $getGlobalVar[soccerHoldMCShare] * $get[multiplier]]]]
    $if[$env[action]==goal;$let[coins;$math[$get[coins] * $getGlobalVar[soccerGoalMCMultiplier]]]]
    $return[$get[coins]]
  `,
});
//# sourceMappingURL=getSoccerMC.js.map