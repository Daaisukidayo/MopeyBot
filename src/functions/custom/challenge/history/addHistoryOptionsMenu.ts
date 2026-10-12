import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "addHistoryOptionsMenu",
  description: "Adds the menu of the options of a history page, used when a page is added or edited.",
  params: [
    {
      name: "customId",
      description: "The custom ID of the menu.",
      type: ArgType.String
    }
  ],
  code: `
    $let[l;$jsonGet[userProfile;language]]
    $addActionRow
    $addStringSelectMenu[$env[customId];$tl[ui.history.menuTitleChooseOptions.$get[l]]]
    $addOption[$tl[ui.history.optionNamePoints.$get[l]];;points]
    $addOption[$tl[ui.history.optionNameRares.$get[l]];;raresQuantity]
    $addOption[$tl[ui.history.optionNamePlayType.$get[l]];;playType]
    $addOption[$tl[ui.history.optionNameDifficulty.$get[l]];;difficulty]
    $addOption[$tl[ui.history.optionNameEndDate.$get[l]];;endDate]
    $addOption[$tl[ui.history.optionNameRaresList.$get[l]];;raresList]
  `
})
