"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'addArenaActionButtons',
    code: `
    $let[l;$env[userProfile;language]]
    $jsonLoad[arenaActions;$getGlobalVar[arenaActions]]
    $addActionRow
    $arrayForEach[arenaActions;elem;
      $addButton[$env[elem;id]-arenaAction_play-$authorID;$tl[$get[l];data;arenaActions.$env[elem;id]];Success;$env[elem;emoji]]
    ]
  `
};
//# sourceMappingURL=addArenaActionButtons.js.map