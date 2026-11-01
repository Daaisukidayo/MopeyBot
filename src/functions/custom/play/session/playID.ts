import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "playID",
  description:
    "the end of a game msg custom ID: the author, then the screen number, so isPlaying can spot stale components",
  output: ArgType.String,
  params: [
    {
      name: "playDataVar",
      description: "var w/ the play data",
      type: ArgType.String,
    },
  ],
  code: `
    $ref[playData;$env[playDataVar]]
    $return[$authorID-$jsonGet[playData;screen]]
  `,
})
