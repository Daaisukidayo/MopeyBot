import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "getBiomeColor",
  description: "Returns the color of a biome, or the default color if the biome has none",
  output: ArgType.Color,
  params: [
    {
      name: "playDataVar",
      description: "The name of the variable that holds the play data.",
      type: ArgType.String,
    },
    {
      name: "biome",
      description: "The biome ID (default: the player's current biome)",
      type: ArgType.Number,
      required: false,
    },
  ],
  code: `
    $ref[playData;$env[playDataVar]]
    $let[biome;$nullish[$env[biome];$jsonGet[playData;biome]]]
    $return[$nullish[$jsonGet[$getGlobalVar[biomeColors];$get[biome]];$getGlobalVar[defaultColor]]]
  `,
})
