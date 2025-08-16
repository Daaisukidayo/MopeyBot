export default {
  name: "eval",
  aliases: ["e"],
  type: "messageCreate",
  code: `
    $reply
    $onlyForUsers[;$botOwnerID]
    $eval[$message]
  `
}