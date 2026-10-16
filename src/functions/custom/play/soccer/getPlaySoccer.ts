import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "getPlaySoccer",
  description:
    "Returns the soccer item of the play command (res/data/playSoccers.json) by its type and ID, or nothing if there is no such item",
  output: ArgType.Json,
  brackets: true,
  params: [
    {
      name: "soccerType",
      description: "The soccer type (e.g. 'pumpkin', 'umbrella', 'beachball')",
      type: ArgType.String,
    },
    {
      name: "soccerId",
      description: "The ID of the soccer item",
      type: ArgType.Number,
    },
  ],
  code: `
    $jsonLoad[soccers;$readFile[res/data/playSoccers.json]]
    $if[$jsonType[soccers;$env[soccerType]]!=array;$return]
    $return[$arrayFind[$jsonGet[soccers;$env[soccerType]];item;$jsonGet[item;ID]==$env[soccerId]]]
  `,
})
