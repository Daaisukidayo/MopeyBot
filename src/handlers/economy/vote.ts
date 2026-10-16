import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "handleVote",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $checkProfile
    $addCooldown
    $defer

    $let[hasVoted;$hasVoted[$authorID]]

    $addContainer[
      $addAuthorDisplay
      $addSection[
        $addTextDisplay[$tl[ui.vote.$if[$get[hasVoted];cannotVote;canVote].$get[l];$separate[$getGlobalVar[voteReward]]]]
        $addButton[https://top.gg/bot/$clientID/vote;$tl[ui.vote.buttonLabel.$get[l]];Link;;$get[hasVoted]]
      ]
    ;$getGlobalVar[defaultColor]]
  `,
})
