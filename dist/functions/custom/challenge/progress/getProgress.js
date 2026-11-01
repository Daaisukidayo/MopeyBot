"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "getProgress",
    description: "the user's luck challenge progress",
    output: forgescript_1.ArgType.Json,
    brackets: false,
    params: [
        {
            name: "userId",
            description: "the user's ID",
            type: forgescript_1.ArgType.User,
            required: false,
        },
    ],
    code: `
    $jsonLoad[progress;$getUserVar[challengeProgress|$channelID;$nullish[$env[userId;id];$authorID]]]
    $c[old progress (pre ChallengeProgress) has no class name]
    $if[$and[$env[progress]!=;$isInstance[progress]==false];
      $!jsonSet[progress;__class;ChallengeProgress]
    ]
    $return[$env[progress]]
  `,
});
//# sourceMappingURL=getProgress.js.map