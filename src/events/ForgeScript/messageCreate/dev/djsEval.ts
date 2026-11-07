import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: "djseval",
  aliases: ["js"],
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $onlyIf[$or[$isDev;$authorID==485453670729646090]]
    $let[res;$trim[$js[$message]]]
    $if[$charCount[$get[res]]>2000;
      $attachment[$get[res];res.json;true]
    ;
      $get[res]
    ]
  `,
})