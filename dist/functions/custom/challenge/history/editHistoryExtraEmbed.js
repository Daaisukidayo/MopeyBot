"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "editHistoryExtraEmbed",
    params: [
        {
            name: "pageVar",
            description: "The name of the variable that holds the history page being edited.",
            type: forgescript_1.ArgType.String
        },
        {
            name: "historyVar",
            description: "The name of the variable that holds the shown history pages.",
            type: forgescript_1.ArgType.String
        }
    ],
    code: `
    $ref[page;$env[pageVar]]
    $ref[history;$env[historyVar]]
    $let[l;$jsonGet[userProfile;language]]
    $let[cachedIndex;$getMessageVar[cachedHistoryPageIndex;$messageID]]
    $if[$get[cachedIndex]==;
      $let[cachedIndex;$arrayFindIndex[history;data;$jsonGet[data;id]==$jsonGet[page;id]]]
      $setMessageVar[cachedHistoryPageIndex;$get[cachedIndex];$messageID]
    ]

    $addContainer[
      $addActionRow
      $addButton[showHistory-saveEditChanges-$authorID;$tl[ui.history.buttonLabelSaveChanges.$get[l]];Success;;$and[$get[cachedIndex]!=-1;$jsonEquals[page;$jsonGet[history;$get[cachedIndex]]]]]
      $addButton[editHistory-resetEditChanges-$authorID;$tl[ui.history.buttonLabelResetChanges.$get[l]];Secondary]
      $addButton[showHistory-cancelEditChanges-$authorID;$tl[ui.history.buttonLabelCancelChanges.$get[l]];Danger]
    ;$getGlobalVar[luckyColor]]
  `
});
//# sourceMappingURL=editHistoryExtraEmbed.js.map