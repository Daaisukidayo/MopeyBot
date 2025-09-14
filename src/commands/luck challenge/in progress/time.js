import challengeSnippets from "#snippets/challengeSnippets.js"
import universalSnippets from "#snippets/universalSnippets.js"

export default {
  name: "time",
  type: "messageCreate",
  code: `
    $reply
    ${challengeSnippets.isActiveChallenge()}
    ${universalSnippets.checkProfile({addCooldown: false})}

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