export default {
  name: 'resetArenaData',
  code: `
    $if[$env[playData]==;$return]
    $!jsonSet[playData;arena;$env[$getGlobalVar[userPlayData];arena]]
  `
}