import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: "runreset",
  aliases: ["rr"],
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $onlyIf[$isDev]

    $let[kind;$toLowerCase[$message[0]]]
    $onlyIf[$isOneOf[$get[kind];daily;weekly];
      $newError[Usage: runreset (daily | weekly) confirm]
    ]

    $onlyIf[$toLowerCase[$message[1]]==confirm;
      $newError[The $get[kind] reset runs for every user: it sends the reward reminders. Add \`confirm\` to run it.]
    ]

    $addContainer[
      $addTextDisplay[## The $get[kind] reset has started]
    ;$getGlobalVar[defaultColor]]
    $!send
    $let[start;$getTimestamp]

    $if[$get[kind]==daily;
      $setGlobalVar[lastCheckedDayInReady;-1]
      $runDailyReset
    ;
      $setGlobalVar[lastCheckedWeeklyInReady;-1]
      $runWeeklyReset
    ]

    $addContainer[
      $addTextDisplay[## The $get[kind] reset has finished in \`$math[$getTimestamp - $get[start]]ms\`]
    ;$getGlobalVar[defaultColor]]
  `,
})
