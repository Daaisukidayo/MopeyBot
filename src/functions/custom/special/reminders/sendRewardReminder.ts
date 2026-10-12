import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "sendRewardReminder",
  description: "Sends a reward reminder to a user's DM",
  brackets: true,
  params: [
    {
      name: "userId",
      description: "The ID of the user to remind",
      type: ArgType.String
    },
    {
      name: "reminderId",
      description: "The reminder ID from data.reminders (0 - daily, 1 - weekly)",
      type: ArgType.String
    },
    {
      name: "locale",
      description: "The user's language",
      type: ArgType.String
    }
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
  `
})
