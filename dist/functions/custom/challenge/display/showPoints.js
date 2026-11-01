"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "showPoints",
    description: "total points of the 1h luck challenge, hidden if the profile settings say so",
    params: [
        {
            name: "progressVar",
            description: "var w/ the challenge progress",
            type: forgescript_1.ArgType.String,
        },
    ],
    code: `
    $ref[progress;$env[progressVar]]
    $let[points;$jsonGet[progress;points]]
    $return[$tl[ui.challenge.points.$jsonGet[userProfile;language];$if[$arrayIncludes[$jsonGet[userProfile;challenge;settings];hidePoints];||$get[points]||;\`$get[points]\`]]]
  `,
});
//# sourceMappingURL=showPoints.js.map