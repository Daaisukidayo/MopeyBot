"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "send",
    description: "sends the interaction reply or a regular msg and returns its id",
    output: forgescript_1.ArgType.Number,
    code: `
    $return[$if[$or[$isSlashCommand;$isCommand==false];$interactionReply[;true];$sendMessage[$channelID;;true]]]
  `,
});
//# sourceMappingURL=send.js.map