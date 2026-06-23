export default {
  type: "voted",
  code: `
    $let[ID;$voteUserID]
    $let[MC;$getGlobalVar[voteReward]]
    

    $logger[Info;User $username[$get[ID]] voted on Top.gg]

    $onlyIf[$isUserDMEnabled[$get[ID]]]

    $jsonLoad[userProfile;$getProfile[$get[ID]]]
    $let[l;$env[userProfile;language]]

    $addContainer[
      $if[$env[userProfile;acceptedRules];
        $addAuthorDisplay
        $addTextDisplay[$tl[ui.vote.userWithProfileVoted.$get[l];$separate[$get[MC]]]]
        $sumCash[$get[MC]]
        $saveProfile[$env[userProfile]]
      ;
        $addTextDisplay[## \`$username[$get[ID]]\`]
        $addSeparator[Large]
        $addTextDisplay[$tl[ui.vote.userWithoutProfileVoted.$get[l]]]
      ]
    ;$getGlobalVar[defaultColor]]
    $sendDM[$get[ID]]
  `
}