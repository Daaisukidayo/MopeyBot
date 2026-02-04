export default {
  name: 'ternary',
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
    $if[$includes['$env[leftValue]';'false';''];
      $return[$env[rightValue]]
    ;
      $return[$env[leftValue]]
    ]
  `
}