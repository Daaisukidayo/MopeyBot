import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "addHistoryExtraEmbed",
  params: [
    {
      name: "pageVar",
      description: "The name of the variable that holds the history page being added.",
      type: ArgType.String,
    },
  ],
  code: `
    $ref[page;$env[pageVar]]
    $let[l;$jsonGet[userProfile;language]]
    $addContainer[
      $addActionRow
      $addButton[addHistory-uploadNewHistoryPage-$authorID;$tl[ui.addhistory.buttonLabelUpload.$get[l]];Success;;$or[$jsonGet[page;points]==0;$jsonGet[page;rares]==0;$jsonGet[page;endDate]==0;$jsonSize[page;raresList]==0]]
      $addButton[addHistory-resetNewHistoryPage-$authorID;$tl[ui.addhistory.buttonLabelReset.$get[l]];Secondary]
      $addButton[addHistory-cancelNewHistoryPage-$authorID;$tl[ui.addhistory.buttonLabelCancel.$get[l]];Primary]
    ;$getGlobalVar[luckyColor]]
  `,
})
