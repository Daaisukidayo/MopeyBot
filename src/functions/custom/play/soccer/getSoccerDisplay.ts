import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "getSoccerDisplay",
  description: "the soccer's localized name w/ its emoji",
  output: ArgType.String,
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
    $let[l;$jsonGet[userProfile;language]]
    $return[$tl[data.playSoccers.$env[soccerType].$env[soccerId].$get[l]] $jsonGet[$getPlaySoccer[$env[soccerType];$env[soccerId]];emoji]]
  `,
})
