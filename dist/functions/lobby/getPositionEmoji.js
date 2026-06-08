"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'getPositionEmoji',
    params: [
        {
            name: '_pos',
            description: 'The position to get the emoji for',
            type: 'Number',
            required: true,
        },
    ],
    code: `
    $return[$switch[$env[_pos];
      $case[1;🥇]
      $case[2;🥈]
      $case[3;🥉]
      $case[default;\`#$env[_pos]\`]
    ]]
  `
};
//# sourceMappingURL=getPositionEmoji.js.map