export default {
  name: 'ternary',
  output: "Boolean",
  brackets: true,
  params: [
    {
      name: '_leftValue',
      type: "Boolean",
      required: true,
      rest: false,
    },
    {
      name: '_rightValue',
      type: "Boolean",
      required: true,
      rest: false,
    },
  ],
  code: `
    $if[$isOneOf[$env[_leftValue];false;];
      $return[$env[_rightValue]]
    ]

    $return[$env[_leftValue]]
  `
}