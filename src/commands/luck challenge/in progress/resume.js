import challengeSnippets from '#snippets/challengeSnippets.js'
import universalSnippets from '#snippets/universalSnippets.js'

export default {
  name: "resume",
  aliases: ["continue", "res"],
  type: "messageCreate",
  code: `
    $reply
    ${challengeSnippets.isActiveChallenge()}
    ${universalSnippets.checkProfile({addCooldown: false})}

    $onlyIf[$env[challengeProgress;paused];
      $callFunction[embed;error] 
      $description[## You haven't paused your challenge!]
    ]

    $!jsonSet[challengeProgress;paused;false]
    $setUserVar[challengeProgress|$channelID;$env[challengeProgress]]

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]  
      $addTextDisplay[# Continued!]
      $addSeparator[Large]
      $addTextDisplay[## $callFunction[showPoints;$authorID]]
      $addSeparator
      $addTextDisplay[## $callFunction[showTime;$authorID]]
    ;$getGlobalVar[luckyColor]]
    ${challengeSnippets.interval()}
  `
}