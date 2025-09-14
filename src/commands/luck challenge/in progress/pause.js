import challengeSnippets from '#snippets/challengeSnippets.js'
import universalSnippets from '#snippets/universalSnippets.js'
import lobbySnippets from '#snippets/lobbySnippets.js'

export default {
  name: "pause",
  type: "messageCreate",
  code: `
    $reply
    ${challengeSnippets.isActiveChallenge()}
    ${universalSnippets.checkProfile({addCooldown: false})}
    
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
    ${challengeSnippets.stopUserInterval()}
    ${lobbySnippets.loadLobbyVars()}
    ${challengeSnippets.loadGJSON()}

    $let[hasDifficulty;$arrayIncludes[userSettings;difficulties]]
    $let[hideRaresLimit;$arrayIncludes[userSettings;hideLimit]]
    $let[unlimitedRares;$if[$getChannelVar[lobby]!=;$arrayIncludes[lobbyTags;unlimitedRares];$arrayIncludes[userSettings;unlimitedRares]]]
    $arrayLoad[limitsContent]
    ${challengeSnippets.raresLimit()}

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]  
      $addTextDisplay[# Paused!]
      $addSeparator[Large]
      $addTextDisplay[## $callFunction[showPoints;$authorID]]
      $addSeparator
      $addTextDisplay[## $callFunction[showTime;$authorID]]
      $if[$or[$get[unlimitedRares];$get[hideRaresLimit]];;
        $if[$arrayLength[limitsContent]==0;  $arrayPush[limitsContent;※ All commons received]  ]

        $addSeparator[Large]
        $addTextDisplay[# $arrayJoin[limitsContent; ]]
      ]
    ;$getGlobalVar[luckyColor]]
  `
}