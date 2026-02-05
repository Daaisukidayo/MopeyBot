export default {
  type: "voted",
  code: `
    $let[ID;$voteUserID]
    $let[MC;$getGlobalVar[voteReward]]
    $jsonLoad[funcCache;{}]

    $sendMessage[$getGlobalVar[logChannelID];
      $author[$username[$get[ID]];$userAvatar[$get[ID]]]
      $description[## _Voted on Top.gg_]
      $color[$getGlobalVar[logColor]]
    ]

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