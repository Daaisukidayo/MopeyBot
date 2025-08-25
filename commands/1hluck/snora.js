export default [{ 
  name: "snora", 
  type: "messageCreate", 
  code: `
    $reply
    $let[cdTime;10s]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $callFunction[cooldown;$get[cdTime]]

    $jsonLoad[allRaresData;$getGlobalVar[allRaresData]]
    $jsonLoad[tierRareAnimals;$getGlobalVar[tierRareAnimals]]
    $jsonLoad[animalsIndexes;$getGlobalVar[animalsIndexes]]
    $jsonLoad[animals;$readFile[json/animals.json]]
    
    $arrayForEach[tierRareAnimals;arr;
      $let[tier;$env[arr;tier]]
      $let[fieldContent;]

      $jsonLoad[animalIDs;$env[arr;animalIDs]]

      $arrayForEach[animalIDs;animalID;
        $jsonLoad[rares;$env[allRaresData;$env[animalID]]]
        $let[animalIndex;$env[animalsIndexes;$env[animalID]]]
        $let[animalName;$default[$env[animals;$get[animalIndex];variants;0;name];???]]
        $let[rareInfo;\`$arrayJoin[rares; || ] ➡️ $get[animalName]\`]
        $let[fieldContent;$get[fieldContent]\n$get[rareInfo]]
      ]

      $addField[✦✧✦✧✦Tier $get[tier]✦✧✦✧✦;$get[fieldContent]]
    ]

    $color[$getGlobalVar[luckyColor]]
    $footer["||" is "or". It means you need to write for example "cht" or "chocotoucan"]
  `
}]
