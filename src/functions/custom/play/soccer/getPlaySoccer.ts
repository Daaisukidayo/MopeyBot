import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "getPlaySoccer",
  description: "the /play soccer item (res/data/playSoccers.json) by type and ID, nothing if there's no such item",
  output: ArgType.Json,
  brackets: true,
  params: [
    {
      name: "soccerType",
      description: "the soccer type, like 'pumpkin', 'umbrella' or 'beachball'",
      type: ArgType.String,
    },
    {
      name: "soccerId",
      description: "the soccer item's ID",
      type: ArgType.Number,
    },
  ],
  code: `
    $jsonLoad[soccers;$readFile[res/data/playSoccers.json]]
    $if[$jsonType[soccers;$env[soccerType]]!=array;$return]
    $return[$arrayFind[$jsonGet[soccers;$env[soccerType]];item;$jsonGet[item;ID]==$env[soccerId]]]
  `,
})
