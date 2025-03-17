module.exports = ({
    name: "shutdown",
    type: "messageCreate",
    code: `

    $onlyIf[$authorID==$botOwnerID]
    Shutted down the bot.
    $botDestroy
    `
})