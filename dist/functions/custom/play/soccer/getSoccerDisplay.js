"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "getSoccerDisplay",
    description: "Returns the localized soccer name with its emoji",
    output: forgescript_1.ArgType.String,
    brackets: true,
    params: [
        {
            name: "soccerType",
            description: "The soccer type (e.g. 'pumpkin', 'umbrella', 'beachball')",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "soccerId",
            description: "The ID of the soccer item",
            type: forgescript_1.ArgType.Number,
        },
    ],
    code: `
    $let[l;$jsonGet[userProfile;language]]
    $return[$tl[data.playSoccers.$env[soccerType].$env[soccerId].$get[l]] $jsonGet[$getPlaySoccer[$env[soccerType];$env[soccerId]];emoji]]
  `,
});
//# sourceMappingURL=getSoccerDisplay.js.map