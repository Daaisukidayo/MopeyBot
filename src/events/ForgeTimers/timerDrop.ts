import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  type: "timerDrop",
  code: `
    $logger[Warn;ForgeTimers | Dropped $timerData[kind] "$timerData[name]": $eventData[dropReason]]
  `,
})
