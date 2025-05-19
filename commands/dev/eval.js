module.exports = ({
  name: "eval",
  aliases: ["e"],
  type: "messageCreate",
  code: `
    $reply
    $onlyIf[$authorID==$botOwnerID]
    $eval[$message]
  `
})