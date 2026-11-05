import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: "backup",
  type: "messageCreate",
  code: `
    $jsonLoad[userProfile;$getProfile]
    $onlyIf[$or[$isDev;$authorID==485453670729646090]]

    $try[$!exec[node scripts/db-backup.js];$newError[The backup failed, check the logs]]

    $jsonLoad[files;$readDir[database/backups]]
    $arrayFilter[files;file;$startsWith[$env[file];forge-];backups]
    $arraySort[backups;backups]
    $let[name;$jsonGet[backups;-1]]

    $c[max 10 MB]
    $onlyIf[$fileSize[database/backups/$get[name]]<=10485760;
      $newError[Too big for Discord, it's saved as $get[name]]
    ]

    $attachment[database/backups/$get[name];$get[name]]
    $sendDM[$authorID;Database backup]

    $reply
    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[## _Backup sent to your DMs!_]
    ;$getGlobalVar[defaultColor]]
  `,
})
