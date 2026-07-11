import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: 'getPositionEmoji',
  description: 'Returns an emoji for a given numeric position.',
  output: ArgType.String,
  params: [
    {
      name: '_pos',
      description: 'The position to get the emoji for',
      type: ArgType.Number,
    },
  ],
  code: `
    $return[$switch[$env[_pos];
      $case[1;🥇]
      $case[2;🥈]
      $case[3;🥉]
      $case[default;\`#$env[_pos]\`]
    ]]
  `
})