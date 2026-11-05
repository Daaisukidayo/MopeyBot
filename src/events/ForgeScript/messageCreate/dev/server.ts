import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: "server",
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $onlyIf[$or[$isDev;$authorID==485453670729646090]]
    $let[id;$pm2ID]

    $try[
      $jsonLoad[processes;$exec[pm2 jlist]]
      $jsonLoad[process;$arrayFind[processes;item;$jsonGet[item;pm_id]==$get[id]]]
    ;
      $newError[pm2 didn't answer]
    ]
    $try[$let[commit;$trim[$exec[git rev-parse --short HEAD 2>/dev/null]]];$let[commit;no git]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[## _$jsonGet[process;name]: $jsonGet[process;pm2_env;status]_]
      $addTextDisplay[## _CPU:_ \`$jsonGet[process;monit;cpu]%\`]
      $addTextDisplay[## _RAM:_ \`$round[$math[$jsonGet[process;monit;memory] / 1048576]] MB\`]
      $addTextDisplay[## _Uptime:_ \`$parseMS[$math[$getTimestamp - $jsonGet[process;pm2_env;pm_uptime]];2]\`]
      $addTextDisplay[## _Restarts:_ \`$jsonGet[process;pm2_env;restart_time]\`]
      $addTextDisplay[## _Commit:_ \`$get[commit]\`]
      $addSeparator[Large]
      $addTextDisplay[$codeBlock[$trim[$exec[df -h .]]]]
    ;$getGlobalVar[defaultColor]]
  `,
})
