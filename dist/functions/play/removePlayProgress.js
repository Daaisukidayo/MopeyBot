"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'removePlayProgress',
    code: `
    $sumCash[$env[playData;MC]]
    $saveProfile

    $deleteUserVar[allRareAttemptsInfo]
    $deleteUserVar[userPlayData]
  `
};
//# sourceMappingURL=removePlayProgress.js.map