export default {
  name: 'getPositionEmoji',
  params: [
    {
      name: 'pos',
      description: 'The position to get the emoji for',
      type: 'Number',
      required: true,
    },
  ],
  code: `
    $return[$switch[$env[pos];
      $case[1;🥇]
      $case[2;🥈]
      $case[3;🥉]
      $case[default;\`#$env[pos]\`]
    ]]
  `
}