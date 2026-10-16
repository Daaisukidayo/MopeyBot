"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "deleteChallengeProgress",
    description: "Deletes the user's challenge progress",
    brackets: false,
    params: [
        {
            name: "userId",
            description: "The user ID",
            type: forgescript_1.ArgType.User,
            required: false,
        },
    ],
    code: `
    $deleteUserVar[challengeProgress|$channelID;$nullish[$env[userId;id];$authorID]]
  `,
});
//# sourceMappingURL=deleteChallengeProgress.js.map