"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "robotCheck",
    description: "checks if the user is a bot",
    code: `
    $addTextDisplay[## _Are you a robot?_]
    $addActionRow
    $addButton[notARobot-$authorID;I'm not a robot;Success;🤖]
    $!send
  `,
});
//# sourceMappingURL=robotCheck.js.map