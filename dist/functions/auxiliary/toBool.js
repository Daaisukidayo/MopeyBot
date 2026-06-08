"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'toBool',
    params: [
        {
            name: "_argument",
            required: true
        }
    ],
    code: `
    $return[$switch[$typeof[$env[_argument]];
      $case[boolean;$env[_argument]]
      $case[number;$checkCondition[$env[_argument]!=0]]
      $case[object;$checkCondition[$env[_argument]!=null]]
      $case[string;$checkCondition[$env[_argument]!=]]
      $case[undefined;false]
      $case[default;false]
    ]]
  `
};
//# sourceMappingURL=toBool.js.map