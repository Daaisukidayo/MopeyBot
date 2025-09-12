import wardrobeSnippets from '#snippets/wardrobeSnippets.js'

export default {
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu"],
  description: "if user choses skinpack providing number as an argument",
  code: `
    $arrayLoad[IID;-;$customID]
    $let[tier;$env[IID;0]]
    $let[value;$selectMenuValues]

    $onlyIf[$isNumber[$get[tier]]]
    $onlyIf[$arrayIncludes[IID;wardrobe]]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $onlyIf[$arrayIncludes[IID;$authorID];$callFunction[notYourBTN]]

    ${wardrobeSnippets.loadJSON()}
    
    $loop[$arrayLength[animalIDs];
      $let[i;$math[$env[i] - 1]]
      $let[animalID;$arrayAt[animalIDs;$get[i]]]
      $let[animalTier;$env[animals;$env[animalsIndexes;$get[animalID]];tier]]

      $if[$get[animalTier]>$get[tier];$break]
      $if[$get[animalTier]!=$get[tier];$continue]

      $jsonLoad[variants;$env[animals;$env[animalsIndexes;$get[animalID]];variants]]

      $loop[$arrayLength[variants];
        $let[j;$math[$env[j] - 1]]
        $let[description;$env[variants;$get[j];description]]
        $let[emoji;$env[variants;$get[j];emoji]]

        $if[$includes[$get[description];$get[value]];;$continue]

        $!jsonSet[userWardrobe;$get[animalID];$get[j]]
        $arrayPush[content;$get[emoji]]

        $break
      ;j;true]
    ;i;true]

    $let[desc;$arrayJoin[content; ]]

    $callFunction[embed;default]
    $if[$get[desc]!=;
      $setUserVar[userWardrobe;$env[userWardrobe]]
      $description[# $get[desc]]
      $title[Successfully equipped every tier \`$get[tier]\` animal with chosen Skin Pack!]
    ;
      $color[Orange]
      $title[Tier \`$get[tier]\` animals don't have any skins in chosen Skin Pack]
    ]
    $interactionUpdate
    ${wardrobeSnippets.stopTimeout()}
  `
}