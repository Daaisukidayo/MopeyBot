import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "addWardrobeBackButton",
  description: "adds a row w/ the wardrobe's Back button",
  params: [
    {
      name: "target",
      description:
        "where it goes back to: 'menu' (start menu), 'pack' or 'animal' (the tier pick for that), or a tier (its animals)",
      type: ArgType.String,
    },
  ],
  code: `
    $let[l;$jsonGet[userProfile;language]]
    $addActionRow
    $addButton[wardrobe-back-$env[target]-$authorID;$tl[ui.wardrobe.buttonBack.$get[l]];Secondary;↩️]
  `,
})
