"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "getPlayData",
    description: "the author's game as a PlaySession instance, a fresh one if there's none",
    code: `
    $jsonLoad[playData;$getUserVar[userPlayData]]
    $c[no game yet = a new one]
    $if[$env[playData]==;$new[playData;PlaySession]]
    $return[$env[playData]]
  `,
});
//# sourceMappingURL=getPlayData.js.map