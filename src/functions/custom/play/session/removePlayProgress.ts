import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "removePlayProgress",
  params: [
    {
      name: "playDataVar",
      description: "The name of the variable that holds the play data.",
      type: ArgType.String,
    },
  ],
  code: `
    $ref[playData;$env[playDataVar]]
    $sumCash[$jsonGet[playData;mope_coins]]
    $saveProfile[$env[userProfile]]

    $deleteUserVar[allRareAttemptsInfo]
    $deleteUserVar[userPlayData]
  `,
})
