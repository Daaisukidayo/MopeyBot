"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "settingsEmbed",
    code: `
    $jsonLoad[styles;$getGlobalVar[styles]]

    $let[l;$jsonGet[userProfile;language]]
    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.settings.title.$get[l]]]

      $addSeparator[Large]

      $arrayForEach[$getGlobalVar[allSettings];key;
        $let[hasKey;$arrayIncludes[$jsonGet[userProfile;challenge;settings];$env[key]]]

        $addSection[
          $addTextDisplay[## _$tl[data.allSettings.$env[key].$get[l]]_]
          $addButton[settings-$env[key]-$authorID;$tl[ui.settings.state$if[$get[hasKey];Enabled;Disabled].$get[l]];$if[$get[hasKey];Success;Danger]]
        ]
      ]

      $addSeparator[Large]
      $addTextDisplay[$tl[ui.settings.difficulty.$get[l]]]

      $addActionRow
      $arrayForEach[$getGlobalVar[difficulties];elem;
        $let[disabled;$checkCondition[$jsonGet[userProfile;challenge;difficulty]==$env[elem]]]

        $let[style;$jsonGet[styles;$env[i]]]
        $addButton[settings-$env[elem]-$authorID;$tl[data.difficulties.$env[elem].$get[l]];$get[style];;$get[disabled]]
      ;i]
    ;$getGlobalVar[luckyColor]]
  `,
});
//# sourceMappingURL=settingsEmbed.js.map