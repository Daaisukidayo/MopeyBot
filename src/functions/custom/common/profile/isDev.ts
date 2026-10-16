import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "isDev",
  description:
    "Returns whether developer mode is on in the profile the caller has loaded in 'userProfile'. Nothing is read from the database.",
  output: ArgType.Boolean,
  code: `
    $return[$checkCondition[$jsonGet[userProfile;devMode]==1]]
  `,
})
