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
        $addTextDisplay[$tl[$get[l];ui;vote.userWithProfileVoted;$separate[$get[MC]]]]
        $sumCash[$get[MC]]
        $saveProfile[$get[ID]]
      ;
        $addTextDisplay[## \`$username[$get[ID]]\`]
        $addSeparator[Large]
        $addTextDisplay[$tl[$get[l];ui;vote.userWithoutProfileVoted]]
      ]
    ;$getGlobalVar[defaultColor]]
    $sendDM[$get[ID]]
  `
}