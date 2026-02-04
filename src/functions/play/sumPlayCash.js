export default {
  name: 'sumPlayCash',
  params: [
    {
      name: "amount",
      required: true
    }
  ],
  code: `
    $!jsonSet[playData;MC;$math[$env[playData;MC] + $round[$env[amount]]]]
  `
}