"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "advArrayLength",
    description: "Get the length of an array",
    params: [
        {
            name: "_array",
            description: "Array or it's name",
            required: true
        }
    ],
    code: `
    $jsonLoad[array;$env[_array]]
    $if[$typeof[$env[array]]==string;
      $jsonLoad[array;$env[$env[array]]]
    ]
    $if[$env[array]==;
      $return[-1]
    ]
    $return[$if[$isArray[$env[array]];$arrayLength[array];-1]]
  `
};
//# sourceMappingURL=arrayLength.js.map