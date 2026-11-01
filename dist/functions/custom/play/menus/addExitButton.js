"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "addExitButton",
    description: "adds the exit button",
    params: [
        {
            name: "playDataVar",
            description: "var w/ the play data",
            type: forgescript_1.ArgType.String,
        },
    ],
    code: `
    $if[$env[$env[playDataVar]]==;$return]
    $ref[playData;$env[playDataVar]]
    $let[l;$jsonGet[userProfile;language]]
    $addActionRow
    $addButton[play_leave-quit-$authorID;$tl[ui.play.buttonLabelQuitGame.$get[l]];Danger;🔚]
  `,
});
//# sourceMappingURL=addExitButton.js.map