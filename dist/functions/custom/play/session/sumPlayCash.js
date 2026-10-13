"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "sumPlayCash",
    params: [
        {
            name: "playDataVar",
            description: "The name of the variable that holds the play data.",
            type: forgescript_1.ArgType.String
        },
        {
            name: "amount",
            description: "The amount of coins to add.",
            type: forgescript_1.ArgType.Number
        }
    ],
    code: `
    $ref[playData;$env[playDataVar]]
    $jsonMath[playData;MC;$round[$env[amount]]]
  `
});
//# sourceMappingURL=sumPlayCash.js.map