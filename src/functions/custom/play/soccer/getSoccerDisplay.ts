import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "getSoccerDisplay",
  description: "Returns the localized soccer name with its emoji",
  output: ArgType.String,
  brackets: true,
  params: [
    {
      name: "soccerType",
      description: "The soccer type (e.g. 'pumpkin', 'umbrella', 'beachball')",
      type: ArgType.String
    },
    {
      name: "soccerId",
      description: "The ID of the soccer item",
      type: ArgType.Number
    }
  ],
  code: `
    $let[l;$jsonGet[userProfile;language]]
    $return[$tl[data.playSoccers.$env[soccerType].$env[soccerId].$get[l]] $jsonGet[$getPlaySoccer[$env[soccerType];$env[soccerId]];emoji]]
  `
})
