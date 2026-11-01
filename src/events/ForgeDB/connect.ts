import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  type: "connect",
  code: `
    $c[forgelint-disable-next-line glued-name]
    $logger[Info;Connected to the database | Ping: $dbPingms]
  `,
})
