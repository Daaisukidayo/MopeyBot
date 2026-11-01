import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: "testermode",
  aliases: ["tmode", "tm"],
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $onlyIf[$or[$arrayIncludes[$getGlobalVar[allTesterIDs];$authorID];$isDev]]
    $let[arg;$toLowerCase[$message]]

    $onlyIf[$isOneOf[$get[arg];on;off]]

    $!jsonSet[userProfile;tester;$checkCondition[$get[arg]==on]]
    $callMethod[userProfile;save]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[## ✅ Successfully __$if[$get[arg]==on;Enabled;Disabled]__ tester mode!]
    ;$getGlobalVar[defaultColor]]
  `,
})
