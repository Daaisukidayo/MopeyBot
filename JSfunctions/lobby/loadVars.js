export default function loadLobbyVars () {
  return `
    $if[$env[lobby]==;$jsonLoad[lobby;$getChannelVar[lobby]]]
    $if[$env[ready]==;$jsonLoad[ready;$env[lobby;ready]]]
    $if[$env[teams]==;$jsonLoad[teams;$env[lobby;teams]]]
    $if[$env[lobbyTags]==;$jsonLoad[lobbyTags;$env[lobby;tags]]]

    $arrayLoad[allPlayers]
    $arrayMap[teams;team;$return[$env[team;players]];arrayOfPlayers]
    $arrayForEach[arrayOfPlayers;array;$arrayConcat[allPlayers;allPlayers;array]]
  `
}