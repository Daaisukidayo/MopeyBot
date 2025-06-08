module.exports = [{ 
  name: "chart", 
  type: "messageCreate", 
  code: `
    $reply
    $let[cdTime;10s]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $callFunction[cooldown;$get[cdTime]]
    $image[https://media.discordapp.net/attachments/701793335941136464/1368264792485134479/image.png]
    $color[$getglobalvar[luckyColor]]
    $timestamp[1745180100000]
  `
}]