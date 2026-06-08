"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "getTimer",
    params: [
        {
            name: "_userId",
            type: "User",
            required: false,
        }
    ],
    brackets: false,
    code: `
    $return[$getUserVar[1htime|$channelID;$findUser[$env[_userId];true]]]
  `
};
//# sourceMappingURL=getTimer.js.map