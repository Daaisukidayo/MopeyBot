"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'stopTimer',
    description: "Stops the active 1 hour luck timer for the provided user.",
    params: [
        {
            name: '_userId',
            description: "ID of the user.",
            type: "User",
            required: false
        }
    ],
    brackets: false,
    code: `
    $!stopInterval[challengeTimer-$findUser[$env[_userId];true]|$channelID]
  `
};
//# sourceMappingURL=stopTimer.js.map