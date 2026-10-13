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

      $arrayForEach[$jsonEntries[$getGlobalVar[allSettings]];entry;
        $let[key;$jsonGet[entry;0]]
        $let[hasKey;$arrayIncludes[$jsonGet[userProfile;challenge;settings];$get[key]]]

        $addSection[
          $addTextDisplay[## _$tl[data.allSettings.$jsonGet[entry;1].$get[l]]_]
          $addButton[settings-$get[key]-$authorID;$tl[ui.settings.state$if[$get[hasKey];Enabled;Disabled].$get[l]];$if[$get[hasKey];Success;Danger]]
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
  `
});
//# sourceMappingURL=settingsEmbed.js.map