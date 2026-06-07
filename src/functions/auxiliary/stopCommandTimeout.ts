export default {
  name: 'stopCommandTimeout',
  params: [
    {
      name: '_command',
      required: false
    }
  ],
  brackets: false,
  output: "Boolean",
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
}