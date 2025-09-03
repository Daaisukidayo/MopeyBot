export default function settingLobbyVars () {
  return `
    $let[lobbyMode;$env[lobby;mode]]
    $let[difficulty;$env[lobby;difficulty]]
    $let[host;$env[lobby;host]]
    $let[mode;$env[lobby;mode]]
  `
}