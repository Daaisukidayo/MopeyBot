import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: "dev",
  type: "messageCreate",
  code: `
    $reply
    $onlyForUsers[;$botOwnerID]

    $jsonLoad[userProfile;$getProfile]
    $let[mode;$toLowerCase[$message]]

    $onlyIf[$isOneOf[$get[mode];0;1];
      $newError[Unknown dev mode]
    ]

    $!jsonSet[userProfile;dev_mode;$get[mode]]
    $callMethod[userProfile;save]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[## ✅ Successfully __$if[$get[mode]==1;Enabled;Disabled]__ developer mode!]
    ;$getGlobalVar[defaultColor]]
  `,
})
