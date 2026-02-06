export default { 
  name: "randomrare", 
  aliases: ["rrare"], 
  type: "messageCreate", 
  code: `
    $reply
    $nomention
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown[5s]

    $jsonLoad[raresContent;$getGlobalVar[raresContent]]

    $sendMessage[$channelID;# $arrayRandomValue[raresContent]]
  `
}