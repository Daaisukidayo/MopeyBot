import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "commandKey",
  description:
    "Returns the name a command's cooldown and timeout go by: the given one, or the running command's (a slash subcommand with its group, without spaces).",
  output: ArgType.String,
  brackets: false,
  params: [
    {
      name: "name",
      description: "The name to use instead of the running command's.",
      type: ArgType.String,
      required: false
    }
  ],
  code: `
    $return[$nullish[$env[name];$toLowerCase[$replace[$applicationSubCommandName $applicationSubCommandGroupName; ;]];$commandName]]
  `
})
