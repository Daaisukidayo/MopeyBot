import { BaseCommand } from "@tryforge/forgescript"

module.exports = new BaseCommand({
  name: "test",
  type: "messageCreate",
  code: `
    $onlyForUsers[;$botOwnerID]
  `,
})
