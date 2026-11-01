import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "fraction",
  description: "a fraction reduced to lowest terms, like 3/10 for 900 and 3000",
  output: ArgType.String,
  params: [
    {
      name: "numerator",
      description: "the whole number on top",
      type: ArgType.Number,
    },
    {
      name: "denominator",
      description: "the whole number below, not 0",
      type: ArgType.Number,
    },
  ],
  code: `
    $c[gcd, good old Euclid]
    $let[a;$env[numerator]]
    $let[b;$env[denominator]]
    $while[$get[b]!=0;
      $let[rest;$math[$get[a] % $get[b]]]
      $let[a;$get[b]]
      $let[b;$get[rest]]
    ]
    $return[$math[$env[numerator] / $get[a]]/$math[$env[denominator] / $get[a]]]
  `,
})
