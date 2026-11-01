"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "getProfile",
    description: "the user's profile as a UserProfile instance",
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
    $let[id;$nullish[$env[userId;id];$authorID]]
    $let[saved;$getUserVar[userProfile;$get[id]]]
    $if[$get[saved]==;
      $new[profile;UserProfile;$get[id]]
      $return[$env[profile]]
    ]

    $c[pre-class profiles get upgraded on the fly, migrateProfiles saves them for good]
    $jsonLoad[profile;$get[saved]]
    $if[$isInstance[profile]==false;$upgradeProfile[profile;$get[id]]]

    $c[backfill fields added to the class later]
    $new[fresh;UserProfile;$get[id]]
    $objectDefaults[profile;$env[fresh]]
    $return[$env[profile]]
  `,
});
//# sourceMappingURL=getProfile.js.map