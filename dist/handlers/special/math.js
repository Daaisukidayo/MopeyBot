"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "handleMath",
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    $checkProfile

    $let[e;$default[$option[expression];$message]]
    $let[a;$math[$get[e]]]
    $onlyIf[$get[a]!=;
      $let[prefix;$getPrefix]
      $newError[$tl[ui.errors.usage.$get[l];$get[prefix]math <$tl[ui.math.expression.$get[l]]>]]
    ]

    $addTextDisplay[## $get[e] = $get[a]]
  `,
});
//# sourceMappingURL=math.js.map