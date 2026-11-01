"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "getBiomeColor",
    description: "a biome's color, or the default one if the biome has none",
    output: forgescript_1.ArgType.Color,
    params: [
        {
            name: "playDataVar",
            description: "var w/ the play data",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "biome",
            description: "the biome ID (default: the player's current biome)",
            type: forgescript_1.ArgType.Number,
            required: false,
        },
    ],
    code: `
    $ref[playData;$env[playDataVar]]
    $let[biome;$nullish[$env[biome];$jsonGet[playData;biome]]]
    $return[$nullish[$jsonGet[$getGlobalVar[biomeColors];$get[biome]];$getGlobalVar[defaultColor]]]
  `,
});
//# sourceMappingURL=getBiomeColor.js.map