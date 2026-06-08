"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "separate",
    description: "Separates a number with a specified separator.",
    params: [
        {
            name: "_number",
            description: "The number to separate.",
            type: "Number",
            required: true,
        },
        {
            name: "_separator",
            description: "The separator to use.",
            required: false,
        }
    ],
    code: `
    $return[$separateBigint[$env[_number];$nullish[$env[_separator];$getGlobalVar[numberSeparator]]]]
  `
};
//# sourceMappingURL=separate.js.map