import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "wardrobeAnimalsEmbed",
  description: "Generates the choice of an animal of the tier, each shown in its equipped skin.",
  params: [
    {
      name: "wardrobeVar",
      description: "The name of the variable that holds the user's wardrobe.",
      type: ArgType.String
    },
    {
      name: "tier",
      description: "The tier of the animals",
      type: ArgType.Number
    }
  ],
  code: `
    $ref[wardrobe;$env[wardrobeVar]]
    $let[l;$jsonGet[userProfile;language]]
    $cacheAnimalsData
    $getCache[animals;animalsData;animals]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.wardrobe.animalMenuTitle.$get[l];$env[tier]]]

      $addActionRow
      $addStringSelectMenu[wardrobe-chooseAnimal-$authorID;$tl[ui.wardrobe.animalPlaceholder.$get[l]]]

      $c[A tier has 17 animals and rares at most, a select menu holds 25]
      $arrayForEach[$arrayFilter[animals;animal;$jsonGet[animal;tier]==$env[tier]];animal;
        $let[id;$jsonGet[animal;ID]]
        $addOption[$jsonGet[animal;fullName];;$get[id];$getAnimalInfo[$get[id];emoji;$default[$jsonGet[wardrobe;$get[id]];0]]]
      ]
      $addWardrobeBackButton[animal]
    ;$getGlobalVar[defaultColor]]
  `
})
