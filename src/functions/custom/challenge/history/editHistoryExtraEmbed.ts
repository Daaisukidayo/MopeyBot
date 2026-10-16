import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "editHistoryExtraEmbed",
  params: [
    {
      name: "pageVar",
      description: "The name of the variable that holds the history page being edited.",
      type: ArgType.String,
    },
    {
      name: "historyVar",
      description: "The name of the variable that holds the shown history pages.",
      type: ArgType.String,
    },
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
  `,
})
