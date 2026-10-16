"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "raretrymodeEmbed",
    code: `
    $let[l;$jsonGet[userProfile;language]]
    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.raretrymode.title.$get[l]]]

      $c[Three buttons in a row]
      $arrayForEach[$getGlobalVar[raretryModes];mode;
        $if[$math[$env[i] % 3]==0;
          $addActionRow
        ]

        $addButton[rtMode-$env[mode]-$authorID;$tl[data.raretryModes.$env[mode].$get[l]];Success;;$checkCondition[$jsonGet[userProfile;rtMode]==$env[mode]]]
      ;i]
    ;$getGlobalVar[luckyColor]]
  `,
});
//# sourceMappingURL=raretrymodeEmbed.js.map