"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'send',
    description: "Sends an interaction or default message and returns it's id",
    code: `
    $return[$if[$or[$isSlashCommand;$isCommand==false];$interactionReply[;true];$sendMessage[$channelID;;true]]]
  `
};
//# sourceMappingURL=send.js.map