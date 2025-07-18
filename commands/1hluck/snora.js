module.exports = [{ 
  name: "snora", 
  type: "messageCreate", 
  code: `
    $reply
    $let[cdTime;10s]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $callFunction[cooldown;$get[cdTime]]

    $jsonLoad[snoraElements;$getGlobalVar[snoraElements]]
    $jsonLoad[tierRareAnimals;$getGlobalVar[tierRareAnimals]]
    
    $arrayForEach[tierRareAnimals;arr;
      $let[tier;$env[arr;tier]]
      $let[fieldContent;]

      $jsonLoad[names;$env[arr;names]]

      $arrayForEach[names;name;
        $jsonLoad[rares;$env[snoraElements;$env[name]]]
        $let[rareInfo;\`$arrayJoin[rares; || ] ➡️ $env[name]\`]
        $let[fieldContent;$get[fieldContent]\n$get[rareInfo]]
      ]

      $addField[✦✧✦✧✦Tier $get[tier]✦✧✦✧✦;$get[fieldContent]]
    ]

    $color[$getGlobalVar[luckyColor]]
    $footer["||" is "or". It means you need to write for example "cht" or "chocotoucan"]
  `
}]
