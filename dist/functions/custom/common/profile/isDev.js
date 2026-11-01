"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "isDev",
    description: "whether dev mode is on in the profile the caller loaded into 'userProfile'. no db reads",
    output: forgescript_1.ArgType.Boolean,
    code: `
    $return[$checkCondition[$jsonGet[userProfile;dev_mode]==1]]
  `,
});
//# sourceMappingURL=isDev.js.map