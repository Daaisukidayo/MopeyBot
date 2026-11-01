"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "showRares",
    description: "total rares count of the 1h luck challenge, hidden if the profile settings say so",
    params: [
        {
            name: "progressVar",
            description: "var w/ the challenge progress",
            type: forgescript_1.ArgType.String,
        },
    ],
    code: `
    $ref[progress;$env[progressVar]]
    $let[rares;$jsonGet[progress;rares]]
    $return[$tl[ui.challenge.rares.$jsonGet[userProfile;language];$if[$arrayIncludes[$jsonGet[userProfile;challenge;settings];hideRares];||$get[rares]||;\`$get[rares]\`]]]
  `,
});
//# sourceMappingURL=showRares.js.map