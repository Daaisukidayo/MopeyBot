import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "wearableAnimals",
  description: "IDs of the animals the user has 2+ skins to wear for, by tier (cache order). removed ones are out",
  output: ArgType.Json,
  code: `
    $jsonLoad[userSkins;$getUserVar[userSkins]]
    $jsonLoad[freePacks;$getGlobalVar[freeSkinPacks]]
    $cacheAnimalsData
    $getCache[animals;animalsData;animals]

    $c[1 skin = nothing to pick. owned = free pack or bought]
    $arrayFilter[animals;animal;$and[$jsonGet[animal;deleted]!=true;$arrayCount[$default[$jsonGet[animal;skins];$arrayOf];skin;$or[$arrayIncludes[freePacks;$jsonGet[skin;packId]];$arrayIncludes[userSkins;$jsonGet[skin;id]]]]>1];listed]
    $return[$arrayPluck[$env[listed];ID]]
  `,
})
