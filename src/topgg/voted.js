export default {
  type: "voted",
  code: `
    $let[ID;$voteUserID]
    $logger[Info;$get[ID] voted on Top.gg]

    $sendMessage[$getGlobalVar[logChannelID];
      $author[$username[$get[ID]];$userAvatar[$get[ID]]]
      $description[## Voted on Top.gg]
      $color[$getGlobalVar[logColor]]
    ]

    $onlyIf[$isUserDMEnabled[$get[ID]]]

    $if[$getUserVar[userProfile;$get[ID]]==;
      $author[$username[$get[ID]];$userAvatar[$get[ID]]]
      $description[## Thank you for voting! Register to earn reward!]
    ;
      $jsonLoad[userProfile;$getUserVar[userProfile;$get[ID]]]
      $let[MC;10000]
      $callFunction[sumMC;$get[MC]]
      $setUserVar[userProfile;$env[userProfile];$get[ID]]
      $description[## Thank you for voting! Your reward: \`$separateNumber[$get[MC];,]\`$getGlobalVar[emoji]]
      $getGlobalVar[author]
    ]
    $sendDM[$get[ID]]
  `
}