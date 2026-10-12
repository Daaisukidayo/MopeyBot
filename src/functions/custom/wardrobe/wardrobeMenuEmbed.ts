import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "wardrobeMenuEmbed",
  description: "Generates the wardrobe start menu: equip the animals one by one, one animal, a tier or all animals.",
  code: `
    $let[l;$jsonGet[userProfile;language]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.wardrobe.menuTitle.$get[l]]]

      $addActionRow
      $addStringSelectMenu[wardrobe-menu-$authorID;$tl[ui.wardrobe.menuPlaceholder.$get[l]]]
      $arrayForEach[$arrayOf[new;animal;tier;all];option;
        $addOption[$tl[ui.wardrobe.menuOptions.$env[option].label.$get[l]];$tl[ui.wardrobe.menuOptions.$env[option].description.$get[l]];$env[option]]
      ]
    ;$getGlobalVar[defaultColor]]
  `
})
