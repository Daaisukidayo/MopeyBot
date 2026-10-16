import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "addWardrobeBackButton",
  description: "Adds a row with the wardrobe's Back button.",
  params: [
    {
      name: "target",
      description:
        "Where it goes back to: 'menu' (the start menu), 'pack' or 'animal' (the tier choice for that), or a tier (its animals)",
      type: ArgType.String,
    },
  ],
  code: `
    $let[l;$jsonGet[userProfile;language]]
    $addActionRow
    $addButton[wardrobe-back-$env[target]-$authorID;$tl[ui.wardrobe.buttonBack.$get[l]];Secondary;↩️]
  `,
})
