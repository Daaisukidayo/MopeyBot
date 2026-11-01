"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "addWardrobeBackButton",
    description: "adds a row w/ the wardrobe's Back button",
    params: [
        {
            name: "target",
            description: "where it goes back to: 'menu' (start menu), 'pack' or 'animal' (the tier pick for that), or a tier (its animals)",
            type: forgescript_1.ArgType.String,
        },
    ],
    code: `
    $let[l;$jsonGet[userProfile;language]]
    $addActionRow
    $addButton[wardrobe-back-$env[target]-$authorID;$tl[ui.wardrobe.buttonBack.$get[l]];Secondary;↩️]
  `,
});
//# sourceMappingURL=addWardrobeBackButton.js.map