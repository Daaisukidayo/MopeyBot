export default {
  name: 'handleVote',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown

    $defer

    $let[hasVoted;$hasVoted[$authorID]]
    $let[reward;$separate[$getGlobalVar[voteReward]]]

    $addContainer[
      $addAuthorDisplay
      $addSection[
        $if[$get[hasVoted];
          $addTextDisplay[$tl[ui.vote.cannotVote;$get[reward]]]
        ;
          $addTextDisplay[$tl[ui.vote.canVote;$get[reward]]]
        ]
        $addButton[https://top.gg/bot/$clientID/vote;$tl[ui.vote.buttonLabel];Link;;$get[hasVoted]]
      ]
    ;$getGlobalVar[defaultColor]]
    $send
  `
}