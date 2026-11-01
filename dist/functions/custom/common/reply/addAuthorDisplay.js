"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "addAuthorDisplay",
    description: "adds a text w/ the author's username and MUID",
    brackets: false,
    params: [
        {
            name: "withAvatar",
            description: "show the avatar as a thumbnail (default true)",
            type: forgescript_1.ArgType.Boolean,
            required: false,
        },
    ],
    code: `
    $c[accepted the rules = MUID after the name]
    $let[name;# \`$username[$jsonGet[userProfile;user_id]]$if[$jsonGet[userProfile;verified];#$jsonGet[userProfile;muid]]\`]

    $if[$nullish[$env[withAvatar];true];
      $addSection[
        $addTextDisplay[$get[name]]
        $addThumbnail[$userAvatar[$jsonGet[userProfile;user_id];4096]]
      ]
    ;
      $addTextDisplay[$get[name]]
    ]
    $addSeparator[Large]
  `,
});
//# sourceMappingURL=addAuthorDisplay.js.map