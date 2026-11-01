import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "isPrefixCommand",
  description: "whether the current command is a prefix one",
  output: ArgType.Boolean,
  code: `
    $return[$checkCondition[$instanceName==Message]]
  `,
})
