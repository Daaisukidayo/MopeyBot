import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
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
      $addTextDisplay[## Ram: \`$round[$ram] MB\`]
      $addSeparator
      $addTextDisplay[## Total ram: \`$round[$ramTotal] GB\`]
      $addSeparator
      $addTextDisplay[## DB Ping: \`$dbPing\`ms]
    ;$getGlobalVar[defaultColor]]
  `,
})
