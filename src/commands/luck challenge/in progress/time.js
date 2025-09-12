import challengeSnippets from "#snippets/challengeSnippets.js"

export default {
  name: "time",
  type: "messageCreate",
  code: `
    $reply
    ${challengeSnippets.isActiveChallenge()}

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]  
      $if[$env[challengeProgress;paused];
        $addTextDisplay[## Status: Paused]
      ;
        $addTextDisplay[## Status: In progress]
      ]
      $addSeparator[Large]
      $addTextDisplay[## $callFunction[showTime;$authorID]]
    ;$getGlobalVar[luckyColor]]
  `
}