export default {
  name: 'dump',
  params: [
    {
      name: "json",
      required: true
    },
    {
      name: "keys",
      required: true,
      rest: true
    }
  ],
  code: `
    $jsonLoad[value;$env[json]]
    $if[$typeof[$env[value]]==string;
      $jsonLoad[value;$env[$env[value]]]
    ]
    $if[$typeof[$env[value]]!=object;
      $return[undefined]
    ]

    $loop[$arrayLength[keys];
      $let[i;$math[$env[i] - 1]]
      $!jsonSet[value;$env[value;$env[keys;$get[i]]]]
    ;i;true]
    $return[$default[$env[value];undefined]]
  `
}