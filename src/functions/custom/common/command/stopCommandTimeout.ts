import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "stopCommandTimeout",
  description: "stops the user's running command timeout",
  output: ArgType.Boolean,
  brackets: false,
  params: [
    {
      name: "command",
      description: "the command whose timeout to stop. defaults to the one running this",
      type: ArgType.String,
      required: false,
    },
  ],
  code: `
    $return[$clearTimeout[$commandKey[$env[command]]-$authorID]]
  `,
})
