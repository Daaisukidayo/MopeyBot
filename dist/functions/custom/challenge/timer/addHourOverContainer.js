"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "addHourOverContainer",
    description: "Adds the notice that the hour of the challenge is over, with the button that ends it.",
    brackets: true,
    params: [
        {
            name: "userId",
            description: "ID of the user.",
            type: forgescript_1.ArgType.String
        },
        {
            name: "locale",
            description: "The user's language.",
            type: forgescript_1.ArgType.String
        }
    ],
    code: `
    $let[l;$env[locale]]
    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.challenge.completed.$get[l]]]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.challenge.completedDescription1.$get[l]]]
      $addTextDisplay[$tl[ui.challenge.completedDescription2.$get[l]]]
      $addSeparator
      $addActionRow
      $addButton[confirmEndingChallenge-$env[userId];$tl[ui.challenge.buttonLabelConfirm.$get[l]];Success;✅]
    ;$getGlobalVar[luckyColor]]
  `
});
//# sourceMappingURL=addHourOverContainer.js.map