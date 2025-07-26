module.exports = [{ 
  name: "chart", 
  type: "messageCreate", 
  code: `
    $reply
    $let[cdTime;10s]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $callFunction[cooldown;$get[cdTime]]
    $color[$getglobalvar[luckyColor]]
    $image[https://media.discordapp.net/attachments/701793335941136464/1398029031198163055/luckchart.png]
    $timestamp[1753385040000]

    $if[$message[0]==event;
      $image[https://media.discordapp.net/attachments/701793335941136464/1398666514663739474/eventluckchart.png]
      $timestamp[1753213440000]
    ]
  `
}]