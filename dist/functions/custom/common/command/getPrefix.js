"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "getPrefix",
    description: "the server's prefix, or the global one in DMs",
    code: `
    $return[$if[$guildID==;$getGlobalVar[prefix];$getGuildVar[prefix]]]
  `,
});
//# sourceMappingURL=getPrefix.js.map