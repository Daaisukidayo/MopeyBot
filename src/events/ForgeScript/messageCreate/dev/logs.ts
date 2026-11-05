import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: "logs",
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $onlyIf[$or[$isDev;$authorID==485453670729646090]]
    $let[l;$jsonGet[userProfile;language]]
    $let[id;$pm2ID]

    $let[lines;$default[$message[0];50]]
    $onlyIf[$and[$isNumber[$get[lines]];$inRange[$get[lines];1;1000]];
      $newError[$tl[ui.errors.invalidArguments.$get[l]]]
    ]

    $let[logs;$replaceRegex[$exec[pm2 logs $get[id] --nostream --raw --lines $get[lines]];\u001b.*?m;g;]]

    $attachment[$get[logs];logs.txt;true]
    Last $get[lines] lines of each log
  `,
})
