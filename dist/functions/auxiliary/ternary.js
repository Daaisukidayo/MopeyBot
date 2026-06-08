"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'ternary',
    params: [
        {
            name: '_leftValue',
            required: true,
        },
        {
            name: '_rightValue',
            required: true,
        },
    ],
    code: `
    $if[$isOneOf[$env[_leftValue];false;];
      $return[$env[_rightValue]]
    ]

    $return[$env[_leftValue]]
  `
};
//# sourceMappingURL=ternary.js.map