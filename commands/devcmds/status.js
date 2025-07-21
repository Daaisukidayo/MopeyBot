module.exports = ({
  name: "status",
  type: "messageCreate",
  code: `
    $onlyForUsers[;$botOwnerID]
    $reply
    $color[$getGlobalVar[defaultColor]]
    $description[$trimLines[$codeBlock[CPU: $cpu
    OS: $os
    Bot Uptime: $parseMS[$uptime]
    Ram: $floor[$ram] MB
    Total ram: $floor[$ramTotal] GB
    DB Ping: \`$dbPing\`ms]]
    ]
  `
})