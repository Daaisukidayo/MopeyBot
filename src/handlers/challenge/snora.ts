import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "handleSnora",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer

    $let[separator; | ]

    $addContainer[
      $addTextDisplay[$codeBlock[Abbreviations  ➡️ Rare Animal]]
      $arrayForEach[$jsonEntries[$getCache[animals;tierAnimals]];entry;
        $c[Only rares with abbreviations: those are the ones a challenge accepts]
        $arrayMap[$jsonGet[entry;1;rareAnimals];animalId;
          $let[abbreviations;$getAnimalInfo[$env[animalId];challenge.abbreviations]]
          $if[$get[abbreviations]!=undefined;
            $return[$arrayJoin[$get[abbreviations];$get[separator]] ➡️ $getAnimalInfo[$env[animalId];name;0]]
          ]
        ;fieldContent]

        $if[$jsonSize[fieldContent]>0;
          $addTextDisplay[$tl[ui.snora.title.$get[l];$jsonGet[entry;0]]]
          $addTextDisplay[$codeBlock[$arrayJoin[fieldContent;\n]]]
        ]
      ]
      $addSeparator
      $addTextDisplay[$tl[ui.snora.or.$get[l];$get[separator];$getAnimalInfo[dove;challenge.abbreviations.0];$getAnimalInfo[dove;challenge.abbreviations.1]]]
    ;$getGlobalVar[luckyColor]]
  `
})
