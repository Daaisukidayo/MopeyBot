export default {
  name: "status",
  type: "messageCreate",
  code: `
    $onlyForUsers[;$botOwnerID]
    $reply
    $addContainer[
      $addTextDisplay[## CPU: \`$cpu\`]
      $addSeparator
      $addTextDisplay[## OS: \`$os\`]
      $addSeparator
      $addTextDisplay[## Bot Uptime: \`$parseMS[$uptime]\`]
      $addSeparator
      $addTextDisplay[## Ram: \`$floor[$ram] MB\`]
      $addSeparator
      $addTextDisplay[## Total ram: \`$floor[$ramTotal] GB\`]
      $addSeparator
      $addTextDisplay[## DB Ping: \`$dbPing\`ms]
    ;$getGlobalVar[defaultColor]]
  `
}