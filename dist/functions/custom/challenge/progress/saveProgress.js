"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "saveProgress",
    description: "Saves the luck challenge progress object for the user.",
    params: [
        {
            name: "progress",
            description: "Progress data.",
            type: forgescript_1.ArgType.Json
        },
        {
            name: "userId",
            description: "ID of the user.",
            type: forgescript_1.ArgType.User,
            required: false
        }
    ],
    code: `
    $setUserVar[challengeProgress|$channelID;$env[progress];$nullish[$env[userId;id];$authorID]]
  `
});
//# sourceMappingURL=saveProgress.js.map