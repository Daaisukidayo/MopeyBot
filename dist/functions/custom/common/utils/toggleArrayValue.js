"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "toggleArrayValue",
    description: "adds the value to the array, or removes it if it's already there",
    params: [
        {
            name: "arrayName",
            description: "the array var's name",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "element",
            description: "the value to add or remove",
            type: forgescript_1.ArgType.String,
        },
    ],
    code: `
    $if[$jsonType[$env[arrayName]]!=array;$return]

    $if[$arrayIncludes[$env[arrayName];$env[element]];
      $arrayRemove[$env[arrayName];$env[element]]
    ;
      $arrayPush[$env[arrayName];$env[element]]
    ]
  `,
});
//# sourceMappingURL=toggleArrayValue.js.map