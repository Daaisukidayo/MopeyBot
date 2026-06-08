"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "random",
    description: "Generates a random number between minimal and maximal (inclusive).",
    params: [
        {
            name: "_min",
            description: "The minimum number (inclusive).",
            type: "Number",
            required: true
        },
        {
            name: "_max",
            description: "The maximum number (inclusive).",
            type: "Number",
            required: true
        },
        {
            name: "_decimals",
            description: "Whether to include decimals.",
            type: "Boolean",
            required: false
        },
    ],
    output: "Number",
    code: `
    $return[$randomNumber[$env[_min];$math[$env[_max] + 1];$nullish[$env[_decimals];false]]]
  `
};
//# sourceMappingURL=random.js.map