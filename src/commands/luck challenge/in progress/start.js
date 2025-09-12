import challengeSnippets from '#snippets/challengeSnippets.js'
import universalSnippets from '#snippets/universalSnippets.js'

export default {
  name: "start",
  type: "messageCreate",
  code: `
    $reply
    ${universalSnippets.checkProfile({addCooldown: false})}

    $onlyIf[$getUserVar[challengeProgress|$channelID]==;
      $callFunction[embed;error] 
      $description[## You already have an active challenge!]
    ]
    $onlyIf[$getChannelVar[lobby]==;
      $callFunction[embed;error] 
      $description[## You can't start the challenge in channel with active Lobby!]
    ]

    $callFunction[embed;lucky]
    $description[# 1 Hour Luck Challenge has begun!\n## Don't forget to turn on notification!]
    ${challengeSnippets.setChallengeVars()}
    ${challengeSnippets.interval()}
  `
}