import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "msUntilNextDay",
  description: "Milliseconds left until the next day begins at 00:00 UTC, when the daily limits reset.",
  output: ArgType.Number,
  code: `
    $return[$math[86400000 - $getTimestamp % 86400000]]
  `
})
