"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "addSoccerActionsMenu",
    description: "adds the soccer actions menu",
    brackets: true,
    params: [
        {
            name: "playDataVar",
            description: "var w/ the play data",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "data",
            description: "the soccer to include, like ['pumpkin', 0]: the soccer type and the item ID",
            type: forgescript_1.ArgType.Json,
        },
        {
            name: "replaceIgnoreAction",
            description: "swap ignore for throw away, when the soccer's already held",
            type: forgescript_1.ArgType.Boolean,
            required: false,
        },
    ],
    code: `
    $ref[playData;$env[playDataVar]]
    $let[replaceIgnoreAction;$nullish[$env[replaceIgnoreAction];false]]
    $jsonLoad[soccerActions;$getGlobalVar[soccerActions]]

    $let[l;$jsonGet[userProfile;language]]

    $addActionRow
    $addStringSelectMenu[play_soccerActions-$arrayJoin[data;___]-$playID[playData];$tl[ui.play.selectMenuPlaceholderActions.$get[l]]]

    $c[ignoring a held soccer = throwing it away]
    $arrayForEach[soccerActions;action;
      $let[action;$if[$and[$env[action]==soccer_action_ignore;$get[replaceIgnoreAction]];soccer_action_throwaway;$env[action]]]
      $addOption[$tl[data.soccerActions.$get[action].$get[l]];;$get[action]]
    ]
  `,
});
//# sourceMappingURL=addSoccerActionsMenu.js.map