import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  type: "databaseFail",
  code: `
    $logger[Error;ForgeTimers | Storage failed, timers will not survive a restart: $eventData[failReason]]
  `
})
