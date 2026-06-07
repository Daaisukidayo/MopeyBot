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
          $addTextDisplay[$tl[$get[l];ui;vote.cannotVote;$get[reward]]]
        ;
          $addTextDisplay[$tl[$get[l];ui;vote.canVote;$get[reward]]]
        ]
        $addButton[https://top.gg/bot/$clientID/vote;$tl[$get[l];ui;vote.buttonLabel];Link;;$get[hasVoted]]
      ]
    ;$getGlobalVar[defaultColor]]
  `
}