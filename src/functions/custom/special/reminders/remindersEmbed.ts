import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
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
})
