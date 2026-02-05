export default {
  type: "voted",
  code: `
    $let[ID;$voteUserID]
    $let[MC;$getGlobalVar[voteReward]]
    $jsonLoad[funcCache;{}]

    $chalkLog[$username[$get[ID]] Voted on Top.gg;bold;italic;green]

    $onlyIf[$isUserDMEnabled[$get[ID]]]

    $jsonLoad[userProfile;$getProfile[$get[ID]]]

    $if[$env[userProfile;acceptedRules];
      $sumCash[$get[MC]]
      $saveProfile[$get[ID]]
      $description[$tl[ui.vote.userWithProfileVoted;$get[MC]]]
      $addAuthor
    ;
      $author[$username[$get[ID]];$userAvatar[$get[ID]]]
      $description[$tl[ui.vote.userWithoutProfileVoted]]
    ]
    $color[$getGlobalVar[defaultColor]]
    $sendDM[$get[ID]]
  `
}