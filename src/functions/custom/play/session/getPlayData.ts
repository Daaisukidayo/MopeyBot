import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "getPlayData",
  description: "Returns the author's game as a PlaySession instance, a new one when there is none.",
  code: `
    $jsonLoad[playData;$getUserVar[userPlayData]]
    $c[A player without a game gets a new one]
    $if[$env[playData]==;$new[playData;PlaySession]]
    $return[$env[playData]]
  `,
})
