module.exports = ({
  name: "restart",
  type: "messageCreate",
  code: `
    $reply
    $onlyForUsers[;$botOwnerID]
    ## Shutting down the bot and turning it on in a few seconds.
    $botDestroy
    $setTimeout[$exec[npm start];5s]
  `
})