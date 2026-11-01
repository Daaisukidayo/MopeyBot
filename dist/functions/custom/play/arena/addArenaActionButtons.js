"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "addArenaActionButtons",
    description: "adds the arena action buttons",
    params: [
        {
            name: "playDataVar",
            description: "var w/ the play data",
            type: forgescript_1.ArgType.String,
        },
    ],
    code: `
    $ref[playData;$env[playDataVar]]
    $let[l;$jsonGet[userProfile;language]]
    $addActionRow
    $arrayForEach[$getGlobalVar[arenaActions];elem;
      $addButton[play_arenaAction-$jsonGet[elem;id]-$playID[playData];$tl[data.arenaActions.$jsonGet[elem;id].$get[l]];Success;$jsonGet[elem;emoji]]
    ]
  `,
});
//# sourceMappingURL=addArenaActionButtons.js.map