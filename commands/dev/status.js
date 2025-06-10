module.exports = ({
  name: "status",
  type: "messageCreate",
  code: `
    $onlyForUsers[;$botOwnerID]
    $reply
    CPU: $cpu\nCPU architecture: $cpuArch\nCPU Cores: $cpuCores\nCPU Model: $cpuModel\nCPU Speed: $cpuSpeed MHz\nOS: $os\nOS Uptime: $parseMS[$osUptime]\nBot Uptime: $parseMS[$uptime]\nRam: $floor[$ram] MB\nTotal ram: $floor[$ramTotal] GB
  `
})