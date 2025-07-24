module.exports = [{ 
  name: "chart", 
  type: "messageCreate", 
  code: `
    $reply
    $let[cdTime;10s]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $callFunction[cooldown;$get[cdTime]]
    $image[https://media.discordapp.net/attachments/701793335941136464/1398029031198163055/luckchart.png]
    $color[$getglobalvar[luckyColor]]
    $timestamp[1753385040000]
  `
}]