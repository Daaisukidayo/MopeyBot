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
    $jsonLoad[animals;$jsonEntries[animals]]
    $arrayLoad[rares]
    $arrayForEach[animals;animal;
      $if[$env[animal;1;isRare];
        $arrayPush[rares;$env[animal;1;variants;0;name] $env[animal;1;variants;0;emoji]]
      ]
    ]

    $sendMessage[$channelID;# $arrayRandomValue[rares]]
  `
}