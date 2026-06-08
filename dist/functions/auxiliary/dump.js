"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'dump',
    description: "Just better $env",
    params: [
        {
            name: "_json",
            type: "Json",
            required: true
        },
        {
            name: "_keys",
            required: true,
            rest: true
        }
    ],
    code: `
    $jsonLoad[value;$env[_json]]
    $if[$typeof[$env[value]]==string;
      $jsonLoad[value;$env[$env[value]]]
    ]
    $if[$typeof[$env[value]]!=object;
      $return[undefined]
    ]

    $loop[$arrayLength[_keys];
      $jsonSet[value;$env[value;$env[_keys;$sub[$env[i];1]]]]
    ;i;true]
    $return[$default[$env[value];undefined]]
  `
};
//# sourceMappingURL=dump.js.map