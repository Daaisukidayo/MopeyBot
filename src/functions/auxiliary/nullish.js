export default {
  name: 'nullish',
  params: [
    {
      name: 'leftValue',
      required: true,
    },
    {
      name: 'rightValue',
      required: true,
    },
  ],
  code: `
    $if[$includes['$env[leftValue]';'null';'undefined';''];
      $return[$env[rightValue]]
    ;
      $return[$env[leftValue]]
    ]
  `
}