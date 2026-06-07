export default {
  name: 'resetArenaData',
  code: `
    $if[$env[playData]==;$return]
    $!jsonSet[playData;arena;$dump[$getGlobalVar[userPlayData];arena]]
  `
}