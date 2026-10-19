"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "getPlayData",
    description: "Returns the author's game as a PlaySession instance, a new one when there is none.",
    code: `
    $jsonLoad[playData;$getUserVar[userPlayData]]
    $c[A player without a game gets a new one]
    $if[$env[playData]==;$new[playData;PlaySession]]
    $return[$env[playData]]
  `,
});
//# sourceMappingURL=getPlayData.js.map