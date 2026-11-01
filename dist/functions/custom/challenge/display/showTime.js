"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "showTime",
    description: "the user's 1h luck challenge timer, in the caller's language",
    brackets: false,
    params: [
        {
            name: "userId",
            description: "whose time to show",
            type: forgescript_1.ArgType.User,
            required: false,
        },
    ],
    code: `
    $return[$tl[ui.challenge.time.$jsonGet[userProfile;language];$inline[$parseDigital[$getChallengeTimer[$env[userId;id]]000]]]]
  `,
});
//# sourceMappingURL=showTime.js.map