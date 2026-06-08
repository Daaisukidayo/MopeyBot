"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "interactionFail",
    description: "Sends a warning message if the user cannot interact with the message",
    code: `
    $let[l;$env[userProfile;language]]
    $ephemeral 
    $interactionReply[$tl[$get[l];ui;special.interactionFail]]
  `
};
//# sourceMappingURL=interactionFail.js.map