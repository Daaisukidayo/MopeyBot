"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "addSoccerActionsMenu",
    description: "Adds soccer action menu for a player's play session",
    brackets: true,
    params: [
        {
            name: "data",
            description: "The data of the soccer to include (e.g. ['pumpkin', 0], where 'pumpkin' is the soccer name, and 10 is the ID of the soccer item)",
            type: forgescript_1.ArgType.Json
        },
        {
            name: "replaceIgnoreAction",
            description: "Whether to replace the ignore action when a user is holding the soccer item",
            type: forgescript_1.ArgType.Boolean,
            required: false
        }
    ],
    code: `
    $let[replaceIgnoreAction;$nullish[$env[replaceIgnoreAction];false]]
    $jsonLoad[soccerActions;$getGlobalVar[soccerActions]]

    $let[l;$jsonGet[userProfile;language]]

    $addActionRow
    $addStringSelectMenu[play_soccerActions-$arrayJoin[data;___]-$authorID;$tl[ui.play.selectMenuPlaceholderActions.$get[l]]]

    $c[Ignoring a soccer held in hands means throwing it away]
    $arrayForEach[soccerActions;action;
      $let[action;$if[$and[$env[action]==1;$get[replaceIgnoreAction]];3;$env[action]]]
      $addOption[$tl[data.soccerActions.$get[action].$get[l]];;$get[action]]
    ]
  `
});
//# sourceMappingURL=addSoccerActionsMenu.js.map