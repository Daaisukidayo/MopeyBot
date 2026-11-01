import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "getPlayData",
  description: "the author's game as a PlaySession instance, a fresh one if there's none",
  code: `
    $jsonLoad[playData;$getUserVar[userPlayData]]
    $c[no game yet = a new one]
    $if[$env[playData]==;$new[playData;PlaySession]]
    $return[$env[playData]]
  `,
})
