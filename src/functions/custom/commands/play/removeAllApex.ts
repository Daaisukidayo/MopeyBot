import { ForgeFunction } from "@tryforge/forgescript";

export default new ForgeFunction({
  name: 'removeAllApex',
  code: `
    $!jsonSet[playData;apex;[\\]]
  `
})