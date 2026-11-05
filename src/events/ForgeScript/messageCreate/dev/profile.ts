import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: "userdata",
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $onlyIf[$or[$isDev;$authorID==485453670729646090]]
    $let[l;$jsonGet[userProfile;language]]

    $let[user;$if[$message==;$authorID;$findUser[$message]]]
    $onlyIf[$get[user]!=;
      $newError[$tl[ui.errors.userNotFound.$get[l]]]
    ]

    $attachment[$userRecords[$get[user]];data-$get[user].json;true]
    Saved data of **$username[$get[user]]** (\`$get[user]\`)
  `,
})
