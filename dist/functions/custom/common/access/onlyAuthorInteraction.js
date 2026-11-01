"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "onlyAuthorInteraction",
    description: "warns the user they're not the author",
    code: `
    $let[l;$jsonGet[userProfile;language]]
    $ephemeral
    $interactionReply[$tl[ui.special.interactionInvalidAuthor.$get[l]]]
  `,
});
//# sourceMappingURL=onlyAuthorInteraction.js.map