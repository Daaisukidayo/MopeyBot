export default {
  type: "voted",
  code: `
    $let[ID;$voteUserID]
    $let[MC;$getGlobalVar[voteReward]]
    $jsonLoad[funcCache;{}]

    $logger[Info;User $username[$get[ID]] voted on Top.gg]

    $onlyIf[$isUserDMEnabled[$get[ID]]]

    $jsonLoad[userProfile;$getProfile[$get[ID]]]

    $addContainer[
      $if[$env[userProfile;acceptedRules];
        $addAuthorDisplay
        $addTextDisplay[$tl[ui.vote.userWithProfileVoted;$get[MC]]]
        $sumCash[$get[MC]]
        $saveProfile[$get[ID]]
      ;
        $addTextDisplay[## \`$username[$get[ID]]\`]
        $addSeparator[Large]
        $addTextDisplay[$tl[ui.vote.userWithoutProfileVoted]]
      ]
    ;$getGlobalVar[defaultColor]]
    $sendDM[$get[ID]]
  `
}