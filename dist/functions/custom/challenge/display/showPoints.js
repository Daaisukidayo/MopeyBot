"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "showPoints",
    description: "Displays the total points of a 1 hour luck challenge in content format, hidden when the profile's settings say so.",
    params: [
        {
            name: "progressVar",
            description: "The name of the variable that holds the challenge progress.",
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