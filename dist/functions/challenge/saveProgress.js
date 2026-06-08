"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "saveProgress",
    description: "Saves the luck challenge progress object for the user.",
    params: [
        {
            name: "_progress",
            description: "Progress data.",
            type: "Json",
            required: true,
        },
        {
            name: "_userId",
            description: "ID of the user.",
            type: "User",
            required: false,
        },
    ],
    code: `
    $setUserVar[challengeProgress|$channelID;$env[_progress];$findUser[$env[_userId];true]]
  `
};
//# sourceMappingURL=saveProgress.js.map