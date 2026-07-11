import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: 'stopCommandTimeout',
  description: "Stops an active command timeout for the current user",
  output: ArgType.Boolean,
  brackets: false,
  params: [
    {
      name: '_command',
      description: "The command name to stop the timeout for (uses current command if not provided)",
      type: ArgType.String,
      required: false,
    }
  ],
  code: `
    $let[commandName;$function[
      $if[$isPrefixCommand;
        $return[$commandName]
      ]
      $if[$isSlashCommand;
        $return[$applicationCommandName]
      ]
      
      $return[$env[_command]]
    ]]

    $let[timeoutName;$get[commandName]-$authorID]

    $return[$stopAdvancedTimeout[$get[timeoutName]]]
  `
})