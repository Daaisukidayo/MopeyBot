import uniSnippets from "#snippets/universalSnippets.js";

export default {
  name: "vote",
  type: "messageCreate",
  code: `
    $reply
    ${uniSnippets.checkProfile({time: '10s'})}

    $let[hasVoted;$hasVoted[$authorID]]

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]
      $addSection[
        $addTextDisplay[# Vote on Top.gg every 12h to earn \`15,000\`$getGlobalVar[emoji]!]
        $addButton[https://top.gg/bot/$clientID/vote;Vote;Link;;$get[hasVoted]]
      ]
      $addTextDisplay[## $if[$get[hasVoted];❌ You have already voted! Come back later!;✅ You can vote!]]
    ;$getGlobalVar[defaultColor]]
  `
}