"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "isActiveChallenge",
    description: "Stops the command with an error if the challenge loaded in 'challengeProgress' is not going on",
    params: [
        {
            name: "progressVar",
            description: "The name of the variable that holds the challenge progress.",
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