import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "isDev",
  description: "whether dev mode is on in the profile the caller loaded into 'userProfile'. no db reads",
  output: ArgType.Boolean,
  code: `
    $return[$checkCondition[$jsonGet[userProfile;dev_mode]==1]]
  `,
})
