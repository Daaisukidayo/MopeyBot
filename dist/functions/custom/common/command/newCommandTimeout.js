"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "newCommandTimeout",
    description: "Adds a special timeout that deletes the command after a specified time.",
    brackets: false,
    params: [
        {
            name: "command",
            description: "The command to delete",
            type: forgescript_1.ArgType.String,
            required: false
        }
    ],
    code: `
    $c[A command sends its message now, an interaction's message is the one to delete]
    $let[isCommand;$or[$isPrefixCommand;$isSlashCommand]]
    $let[messageId;$if[$get[isCommand];$send;$messageID]]

    $let[commandName;$commandKey[$env[command]]]
    $let[timeoutName;$get[commandName]-$authorID]
    $let[duration;$getGlobalVar[$get[commandName]_cooldown]]

    $c[The timeout keeps the variables it is made with, and the parameter is not one it can keep]
    $!jsonDelete[command]

    $c[An interaction moves the timeout of its message further]
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
  `
});
//# sourceMappingURL=newCommandTimeout.js.map