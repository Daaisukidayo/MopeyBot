import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: 'handleEnd',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile

    $isActiveChallenge

    $defer

    $stopTimer
    $deleteTime

    $jsonLoad[challengeProgress;$getProgress]
    $jsonLoad[raresList;$env[challengeProgress;list]]
    $jsonLoad[result;$generateList[$sortList[$env[raresList]]]]

    $jsonLoad[list;$env[result;l]]

    $addChallengeCompletedContainer[{
      "locale": "$get[l]",
      "points": $env[challengeProgress;points],
      "rares": $env[challengeProgress;rares],
      "list": $env[list]
    }]   
    $!send
    
    $if[$getChannelVar[lobby]==;
      $deleteChallengeProgress
    ;
      $!jsonSet[challengeProgress;started;false]
      $saveProgress[$env[challengeProgress]]
      $allPlayersFinished
    ]
  `
})