"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "getSoccerMC",
    description: "Returns a random coin reward for a soccer: a hold gives a share (soccerHoldMCShare) of the player's tier goal coins (soccerGoalMC) times the soccer's multiplier with its rare part grown (soccerMCRareBonus), a goal a multiple of that (soccerGoalMCMultiplier)",
    output: forgescript_1.ArgType.Number,
    brackets: true,
    params: [
        {
            name: "playDataVar",
            description: "The name of the variable that holds the play data.",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "soccerType",
            description: "The soccer type (e.g. 'pumpkin', 'umbrella', 'beachball')",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "soccerId",
            description: "The ID of the soccer item",
            type: forgescript_1.ArgType.Number,
        },
        {
            name: "action",
            description: "What the reward is for: 'goal' or 'hold'",
            type: forgescript_1.ArgType.String,
        },
    ],
    code: `
    $ref[playData;$env[playDataVar]]
    $c[A hold gives a share of the tier's goal coins, a rarer soccer much more: the part of its multiplier above 1 grows. A goal gives a multiple of a hold]
    $let[multiplier;$math[1 + ($jsonGet[$getPlaySoccer[$env[soccerType];$env[soccerId]];mcMultiplier] - 1) * $getGlobalVar[soccerMCRareBonus]]]
    $jsonLoad[reward;$jsonGet[$getGlobalVar[soccerGoalMC];$jsonGet[playData;tier]]]
    $let[coins;$round[$math[$random[$jsonGet[reward;0];$jsonGet[reward;1]] * $getGlobalVar[soccerHoldMCShare] * $get[multiplier]]]]
    $if[$env[action]==goal;$let[coins;$math[$get[coins] * $getGlobalVar[soccerGoalMCMultiplier]]]]
    $return[$get[coins]]
  `,
});
//# sourceMappingURL=getSoccerMC.js.map