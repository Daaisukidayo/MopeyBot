"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "subCash",
    description: "Subs the cash amount from a user's profile.",
    params: [
        {
            name: "amount",
            description: "The amount of cash.",
            type: forgescript_1.ArgType.Number,
        },
    ],
    code: `
    $jsonMath[userProfile;MC;-$round[$env[amount]]]
  `,
});
//# sourceMappingURL=subCash.js.map