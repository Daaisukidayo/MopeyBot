export default { 
  name: "snora",
  aliases: ["abbreviations", "abbr"],
  type: "messageCreate", 
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown[10s]

    $jsonLoad[allRaresData;$getGlobalVar[allRaresData]]
    $jsonLoad[tierAnimalsEntries;$advJsonEntries[$getGlobalVar[tierAnimals]]]

    $let[separator;|]
    
    $addContainer[
      $arrayForEach[tierAnimalsEntries;entry;
        $let[tier;$env[entry;0]]

        $jsonLoad[animalIDs;$env[entry;1]]

        $arrayMap[animalIDs;animalID;
          $if[$and[$getAnimalInfo[$env[animalID];isRare];$includes[$env[animalID];shop]==false];
            $jsonLoad[rares;$env[allRaresData;$env[animalID]]]
            $let[animalName;$getAnimalVariantInfo[$env[animalID];name]]
            $let[rareInfo;$arrayJoin[rares; $get[separator] ] ➡️ $get[animalName]]
            $return[$get[rareInfo]]
          ]
        ;fieldContent]

        $if[$arrayLength[fieldContent]>0;
          $addTextDisplay[$tl[ui.snora.title;$get[tier]]]
          $addTextDisplay[$codeBlock[$arrayJoin[fieldContent;\n]]]
        ]
      ]
      $addSeparator
      $addTextDisplay[$tl[ui.snora.or;$get[separator];$env[allRaresData;whiteDove;0];$env[allRaresData;whiteDove;1]]]
    ;$getGlobalVar[luckyColor]]
  `
}
