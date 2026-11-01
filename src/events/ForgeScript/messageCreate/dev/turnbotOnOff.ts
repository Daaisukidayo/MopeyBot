import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: "bot",
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $onlyIf[$isDev]
    $let[arg;$toLowerCase[$message]]
    $onlyIf[$isOneOf[$get[arg];on;off]]

    $setGlobalVar[botEnabled;$checkCondition[$get[arg]==on]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[## _Successfully __$if[$get[arg]==on;Enabled;Disabled]__ $username[$botID]!_]
    ;$getGlobalVar[defaultColor]]
  `,
})
