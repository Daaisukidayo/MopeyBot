"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "pushNewHistoryPage",
    description: "builds a new challenge history page from the given data and pushes it for the user",
    params: [
        {
            name: "newPageData",
            description: "the new page fields: points, rares, endDate, playType, difficulty, list",
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
    $let[userId;$nullish[$env[userId;id];$authorID]]

    $new[challengeHistory;ChallengeHistory;$get[userId]]
    $callMethod[challengeHistory;add;$env[newPageData]]
    $callMethod[challengeHistory;save]
  `,
});
//# sourceMappingURL=pushNewHistoryPage.js.map