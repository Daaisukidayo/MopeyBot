import { ForgeFunction } from "@tryforge/forgescript";

export default new ForgeFunction({
  name: 'removePlayProgress',
  code: `
    $sumCash[$env[playData;MC]]
    $saveProfile[$env[userProfile]]

    $deleteUserVar[allRareAttemptsInfo]
    $deleteUserVar[userPlayData]
  `
})