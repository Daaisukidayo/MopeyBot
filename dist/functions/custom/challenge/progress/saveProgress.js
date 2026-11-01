"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "saveProgress",
    description: "saves the user's luck challenge progress",
    params: [
        {
            name: "progress",
            description: "the progress data",
            type: forgescript_1.ArgType.Json,
        },
        {
            name: "userId",
            description: "the user's ID",
            type: forgescript_1.ArgType.User,
            required: false,
        },
    ],
    code: `
    $setUserVar[challengeProgress|$channelID;$env[progress];$nullish[$env[userId;id];$authorID]]
  `,
});
//# sourceMappingURL=saveProgress.js.map