import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "skinCollectionName",
  description: "a collection's name in the user's language, a pack or a packless group like cosmic",
  output: ArgType.String,
  params: [
    {
      name: "collection",
      description: "a pack id or a packless group from skinCollections",
      type: ArgType.String,
    },
  ],
  code: `
    $let[l;$jsonGet[userProfile;language]]
    $jsonLoad[packless;$getGlobalVar[skinCollections]]
    $return[$tl[data.$if[$arrayIncludes[packless;$env[collection]];skinCollections;shopSkinPacks].$env[collection].$get[l]]]
  `,
})
