"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "newCommandTimeout",
    description: "sets a timeout that deletes the command's msg later",
    brackets: false,
    params: [
        {
            name: "command",
            description: "the command to delete",
            type: forgescript_1.ArgType.String,
            required: false,
        },
    ],
    code: `
    $c[commands send their msg right now, for interactions the msg to delete is the clicked one]
    $let[isCommand;$or[$isPrefixCommand;$isSlashCommand]]
    $let[messageId;$if[$get[isCommand];$send;$messageID]]

    $let[commandName;$commandKey[$env[command]]]
    $let[timeoutName;$get[commandName]-$authorID]
    $let[duration;$getGlobalVar[$get[commandName]_cooldown]]

    $c[timeouts keep the vars they were made with, params don't count]
    $!jsonDelete[command]

    $c[each interaction pushes the msg timeout back]
    $if[$get[isCommand]==false;
      $if[$rescheduleTimer[timeout;$get[timeoutName];$get[duration]];$return]
    ]

    $!stopCommandTimeout[$get[commandName]]

    $setTimeout[
      $try[
        $deleteMessage[$channelID;$get[messageId]]
      ;
        $logger[Error;$env[e]]
      ;e]
    ;$get[duration];$get[timeoutName]]
  `,
});
//# sourceMappingURL=newCommandTimeout.js.map