export default {
  name: "newTimeout",
  description: "Adds a special timeout that deletes the message after a specified time.",
  params: [
    {
      name: "timeout_name",
      description: "The name of the timeout. May contain an identifier.",
      type: "String",
      required: true,
    },
    {
      name: "time",
      description: "Time after which the message will be deleted.",
      type: "String",
      required: true,
    },
    {
      name: "message_id",
      description: "The message to delete after given time.",
      type: "String",
      required: false,
    },
  ],
  code: `
    $let[m;$nullish[$env[message_id];$messageID]]

    $!stopTimeout[$env[timeout_name]]
    $setTimeout[
      $!deleteMessage[$channelID;$get[m]]
    ;$env[time];$env[timeout_name]]
  `
}