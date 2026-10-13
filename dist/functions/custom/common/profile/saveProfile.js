"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "saveProfile",
    description: "Saves and updates the user's profile.",
    params: [
        {
            name: "userProfile",
            description: "User's JSON profile",
            type: forgescript_1.ArgType.Json
        }
    ],
    code: `
    $setUserVar[userProfile;$env[userProfile];$jsonGet[userProfile;ID]]
  `
});
//# sourceMappingURL=saveProfile.js.map