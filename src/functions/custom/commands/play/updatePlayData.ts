import { ForgeFunction } from "@tryforge/forgescript";

export default new ForgeFunction({
  name: 'updatePlayData',
  code: `
    $setUserVar[userPlayData;$env[playData]]
  `
})