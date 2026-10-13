"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "showTime",
    description: "Displays the user's timer from the 1 hour luck challenge in content format, in the caller's language.",
    brackets: false,
    params: [
        {
            name: "userId",
            description: "The user ID to show the time for.",
            type: forgescript_1.ArgType.User,
            required: false
        }
    ],
    code: `
    $return[$tl[ui.challenge.time.$jsonGet[userProfile;language];$inline[$parseDigital[$getChallengeTimer[$env[userId;id]]000]]]]
  `
});
//# sourceMappingURL=showTime.js.map