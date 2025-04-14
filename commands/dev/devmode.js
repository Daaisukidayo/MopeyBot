module.exports=({
  name:"dev",
  type:"messageCreate",
  code:`
    $onlyIf[$authorID==$botOwnerID]
    $jsonLoad[userAccount;$getUserVar[userAccount]]

    $!jsonSet[userAccount;hasDevMode;$toLowerCase[$message]]
    $setUserVar[userAccount;$env[userAccount]]
    Changed your dev mode to $toLowerCase[$message]
  `
})