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

    $jsonLoad[animals;$getAnimalsData]

    $arrayMap[animals;animal;
      $if[$env[animal;isRare];
        $return[$env[animal;variants;0;name] $env[animal;variants;0;emoji]]
      ]
    ;rares]

    $sendMessage[$channelID;# $arrayRandomValue[rares]]
  `
}