import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "hasAllPackSkins",
  description: "true if the user already has every skin of the pack, e.g. bought them one by one",
  output: ArgType.Boolean,
  params: [
    {
      name: "skinsVar",
      description: "var w/ the user's skins",
      type: ArgType.String,
    },
    {
      name: "packId",
      description: "the pack's id from shopItems",
      type: ArgType.String,
    },
  ],
  code: `
    $ref[owned;$env[skinsVar]]
    $cacheAnimalsData
    $getCache[animals;packSkins;packSkins]
    $jsonLoad[skins;$default[$jsonGet[packSkins;$env[packId]];$arrayOf]]
    $return[$and[$jsonSize[skins]>0;$arrayEvery[skins;skinId;$arrayIncludes[owned;$env[skinId]]]]]
  `,
})
