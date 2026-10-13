"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "toggleArrayValue",
    description: "Toggles an element in the specified array: adds it if missing, removes it if already present.",
    params: [
        {
            name: "arrayName",
            description: "The name of the array variable to modify.",
            type: forgescript_1.ArgType.String
        },
        {
            name: "element",
            description: "The value to add or remove from the array.",
            type: forgescript_1.ArgType.String
        }
    ],
    code: `
    $if[$jsonType[$env[arrayName]]!=array;$return]

    $if[$arrayIncludes[$env[arrayName];$env[element]];
      $arrayRemove[$env[arrayName];$env[element]]
    ;
      $arrayPush[$env[arrayName];$env[element]]
    ]
  `
});
//# sourceMappingURL=toggleArrayValue.js.map