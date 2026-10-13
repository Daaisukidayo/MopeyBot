"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "pushNewHistoryPage",
    description: "Creates and pushes a new challenge history page for a user using provided page data.",
    params: [
        {
            name: "newPageData",
            description: "JSON object containing new page fields: points, rares, endDate, playType, difficulty, list.",
            type: forgescript_1.ArgType.Json
        },
        {
            name: "userId",
            description: "The user ID.",
            type: forgescript_1.ArgType.User,
            required: false
        }
    ],
    code: `
    $let[userId;$nullish[$env[userId;id];$authorID]]

    $jsonLoad[newHistory;$getGlobalVar[baseHistoryPage]]
    $!jsonSet[newHistory;id;$randomUUID]
    $objectMerge[newHistory;$objectPick[newPageData;points;rares;endDate;playType;difficulty;raresList]]

    $jsonLoad[history;$getUserVar[challengeHistory;$get[userId]]]
    $arrayPushJSON[history;$env[newHistory]]
    $setUserVar[challengeHistory;$env[history];$get[userId]]
  `
});
//# sourceMappingURL=pushNewHistoryPage.js.map