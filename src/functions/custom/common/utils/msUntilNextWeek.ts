import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "msUntilNextWeek",
  description: "Milliseconds left until the next week begins on Monday at 00:00 UTC, as an ISO week does.",
  output: ArgType.Number,
  code: `
    $let[now;$getTimestamp]
    $let[days;$floor[$math[$get[now] / 86400000]]]

    $c[1 January 1970 was a Thursday: counting Monday as 0, a day's place in its week is (days + 3) % 7]
    $return[$math[(7 - ($get[days] + 3) % 7) * 86400000 - $get[now] % 86400000]]
  `,
})
