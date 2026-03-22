export default {
  name: "lobby",
  aliases: ["party"],
  type: "messageCreate",
  code: `
    $handleLobby
  `
}