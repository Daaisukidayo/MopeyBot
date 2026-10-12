import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "wardrobePacksEmbed",
  description: "Generates the choice of a skin pack to equip on every animal of the tier, or on all animals.",
  params: [
    {
      name: "tier",
      description: "The tier, or 'all'",
      type: ArgType.String
    }
  ],
  code: `
    $let[l;$jsonGet[userProfile;language]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$if[$env[tier]==all;$tl[ui.wardrobe.allTitle.$get[l]];$tl[ui.wardrobe.tierTitle.$get[l];$env[tier]]]]
      $addSeparator
      $addSkinpacksMenu[$env[tier]]
      $addWardrobeBackButton[$if[$env[tier]==all;menu;pack]]
    ;$getGlobalVar[defaultColor]]
  `
})
