"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "sendRewardReminder",
    description: "DMs the user a reward reminder",
    brackets: true,
    params: [
        {
            name: "userId",
            description: "who to remind",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "reminderId",
            description: "the reminder ID from data.reminders (0 = daily, 1 = weekly)",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "locale",
            description: "the user's language",
            type: forgescript_1.ArgType.String,
        },
    ],
    code: `
    $addContainer[
      $addTextDisplay[$tl[ui.reminders.sentReminderTitle.$env[locale]]]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.reminders.on.$env[locale];$tl[data.reminders.$env[reminderId].$env[locale]]]]
      $addSeparator
      $addTextDisplay[$tl[ui.reminders.sentReminderTip.$env[locale];/reminders]]
    ;$getGlobalVar[defaultColor]]
    $sendDM[$env[userId]]
  `,
});
//# sourceMappingURL=sendRewardReminder.js.map