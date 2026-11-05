import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: "update",
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $onlyIf[$or[$isDev;$authorID==485453670729646090]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[## _Updating..._]
    ;$getGlobalVar[defaultColor]]

    $c[in the background bc it takes minutes and has to outlive the restart. the script reports here itself]
    $!exec[(cd ~/bot && node scripts/update.js $channelID) > ~/update.log 2>&1 &]
  `,
})
