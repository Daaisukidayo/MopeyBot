export default {
  name: "newCommandTimeout",
  description: "Adds a special timeout that deletes the message after a specified time.",
  brackets: false,
  params: [
    {
      name: "_command",
      required: false,
    }
  ],
  code: `
    $let[messageId;$function[
      $if[$isCommand;
        $return[$send]
      ]
      $return[$messageID]
    ]]

    $let[commandName;$function[
      $if[$isCommand;
        $return[$nullish[$toCamelCase[$applicationSubCommandName $applicationSubCommandGroupName];$commandName]]
      ]
      
      $return[$env[_command]]
    ]]

    $let[timeoutName;$get[commandName]-$authorID]

    $!stopCommandTimeout[$get[commandName]]

    $!advancedTimeout[$esc[
      $function[$!deleteMessage[{channel};{message}]]
    ];$getGlobalVar[$get[commandName]_cooldown];$get[timeoutName];{"channel": "$channelID", "message": "$get[messageId]"}]
  `
}