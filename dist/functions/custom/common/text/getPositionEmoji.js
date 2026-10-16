"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "getPositionEmoji",
    description: "Returns an emoji for a given numeric position.",
    output: forgescript_1.ArgType.String,
    params: [
        {
            name: "pos",
            description: "The position to get the emoji for",
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