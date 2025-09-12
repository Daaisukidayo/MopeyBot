import challengeSnippets from '#snippets/challengeSnippets.js'

export default {
  name: "pause",
  type: "messageCreate",
  code: `
    $reply
    ${challengeSnippets.isActiveChallenge()}
    
    $onlyIf[$env[challengeProgress;paused]==false;
      $callFunction[embed;error]
      $description[## You already have paused the challenge!]
    ]

    $onlyIf[$getUserVar[1htime|$channelID]<3600;
      $callFunction[embed;error]
      $description[## Time's up!]
    ]
    
    $!jsonSet[challengeProgress;paused;true]
    $setUserVar[challengeProgress|$channelID;$env[challengeProgress]]
    $!stopInterval[1HLUCK-$authorID|$channelID]

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]  
      $addTextDisplay[# Paused!]
      $addSeparator[Large]
      $addTextDisplay[## $callFunction[showPoints;$authorID]]
      $addSeparator
      $addTextDisplay[## $callFunction[showTime;$authorID]]
    ;$getGlobalVar[luckyColor]]
  `
}