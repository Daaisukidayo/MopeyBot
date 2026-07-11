import { ArgType, ForgeFunction } from "@tryforge/forgescript";

export default new ForgeFunction({
  name: 'sumPlayCash',
  params: [
    {
      name: "_amount",
      type: ArgType.Number,
    }
  ],
  code: `
    $!jsonSet[playData;MC;$math[$env[playData;MC] + $round[$env[_amount]]]]
  `
})