"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'addRespawnButton',
    code: `
    $let[l;$env[userProfile;language]]
    $addActionRow
    $addButton[respawn-play-$authorID;$tl[$get[l];ui;play.buttonLabelRespawn];Success]
  `
};
//# sourceMappingURL=addRespawnButton.js.map