"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "interactionFail",
    description: "Sends a warning message if the user cannot interact with the message",
    code: `
    $let[l;$jsonGet[userProfile;language]]
    $ephemeral 
    $interactionReply[$tl[ui.special.interactionFail.$get[l]]]
  `
});
//# sourceMappingURL=interactionFail.js.map