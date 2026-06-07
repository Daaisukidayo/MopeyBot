export default {
  name: 'ternary',
  params: [
    {
      name: '_leftValue',
      required: true,
    },
    {
      name: '_rightValue',
      required: true,
    },
  ],
  code: `
    $if[$isOneOf[$env[_leftValue];false;];
      $return[$env[_rightValue]]
    ]

    $return[$env[_leftValue]]
  `
}