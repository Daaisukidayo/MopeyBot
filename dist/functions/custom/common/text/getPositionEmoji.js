"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "getPositionEmoji",
    description: "an emoji for a place, like a medal for the top 3",
    output: forgescript_1.ArgType.String,
    params: [
        {
            name: "pos",
            description: "the place",
            type: forgescript_1.ArgType.Number,
        },
    ],
    code: `
    $return[$switch[$env[pos];
      $case[1;🥇]
      $case[2;🥈]
      $case[3;🥉]
      $case[default;\`#$env[pos]\`]
    ]]
  `,
});
//# sourceMappingURL=getPositionEmoji.js.map