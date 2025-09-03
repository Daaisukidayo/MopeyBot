export default { 
  name: "randomrare", 
  aliases: ["rrare"], 
  type: "messageCreate", 
  code: `
    $reply
    $let[cdTime;5s]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $callFunction[cooldown;$get[cdTime]]
    $jsonLoad[animals;$readFile[json/animals.json]]

    $arrayMap[animals;animal;
      $if[$env[animal;isRare];
        $return[$env[animal;variants;0;name] $env[animal;variants;0;emoji]]
      ]
    ;rares]

    $sendMessage[$channelID;# $arrayRandomValue[rares]]
  `
}