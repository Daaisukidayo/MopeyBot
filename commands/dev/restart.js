module.exports = ({
    name: "restart",
    type: "messageCreate",
    code: `

    $onlyIf[$authorID==$botOwnerID]
    Shutting down the bot and turning it on in a few seconds.
    $botDestroy
    $setTimeout[$exec[npm start];10s]
    `
})