import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  type: "voted",
  code: `
    $let[ID;$voteUserID]
    $let[MC;$getGlobalVar[voteReward]]
    $logger[Info;User $username[$get[ID]] voted on Top.gg]

    $jsonLoad[userProfile;$getProfile[$get[ID]]]
    $let[l;$jsonGet[userProfile;language]]
    $let[hasProfile;$jsonGet[userProfile;acceptedRules]]

    $c[The reward is given even if the user can't be messaged]
    $if[$get[hasProfile];
      $sumCash[$get[MC]]
      $saveProfile[$env[userProfile]]
    ]

    $onlyIf[$isUserDMEnabled[$get[ID]]]
    $addContainer[
      $if[$get[hasProfile];
        $addAuthorDisplay
        $addTextDisplay[$tl[ui.vote.userWithProfileVoted.$get[l];$separate[$get[MC]]]]
      ;
        $addTextDisplay[## \`$username[$get[ID]]\`]
        $addSeparator[Large]
        $addTextDisplay[$tl[ui.vote.userWithoutProfileVoted.$get[l]]]
      ]
    ;$getGlobalVar[defaultColor]]
    $sendDM[$get[ID]]
  `,
})
