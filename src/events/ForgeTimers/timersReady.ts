import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  type: "timersReady",
  code: `
    $logger[Info;ForgeTimers | Restored $eventData[restored] timers, dropped $eventData[dropped]]
  `,
})
