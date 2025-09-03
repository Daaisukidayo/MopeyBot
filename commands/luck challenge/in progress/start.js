import interval from '../../../JSfunctions/luck challenge/interval.js'
import setChallengeVars from '../../../JSfunctions/luck challenge/setChallengeVars.js'

export default {
  name: "start",
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]

    $onlyIf[$getUserVar[challengeProgress|$channelID]==;
      $callFunction[embed;error] 
      $description[## You already have an active challenge!]
    ]
    $onlyIf[$getChannelVar[lobby]==;
      $callFunction[embed;error] 
      $description[## You can't start the challenge in channel with active Lobby!]
    ]

    $callFunction[embed;lucky]
    $description[# 1 Hour Luck Challenge has begun!\n## Don't forget to turn on notification!]
    ${setChallengeVars()}
    ${interval()}
  `
}