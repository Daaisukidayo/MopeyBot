module.exports = ({
  name: "ping",
  type: "messageCreate",
  code: `
    $reply
    
    $onlyIf[$getGlobalVar[botEnabled]==true]
    $onlyIf[$getUserVar[isBanned]==false]
    $onlyIf[$getUserVar[acceptedRules]==true;$callFunction[rulesSchema;]]
    $onlyIf[$getUserVar[onSlowmode]==false]
    
    $let[cdTime;5s]
    $userCooldown[$commandName;$get[cdTime];$callFunction[cooldownSchema;$commandName]]
    **Current bot ping: \`$ping\`ms**\n**Execution time: \`$floor[$executionTime]\`ms\nMopey uptime: \`$parseMS[$uptime]\`** 
  `
})