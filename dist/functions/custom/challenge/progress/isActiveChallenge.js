"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "isActiveChallenge",
    description: "stops the command w/ an error if the challenge in 'challengeProgress' isn't going on",
    params: [
        {
            name: "progressVar",
            description: "var w/ the challenge progress",
            type: forgescript_1.ArgType.String,
        },
    ],
    code: `
    $ref[progress;$env[progressVar]]
    $onlyIf[$jsonGet[progress;started]==true;
      $newError[$tl[ui.challenge.active.$jsonGet[userProfile;language]]]
    ]
  `,
});
//# sourceMappingURL=isActiveChallenge.js.map