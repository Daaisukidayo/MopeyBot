export default {
  type: "interactionCreate",
  description: "When pressing Quit",
  code: `
    $arrayLoad[IID;-;$customID]
    $onlyIf[$arrayIncludes[IID;quitLobby]]

    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkLobby

    $jsonLoad[lobby;$getChannelVar[lobby]]
    $jsonLoad[ready;$env[lobby;ready]]
    $jsonLoad[teams;$env[lobby;teams]]
    $jsonLoad[allPlayers;$env[lobby;allPlayers]]

    $onlyIf[$messageID==$env[lobby;messageID];$!deleteMessage[$channelID;$messageID]]

    $onlyIf[$arrayIncludes[allPlayers;$authorID]]

    $let[teamIndex;$env[IID;1]]
    $jsonLoad[playersInTeam;$env[teams;$get[teamIndex];players]]
    $onlyIf[$arrayIncludes[playersInTeam;$authorID]]
    $!arraySplice[playersInTeam;$arrayIndexOf[playersInTeam;$authorID];1]
    
    $if[$arrayIncludes[ready;$authorID];
      $!arraySplice[ready;$arrayIndexOf[ready;$authorID];1]
    ]
    
    $!arraySplice[allPlayers;$arrayIndexOf[allPlayers;$authorID];1]

    $!jsonSet[teams;$get[teamIndex];players;$env[playersInTeam]]
    $!jsonSet[lobby;teams;$env[teams]]
    $!jsonSet[lobby;ready;$env[ready]]
    $!jsonSet[lobby;allPlayers;$env[allPlayers]]

    $setChannelVar[lobby;$env[lobby]]

    $lobbyEmbed
    $interactionUpdate
    $newLobbyTimeout
  `
}