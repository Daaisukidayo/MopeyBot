"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "checkProfile",
    description: "Checks the user's profile for specific conditions.",
    code: `
    $c[While the bot is turned off, only developers can use it]
    $onlyIf[$or[$isDev;$getGlobalVar[botEnabled]]]
    $onlyIf[$jsonGet[userProfile;isBanned]!=true]

    $c[The permissions are listed only when one is missing]
    $onlyIf[$hasPerms[$guildID;$botID;EmbedLinks;AttachFiles;AddReactions];
      $newError[I am missing some required permissions!
        $codeBlock[$arrayJoin[$arrayMap[$arrayOf[EmbedLinks;AttachFiles;AddReactions];perm;$return[$env[perm] $if[$hasPerms[$guildID;$botID;$env[perm]];✅;❌]]];\n]]
      ]
    ]
    $onlyIf[$jsonGet[userProfile;acceptedRules];$robotCheck]
    $onlyIf[$jsonGet[userProfile;onSlowmode]!=true]
  `
});
//# sourceMappingURL=checkProfile.js.map