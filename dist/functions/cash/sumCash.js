"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "sumCash",
    description: "Sums the cash amount to a user's profile.",
    params: [
        {
            name: "_amount",
            description: "The amount of cash.",
            type: "Number",
            required: true,
        }
    ],
    code: `
    $!jsonSum[userProfile;MC;$round[$env[_amount]]]
  `
};
//# sourceMappingURL=sumCash.js.map