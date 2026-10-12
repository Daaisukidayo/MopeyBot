import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "removeAllApex",
  params: [
    {
      name: "playDataVar",
      description: "The name of the variable that holds the play data.",
      type: ArgType.String
    }
  ],
  code: `
    $ref[playData;$env[playDataVar]]
    $!jsonSet[playData;apex;$arrayOf]
  `
})
