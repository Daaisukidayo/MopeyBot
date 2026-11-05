import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: "restart",
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $onlyIf[$or[$isDev;$authorID==485453670729646090]]
    $let[id;$pm2ID]

    $c[restartNotice picks this up on the next start]
    $setGlobalVar[restartNotice;$objectOf[channel;"$channelID";at;$getTimestamp]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[## _Restarting..._]
    ;$getGlobalVar[defaultColor]]

    $!exec[(sleep 2 && pm2 restart $get[id]) > /dev/null 2>&1 &]
  `,
})
