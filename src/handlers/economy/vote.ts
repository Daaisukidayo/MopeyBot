export default {
  name: 'handleVote',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer

    $let[hasVoted;$hasVoted[$authorID]]
    $let[reward;$separate[$getGlobalVar[voteReward]]]

    $addContainer[
      $addAuthorDisplay
      $addSection[
        $if[$get[hasVoted];
          $addTextDisplay[$tl[ui.vote.cannotVote.$get[l];$get[reward]]]
        ;
          $addTextDisplay[$tl[ui.vote.canVote.$get[l];$get[reward]]]
        ]
        $addButton[https://top.gg/bot/$clientID/vote;$tl[ui.vote.buttonLabel.$get[l]];Link;;$get[hasVoted]]
      ]
    ;$getGlobalVar[defaultColor]]
  `
}