import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  type: "clientReady",
  code: `
    $logger[Info;Bot $username[$botID] is ready]

    $c[Each call shows both statuses for 15s, so a 30s interval keeps them alternating]
    $setInterval[$updateBotStatus;30s]
    $updateBotStatus
  `,
})
