module.exports = ({
  name: "status",
  type: "messageCreate",
  code: `
    $onlyIf[$authorID==$botOwnerID]
    CPU: $cpu
    CPU architecture: $cpuArch
    CPU Cores: $cpuCores
    CPU Model: $cpuModel
    CPU Speed: $cpuSpeed MHz
    OS: $os
    OS Uptime: $parseMS[$osUptime]
    Bot Uptime: $parseMS[$uptime]
    Ram: $ram MB
    Total ram: $ramTotal GB
  `
})