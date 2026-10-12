import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "stopCommandTimeout",
  description: "Stops an active command timeout for the current user",
  output: ArgType.Boolean,
  brackets: false,
  params: [
    {
      name: "command",
      description: "The command name to stop the timeout for. Defaults to the command where the function were executed",
      type: ArgType.String,
      required: false
    }
  ],
  code: `
    $return[$clearTimeout[$commandKey[$env[command]]-$authorID]]
  `
})
