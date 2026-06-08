"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'resetArenaData',
    code: `
    $if[$env[playData]==;$return]
    $!jsonSet[playData;arena;$dump[$getGlobalVar[userPlayData];arena]]
  `
};
//# sourceMappingURL=resetArena.js.map