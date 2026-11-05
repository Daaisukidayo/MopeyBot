import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "pm2ID",
  description: "this bot's process id in pm2, stops w/ an error when it runs w/o pm2. needs userProfile loaded",
  output: ArgType.String,
  code: `
    $let[id;$djsEval[process.env.pm_id ?? ""]]
    $onlyIf[$get[id]!=;$newError[The bot isn't running under pm2]]
    $return[$get[id]]
  `,
})
