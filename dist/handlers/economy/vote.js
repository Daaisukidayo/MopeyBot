"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
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
});
//# sourceMappingURL=vote.js.map