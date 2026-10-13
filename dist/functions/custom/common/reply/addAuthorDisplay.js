"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "addAuthorDisplay",
    description: "Adds an text display to the embed, showing the author's username and MUID.",
    brackets: false,
    params: [
        {
            name: "withAvatar",
            description: "Whether to show the user avatar as thumbnail (default: true).",
            type: forgescript_1.ArgType.Boolean,
            required: false
        }
    ],
    code: `
    $c[A user who accepted the rules has a MUID after the name]
    $let[name;# \`$username[$jsonGet[userProfile;ID]]$if[$jsonGet[userProfile;acceptedRules];#$jsonGet[userProfile;MUID]]\`]

    $if[$nullish[$env[withAvatar];true];
      $addSection[
        $addTextDisplay[$get[name]]
        $addThumbnail[$userAvatar[$jsonGet[userProfile;ID];4096]]
      ]
    ;
      $addTextDisplay[$get[name]]
    ]
    $addSeparator[Large]
  `
});
//# sourceMappingURL=addAuthorDisplay.js.map