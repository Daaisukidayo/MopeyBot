export default function isActiveChallenge () {
  return `
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $jsonLoad[challengeProgress;$getUserVar[challengeProgress|$channelID]]
    $onlyIf[$env[challengeProgress]!=;
      $callFunction[embed;error] 
      $description[## You don't have an active challenge!]
    ]
  `
}