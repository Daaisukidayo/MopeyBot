export default {
  name: 'removePlayProgress',
  code: `
    $sumCash[$env[playData;MC]]
    $saveProfile

    $deleteUserVar[allRareAttemptsInfo]
    $deleteUserVar[userPlayData]
  `
}