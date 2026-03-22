export default {
  name: 'stopCommandTimeout',
  params: [
    {
      name: 'command',
      required: false
    }
  ],
  brackets: false,
  code: `
    $let[commandName;$function[
      $if[$isPrefixCommand;
        $return[$commandName]
      ]
      $if[$isSlashCommand;
        $return[$applicationCommandName]
      ]
      
      $return[$env[command]]
    ]]

    $let[timeoutName;$get[commandName]-$authorID]

    $return[$stopAdvancedTimeout[$get[timeoutName]]]
  `
}