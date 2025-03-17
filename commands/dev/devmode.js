module.exports=({
    name:"dev",
    type:"messageCreate",
    code:`
    $onlyIf[$authorID==$botOwnerID]
    $setUserVar[dev;$toLowerCase[$message]]
    Changed your dev mode to $message`
})