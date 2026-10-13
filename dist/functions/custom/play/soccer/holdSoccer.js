"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "holdSoccer",
    description: "Processes one 'Hold' of a soccer: rolls steal/vanish, gives the hold reward and marks the soccer as held. Returns JSON: {outcome: held|stolen|vanished, MC?, XP?}",
    output: forgescript_1.ArgType.Json,
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
        },
        {
            name: "canLose",
            description: "Whether the soccer can be stolen or vanish on this hold (default: true)",
            type: forgescript_1.ArgType.Boolean,
            required: false
        }
    ],
    code: `
    $ref[playData;$env[playDataVar]]
    $c[A hold gives a share of the current XP, bigger for a rarer soccer]
    $let[multiplier;$jsonGet[$getPlaySoccer[$env[soccerType];$env[soccerId]];xpMultiplier]]
    $let[MC;$getSoccerMC[playData;$env[soccerType];$env[soccerId];hold]]
    $let[XP;$max[15;$round[$math[$jsonGet[playData;XP] * $getGlobalVar[soccerHoldXpShare] * $get[multiplier]]]]]

    $if[$nullish[$env[canLose];true];
      $jsonLoad[lossChances;$getGlobalVar[soccerLossChances]]
      $let[stealChance;$getSoccerStealChance[playData;$env[soccerType];$env[soccerId]]]
      $let[lossRoll;$random[1;1000]]

      $c[Dev override: forces this hold's outcome, used once]
      $switch[$jsonGet[playData;devForcedSoccer];
        $case[stolen;$let[lossRoll;0]]
        $case[vanished;$let[lossRoll;$math[$get[stealChance] + 1]]]
        $case[failed;$let[lossRoll;1001]]
        $case[success;$let[lossRoll;1001]]
      ]
      $!jsonDelete[playData;devForcedSoccer]

      $if[$get[lossRoll]<=$math[$get[stealChance] + $jsonGet[lossChances;vanish]];
        $!jsonDelete[playData;heldSoccer]
        $return[$objectOf[outcome;$if[$get[lossRoll]<=$get[stealChance];stolen;vanished]]]
      ]
    ]

    $sumPlayCash[playData;$get[MC]]
    $sumPlayXp[playData;$get[XP]]
    $!jsonSet[playData;heldSoccer;$env[soccerType]_$env[soccerId]]

    $return[$objectOf[outcome;held;MC;$get[MC];XP;$get[XP]]]
  `
});
//# sourceMappingURL=holdSoccer.js.map