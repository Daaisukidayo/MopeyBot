import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "getPositionEmoji",
  description: "an emoji for a place, like a medal for the top 3",
  output: ArgType.String,
  params: [
    {
      name: "pos",
      description: "the place",
      type: ArgType.Number,
    },
  ],
  code: `
    $return[$switch[$env[pos];
      $case[1;🥇]
      $case[2;🥈]
      $case[3;🥉]
      $case[default;\`#$env[pos]\`]
    ]]
  `,
})
