import lobbySnippets from '#snippets/lobbySnippets.js'

export default {
  type: 'interactionCreate',
  name: "readyLobby",
  description: 'when pressing Ready',
  code: `
    ${lobbySnippets.lobbyExist()}
    ${lobbySnippets.loadGlobalLobbyVars()}
    ${lobbySnippets.loadLobbyVars()}

    $onlyIf[$arrayIncludes[allPlayers;$authorID];
      $interactionReply[
        $ephemeral
        $callFunction[embed;error]
        $description[## You're not a participant]
      ]
    ]

    $if[$arrayIncludes[ready;$authorID];
      $!arraySplice[ready;$arrayIndexOf[ready;$authorID];1]
    ;
      $arrayPush[ready;$authorID]
    ]
    $!jsonSet[lobby;ready;$env[ready]]
    $setChannelVar[lobby;$env[lobby]]
    
    ${lobbySnippets.lobbyEmbed()}
    $let[msgid;$messageID]
    $interactionUpdate
    ${lobbySnippets.lobbyTimeout()}
  `
}