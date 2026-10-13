"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "getPrefix",
    description: "Returns the prefix of the current server, or the global prefix in DMs.",
    code: `
    $return[$if[$guildID==;$getGlobalVar[prefix];$getGuildVar[prefix]]]
  `
});
//# sourceMappingURL=getPrefix.js.map