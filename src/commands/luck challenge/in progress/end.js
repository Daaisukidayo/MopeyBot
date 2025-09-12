import lobbySnippets from '#snippets/lobbySnippets.js'
import challengeSnippets from '#snippets/challengeSnippets.js'

export default {
  name: "end",
  type: "messageCreate",
  code: `
    $reply
    ${challengeSnippets.isActiveChallenge()}
    ${challengeSnippets.loadGJSON()}
    $jsonLoad[raresList;$env[challengeProgress;list]]
    ${challengeSnippets.listGenerator()}

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]
      $addTextDisplay[# 1 Hour Luck Ended!]
      $addSeparator[Large]
      $addTextDisplay[## $callFunction[showPoints]]
      $addTextDisplay[## $callFunction[showRares]]
      $addSeparator[Large]
      ${challengeSnippets.listDesign()}
    ;$getGlobalVar[luckyColor]]
    $sendMessage[$channelID]
    
    $if[$getChannelVar[lobby]==;
      ${challengeSnippets.clearUserChallengeVars()}
    ;
      $!jsonSet[challengeProgress;started;false]
      $setUserVar[challengeProgress|$channelID;$env[challengeProgress]]
      $!stopInterval[1HLUCK-$authorID|$channelID]
      $deleteUserVar[1htime|$channelID]
      ${lobbySnippets.allPlayersEnded()}
    ]
  `
}
