import lobbySnippets from '#snippets/lobbySnippets.js'
import challengeSnippets from '#snippets/challengeSnippets.js'

export default {
  type: "interactionCreate",
  description: "When pressing Start",
  allowedInteractionTypes: ["button"],
  code: `
    $arrayLoad[IID;-;$customID]
    $onlyIf[$arrayIncludes[IID;startLobby]]
    $onlyIf[$arrayIncludes[IID;$authorID]]
    
    ${lobbySnippets.lobbyExist()}
    ${lobbySnippets.loadGlobalLobbyVars()}
    ${lobbySnippets.loadLobbyVars()}
    ${lobbySnippets.stopLobbyTimeout()}

    $localFunction[startingEmbed;
      $description[# Get ready! Starting in $get[s] seconds!]
      $color[$getGlobalVar[luckyColor]]
    ]
    
    $let[msgid;$messageID]
    $let[s;11]
    $arrayMap[allPlayers;ID;
      $return[<@$env[ID]>]
    ;members]

    $!deleteMessage[$channelID;$get[msgid]]
    $let[msgid;$sendMessage[$channelID;$callFn[startingEmbed];true]]
    
    $loop[11;
      $let[s;$math[$env[s]-1]]

      $if[$get[s]<=0;

        $arrayForEach[allPlayers;ID;
          $let[teamID;$arrayFindIndex[teams;team;$jsonLoad[playersInTeam;$env[team;players]] $return[$arrayIncludes[playersInTeam;$env[ID]]]]]
          ${challengeSnippets.setChallengeVars('$env[ID]', '$get[teamID]')}
          ${challengeSnippets.interval('$env[ID]')}
        ]
        
        $!deleteMessage[$channelID;$get[msgid]]
        $sendMessage[$channelID;
          $arrayJoin[members; ]
          $callFn[startingEmbed]
          $description[# 1 Hour Luck Challenge has begun!]
        ]
        $break
      ]
      $!editMessage[$channelID;$get[msgid];$callFn[startingEmbed]]
      $wait[750]
    ;s]
  `
}