"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'advJsonKeys',
    params: [
        {
            name: "_json",
            description: "JSON or it's name",
            required: true
        },
    ],
    output: "Json",
    code: `
    $jsonLoad[json;$env[_json]]
    $if[$typeof[$env[json]]==string;
      $jsonLoad[json;$env[$env[json]]]
    ]
    $if[$typeof[$env[json]]!=object;
      $return[[\\]]
    ]
    $return[$jsonKeys[json]]
  `
};
//# sourceMappingURL=advancedJsonKeys.js.map