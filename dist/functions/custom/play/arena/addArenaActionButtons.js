"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "addArenaActionButtons",
    description: "Adds arena action buttons for a player's play session",
    code: `
    $let[l;$jsonGet[userProfile;language]]
    $addActionRow
    $arrayForEach[$getGlobalVar[arenaActions];elem;
      $addButton[play_arenaAction-$jsonGet[elem;id]-$authorID;$tl[data.arenaActions.$jsonGet[elem;id].$get[l]];Success;$jsonGet[elem;emoji]]
    ]
  `,
});
//# sourceMappingURL=addArenaActionButtons.js.map