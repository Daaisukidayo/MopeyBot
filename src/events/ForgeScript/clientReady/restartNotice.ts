import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  type: "clientReady",
  code: `
    $let[saved;$getGlobalVar[restartNotice]]
    $onlyIf[$get[saved]!=]
    $deleteGlobalVar[restartNotice]
    $jsonLoad[notice;$get[saved]]

    $addContainer[
      $addTextDisplay[## _Back online in \`$round[$math[($getTimestamp - $jsonGet[notice;at]) / 1000]]\`s!_]
    ;$getGlobalVar[defaultColor]]
    $sendMessage[$jsonGet[notice;channel]]
  `,
})
