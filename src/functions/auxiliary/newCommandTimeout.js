export default {
  name: "newCommandTimeout",
  params: [
    {
      name: "command",
      required: false,
    }
  ],
  brackets: false,
  description: "Adds a special timeout that deletes the message after a specified time.",
  code: `
    $if[$authorID==$botOwnerID;$return]

    $let[mid;$function[
      $if[$isPrefixCommand;
        $return[$sendMessage[$channelID;;true]]
      ]
      $if[$isSlashCommand;
        $return[$interactionReply[;true]]
      ]
      
      $return[$messageID]
    ]]

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

    $!stopCommandTimeout[$get[commandName]]

    $!advancedTimeout[
      $esc[
        $!deleteMessage[{channel};{message}]
      ];
      $getGlobalVar[$get[commandName]_cooldown];
      $get[timeoutName];
      {"channel": "$channelID", "message": "$get[mid]"}
    ]
  `
}