import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "isPrefixCommand",
  description: "Returns whether the current command is a prefix command.",
  output: ArgType.Boolean,
  code: `
    $return[$checkCondition[$instanceName==Message]]
  `
})
