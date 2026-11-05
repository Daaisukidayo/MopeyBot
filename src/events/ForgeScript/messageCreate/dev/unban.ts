import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: "unban",
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $onlyIf[$or[$isDev;$authorID==485453670729646090]]
    $let[l;$jsonGet[userProfile;language]]

    $let[user;$findUser[$message]]
    $onlyIf[$get[user]!=;
      $newError[$tl[ui.errors.userNotFound.$get[l]]]
    ]

    $jsonLoad[target;$getProfile[$get[user]]]
    $objectMerge[target;$objectOf[user_id;"$get[user]";banned;false]]
    $callMethod[target;save]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[## _User <@$get[user]> has been unbanned!_]
    ;$getGlobalVar[defaultColor]]
  `,
})
