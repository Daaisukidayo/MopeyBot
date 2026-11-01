import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "getBiomeColor",
  description: "a biome's color, or the default one if the biome has none",
  output: ArgType.Color,
  params: [
    {
      name: "playDataVar",
      description: "var w/ the play data",
      type: ArgType.String,
    },
    {
      name: "biome",
      description: "the biome ID (default: the player's current biome)",
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
