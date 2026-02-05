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

    $if[$getUserVar[userProfile;$get[ID]]==;
      $author[$username[$get[ID]];$userAvatar[$get[ID]]]
      $description[$tl[ui.vote.userWithoutProfileVoted]]
    ;
      $jsonLoad[userProfile;$getUserVar[userProfile;$get[ID]]]
      $sumCash[$get[MC]]
      $setUserVar[userProfile;$env[userProfile];$get[ID]]
      $description[$tl[ui.vote.userWithProfileVoted;$get[MC]]]
      $addAuthor
    ]
    $color[$getGlobalVar[defaultColor]]
    $sendDM[$get[ID]]
  `
}