"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'isOneOf',
    description: "Checks whether the string is equal to one of the other strings in the set",
    output: "Boolean",
    params: [
        {
            name: '_string',
        },
        {
            name: '_matches',
            rest: true
        },
    ],
    code: `
    $return[$arrayIncludes[_matches;$env[_string]]]
  `
};
//# sourceMappingURL=isOneOf.js.map