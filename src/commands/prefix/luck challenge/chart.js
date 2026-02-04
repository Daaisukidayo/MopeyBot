export default { 
  name: "chart", 
  type: "messageCreate", 
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown[10s]

    $color[$getglobalvar[luckyColor]]
    $image[https://media.discordapp.net/attachments/701793335941136464/1403754359107354744/luckchart.png]
    $timestamp[1754664900000]

    $if[$toLowerCase[$message[0]]==event;
      $image[https://media.discordapp.net/attachments/701793335941136464/1398666514663739474/eventluckchart.png]
      $timestamp[1753213440000]
    ]
  `
}