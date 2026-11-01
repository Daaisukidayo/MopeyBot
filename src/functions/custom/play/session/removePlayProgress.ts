import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "removePlayProgress",
  params: [
    {
      name: "playDataVar",
      description: "var w/ the play data",
      type: ArgType.String,
    },
  ],
  code: `
    $ref[playData;$env[playDataVar]]
    $callMethod[userProfile;addCoins;$jsonGet[playData;mope_coins]]
    $callMethod[userProfile;save]

    $deleteUserVar[allRareAttemptsInfo]
    $deleteUserVar[userPlayData]
  `,
})
