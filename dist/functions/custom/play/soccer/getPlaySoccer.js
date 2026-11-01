"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "getPlaySoccer",
    description: "the /play soccer item (res/data/playSoccers.json) by type and ID, nothing if there's no such item",
    output: forgescript_1.ArgType.Json,
    brackets: true,
    params: [
        {
            name: "soccerType",
            description: "the soccer type, like 'pumpkin', 'umbrella' or 'beachball'",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "soccerId",
            description: "the soccer item's ID",
            type: forgescript_1.ArgType.Number,
        },
    ],
    code: `
    $jsonLoad[soccers;$readFile[res/data/playSoccers.json]]
    $if[$jsonType[soccers;$env[soccerType]]!=array;$return]
    $return[$arrayFind[$jsonGet[soccers;$env[soccerType]];item;$jsonGet[item;ID]==$env[soccerId]]]
  `,
});
//# sourceMappingURL=getPlaySoccer.js.map