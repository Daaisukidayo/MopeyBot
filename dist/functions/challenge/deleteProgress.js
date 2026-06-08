"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'deleteProgress',
    params: [
        {
            name: "_userId",
            type: "User",
            required: false,
        }
    ],
    brackets: false,
    code: `
    $deleteUserVar[challengeProgress|$channelID;$findUser[$env[_userId];true]]
  `
};
//# sourceMappingURL=deleteProgress.js.map