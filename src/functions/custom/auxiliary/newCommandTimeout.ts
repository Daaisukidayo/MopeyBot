import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "newCommandTimeout",
  description: "Adds a special timeout that deletes the command after a specified time.",
  brackets: false,
  params: [
    {
      name: "_command",
      description: "The command to delete",
      type: ArgType.String,
      required: false,
    }
  ],
  code: `
    $let[messageId;$function[
      $if[$or[$isPrefixCommand;$isSlashCommand];
        $return[$send]
      ]
      $return[$messageID]
    ]]

    $let[commandName;$nullish[$env[_command];$toLowerCase[$replace[$applicationSubCommandName $applicationSubCommandGroupName; ;]];$commandName]]
    $let[timeoutName;$get[commandName]-$authorID]

    $!stopCommandTimeout[$get[commandName]]

    $!advancedTimeout[$esc[
      $!deleteMessage[{channel};{message}]
    ];$getGlobalVar[$get[commandName]_cooldown];$get[timeoutName];{"channel": "$channelID", "message": "$get[messageId]"}]
  `
})