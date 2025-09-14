import challengeSnippets from '#snippets/challengeSnippets.js'
import universalSnippets from '#snippets/universalSnippets.js'
import lobbySnippets from '#snippets/lobbySnippets.js'

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
    ${challengeSnippets.loadGJSON()}
    ${lobbySnippets.loadLobbyVars()}
    
    $let[hasDifficulty;$arrayIncludes[userSettings;difficulties]]
    $let[hideRaresLimit;$arrayIncludes[userSettings;hideLimit]]
    $let[unlimitedRares;$if[$getChannelVar[lobby]!=;$arrayIncludes[lobbyTags;unlimitedRares];$arrayIncludes[userSettings;unlimitedRares]]]
    $arrayLoad[limitsContent]
    ${challengeSnippets.raresLimit()}

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]  
      $addTextDisplay[# Continued!]
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
    ${challengeSnippets.interval()}
  `
}