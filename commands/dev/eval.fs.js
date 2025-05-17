module.exports = ({
    name: "eval",
    aliases: ["e"],
    type: "messageCreate",
    code: `
    $onlyIf[$authorID==$botOwnerID]
    $eval[$message]`})