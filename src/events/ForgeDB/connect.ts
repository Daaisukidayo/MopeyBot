import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  type: "connect",
  code: `
    $logger[Info;Connected to the database | Ping: $dbPingms]
  `
})
