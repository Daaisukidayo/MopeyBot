module.exports = ({
  name: "ping",
  type: "messageCreate",
  code: `
    $reply
    
    $onlyIf[$getGlobalVar[botEnabled]]
    $onlyIf[$getUserVar[isBanned]==false]
    $onlyIf[$getUserVar[acceptedRules];$callFunction[rulesSchema;]]
    $onlyIf[$getUserVar[onSlowmode]==false]
    
    $let[cdTime;5s]
    $if[$getUserVar[dev]==false; $userCooldown[$commandName;$get[cdTime];$callFunction[cooldownSchema;$commandName]] ]
    **Current bot ping: \`$ping\`ms**\n**Execution time: \`$floor[$executionTime]\`ms** 
  `
})