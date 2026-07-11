import { ForgeFunction } from "@tryforge/forgescript";

export default new ForgeFunction({
  name: 'resetArenaData',
  code: `
    $if[$env[playData]==;$return]
    $!jsonSet[playData;arena;$env[$getGlobalVar[userPlayData];arena]]
  `
})