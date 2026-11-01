import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  type: "clientReady",
  code: `
    $logger[Info;Bot $username[$botID] is ready]

    $c[each call flips through both statuses for 15s, so 30s keeps them alternating]
    $setInterval[$updateBotStatus;30s]
    $updateBotStatus
  `,
})
