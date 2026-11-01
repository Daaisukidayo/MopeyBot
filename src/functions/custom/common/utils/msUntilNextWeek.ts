import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "msUntilNextWeek",
  description: "ms left until next Monday 00:00 UTC, like an ISO week",
  output: ArgType.Number,
  code: `
    $let[now;$getTimestamp]
    $let[days;$floor[$math[$get[now] / 86400000]]]

    $c[1 Jan 1970 was a Thursday, so w/ Monday as 0 the weekday is (days + 3) % 7]
    $return[$math[(7 - ($get[days] + 3) % 7) * 86400000 - $get[now] % 86400000]]
  `,
})
