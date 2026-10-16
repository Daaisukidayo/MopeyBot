import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  type: "error",
  code: `$logger[Error;Error posting stats to Top.gg: $postStatsError]`,
})
