import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "updatePlayData",
  params: [
    {
      name: "playDataVar",
      description: "var with the play data",
      type: ArgType.String,
    },
  ],
  code: `
    $ref[playData;$env[playDataVar]]
    $setUserVar[userPlayData;$env[playData]]
  `,
})
