export default {
  name: "isPrefixCommand",
  description: "Returns whether the current command is a prefix command.",
  output: "Boolean",
  code: `
    $return[$checkCondition[$instanceName==Message]]
  `
}