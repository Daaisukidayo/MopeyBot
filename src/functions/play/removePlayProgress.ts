export default {
  name: 'removePlayProgress',
  code: `
    $sumCash[$env[playData;MC]]
    $saveProfile[$env[userProfile]]

    $deleteUserVar[allRareAttemptsInfo]
    $deleteUserVar[userPlayData]
  `
}