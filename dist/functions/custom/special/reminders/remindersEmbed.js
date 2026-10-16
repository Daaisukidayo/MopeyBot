"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "remindersEmbed",
    code: `
    $let[l;$jsonGet[userProfile;language]]
    $jsonLoad[userReminders;$getUserVar[userReminders]]
    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.reminders.title.$get[l]]]
      $addSeparator[Large]

      $arrayForEach[$getGlobalVar[allReminders];reminder;
        $let[on;$arrayIncludes[userReminders;$env[reminder]]]
        $addSection[
          $addTextDisplay[## _$tl[data.reminders.$env[reminder].$get[l]]_]
          $addButton[reminders-$env[reminder]-$authorID;$tl[ui.reminders.$if[$get[on];enabled;disabled].$get[l]];$if[$get[on];Success;Danger]]
        ]
      ]
    ;$getGlobalVar[defaultColor]]
  `,
});
//# sourceMappingURL=remindersEmbed.js.map