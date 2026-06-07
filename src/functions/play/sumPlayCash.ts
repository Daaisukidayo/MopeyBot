export default {
  name: 'sumPlayCash',
  params: [
    {
      name: "_amount",
      required: true
    }
  ],
  code: `
    $!jsonSet[playData;MC;$math[$env[playData;MC] + $round[$env[_amount]]]]
  `
}