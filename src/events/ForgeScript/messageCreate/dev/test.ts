import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: "test",
  type: "messageCreate",
  code: `
    $onlyForUsers[;$botOwnerID]
  `,
})
