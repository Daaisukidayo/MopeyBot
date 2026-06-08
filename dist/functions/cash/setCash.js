"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "setCash",
    description: "Sets the cash amount for a user's profile.",
    params: [
        {
            name: "_amount",
            description: "The amount of cash.",
            type: "Number",
            required: true,
        }
    ],
    code: `
    $!jsonSet[userProfile;MC;$round[$env[_amount]]]
  `
};
//# sourceMappingURL=setCash.js.map