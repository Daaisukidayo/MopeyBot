"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "getProfile",
    description: "Returns the user's profile in JSON format.",
    output: forgescript_1.ArgType.Json,
    brackets: false,
    params: [
        {
            name: "userId",
            description: "ID of the user.",
            type: forgescript_1.ArgType.User,
            required: false,
        },
    ],
    code: `
    $jsonLoad[profile;$getUserVar[userProfile;$nullish[$env[userId;id];$authorID]]]
    $c[Keys added to the profile config later are filled in for older profiles]
    $objectDefaults[profile;$getGlobalVar[userProfile]]
    $return[$env[profile]]
  `,
});
//# sourceMappingURL=getProfile.js.map