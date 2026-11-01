"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "addHourOverContainer",
    description: "adds the 'hour's over' notice w/ the button that ends the challenge",
    brackets: true,
    params: [
        {
            name: "userId",
            description: "the user's ID",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "locale",
            description: "the user's language",
            type: forgescript_1.ArgType.String,
        },
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
  `,
});
//# sourceMappingURL=addHourOverContainer.js.map